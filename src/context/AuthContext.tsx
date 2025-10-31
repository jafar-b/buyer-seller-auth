import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  isEmailVerified: boolean;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'buyer' | 'seller') => Promise<void>;
  logout: () => void;
  verifyEmail: (token: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!accessToken && !refreshToken) {
          setLoading(false);
          return;
        }

        // Try to use access token first
        if (accessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          
          try {
            const response = await axios.get(`${API_URL}/auth/me`);
            setUser(response.data.data);
            setLoading(false);
            return;
          } catch (error) {
            // Access token expired, try refresh token
            console.log('Access token expired, attempting refresh...');
          }
        }

        // If access token failed or doesn't exist, try refresh token
        if (refreshToken) {
          try {
            const response = await axios.post(`${API_URL}/auth/refresh-token`, {
              refreshToken
            });
            
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            
            // Fetch user data with new token
            const userResponse = await axios.get(`${API_URL}/auth/me`);
            setUser(userResponse.data.data);
          } catch (refreshError) {
            console.error('Refresh token failed:', refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            delete axios.defaults.headers.common['Authorization'];
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = async (name: string, email: string, password: string, role: 'buyer' | 'seller') => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        role,
      });

      toast.success(response.data.message || 'Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Login user
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, user } = response.data;
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Set auth token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      setUser(user);
      toast.success('Logged in successfully!');
      
      // Redirect to role-based dashboard
      if (user.role === 'buyer') {
        navigate('/buyer/dashboard');
      } else if (user.role === 'seller') {
        navigate('/seller/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    try {
      // Call the logout API
      axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear user data and tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    }
  };

  // Verify email
  const verifyEmail = async (token: string) => {
    try {
      await axios.get(`${API_URL}/auth/verify-email/${token}`);
      toast.success('Email verified successfully! You can now log in.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Email verification failed. The link may have expired.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Forgot password
  const forgotPassword = async (email: string) => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      toast.success('Password reset link sent to your email. Please check your inbox.');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send password reset email. Please try again.';
      toast.error(errorMessage);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (token: string, password: string) => {
    try {
      await axios.put(`${API_URL}/auth/reset-password/${token}`, { password });
      toast.success('Password reset successful! You can now log in with your new password.');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Password reset failed. The link may have expired.';
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
