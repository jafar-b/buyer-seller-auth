import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster as Sonner } from 'sonner';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { ThemeToggle } from './components/theme-toggle';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BuyerDashboard from './pages/BuyerDashboard';
import SellerDashboard from './pages/SellerDashboard';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Role-based Protected Route component
const RoleProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode; allowedRole: 'buyer' | 'seller' }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== allowedRole) {
    // Redirect to appropriate dashboard based on user's role
    return <Navigate to={user?.role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard'} replace />;
  }

  return <>{children}</>;
};

// Public Route component (for auth pages when already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Redirect to role-specific dashboard
    return <Navigate to={user.role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard'} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container flex items-center justify-between h-16">
                <h1 className="text-xl font-bold">Buyer-Seller Auth System</h1>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="container py-8">
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/verify-email/:token"
                  element={
                    <PublicRoute>
                      <VerifyEmailPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <PublicRoute>
                      <ForgotPasswordPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/reset-password/:token"
                  element={
                    <PublicRoute>
                      <ResetPasswordPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/buyer/dashboard"
                  element={
                    <RoleProtectedRoute allowedRole="buyer">
                      <BuyerDashboard />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/seller/dashboard"
                  element={
                    <RoleProtectedRoute allowedRole="seller">
                      <SellerDashboard />
                    </RoleProtectedRoute>
                  }
                />
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toaster position="top-center" />
            <Sonner />
          </div>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
