# Session Management with Access & Refresh Tokens

This document explains the session management implementation using access and refresh tokens.

## 🔑 Token Strategy

### Access Token
- **Purpose**: Short-lived token for API authentication
- **Lifetime**: 15 minutes
- **Storage**: localStorage
- **Usage**: Sent with every API request in Authorization header

### Refresh Token
- **Purpose**: Long-lived token to obtain new access tokens
- **Lifetime**: 7 days
- **Storage**: localStorage + Database (for validation)
- **Usage**: Used to get new access token when current one expires

## 🔄 How It Works

### 1. Login Flow
```
User Login
    ↓
Backend generates:
  - Access Token (15 min)
  - Refresh Token (7 days)
    ↓
Both tokens stored in:
  - localStorage (frontend)
  - Database (refresh token only)
    ↓
Access token set in axios headers
    ↓
User redirected to dashboard
```

### 2. API Request Flow
```
API Request
    ↓
Access Token in Authorization header
    ↓
Is token valid?
  ├─ YES → Process request
  └─ NO (401) → Automatic token refresh
         ↓
    Send refresh token to /refresh-token
         ↓
    Is refresh token valid?
      ├─ YES → Get new access token
      │         ↓
      │    Retry original request
      └─ NO → Redirect to login
```

### 3. Page Reload Flow
```
Page Reload
    ↓
Check localStorage for tokens
    ↓
Access token exists?
  ├─ YES → Try to fetch user data
  │         ↓
  │    Success? → User stays logged in
  │    Failed? → Try refresh token
  └─ NO → Try refresh token
         ↓
    Refresh token exists?
      ├─ YES → Get new access token
      │         ↓
      │    Fetch user data
      │         ↓
      │    User stays logged in
      └─ NO → Redirect to login
```

### 4. Logout Flow
```
User Logout
    ↓
Call logout API
    ↓
Backend clears refresh token from database
    ↓
Frontend clears:
  - accessToken from localStorage
  - refreshToken from localStorage
  - Authorization header
    ↓
Redirect to login page
```

## 📁 Implementation Files

### Backend

#### 1. **User Model** (`server/models/userModel.js`)
```javascript
refreshToken: String  // Stores current refresh token
```

#### 2. **Token Utilities** (`server/utils/generateTokens.js`)
- `generateAccessToken(userId)` - Creates 15-min access token
- `generateRefreshToken(userId)` - Creates 7-day refresh token
- `verifyAccessToken(token)` - Validates access token
- `verifyRefreshToken(token)` - Validates refresh token

#### 3. **Auth Controller** (`server/controllers/authController.js`)

**Login Endpoint** (`POST /api/auth/login`)
```javascript
// Generates both tokens
const accessToken = generateAccessToken(user._id);
const refreshToken = generateRefreshToken(user._id);

// Saves refresh token to database
user.refreshToken = refreshToken;
await user.save();

// Returns both tokens
res.json({ accessToken, refreshToken, user });
```

**Refresh Token Endpoint** (`POST /api/auth/refresh-token`)
```javascript
// Validates refresh token
// Checks if it matches database
// Generates new access token
// Returns new access token
```

**Logout Endpoint** (`POST /api/auth/logout`)
```javascript
// Clears refresh token from database
await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
```

### Frontend

#### 1. **Auth Context** (`src/context/AuthContext.tsx`)

**On Page Load**
```typescript
// Check for tokens in localStorage
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

// Try access token first
if (accessToken) {
  // Fetch user data
  // If fails, try refresh token
}

// If access token failed, use refresh token
if (refreshToken) {
  // Get new access token
  // Fetch user data
}
```

**On Login**
```typescript
// Store both tokens
localStorage.setItem('accessToken', accessToken);
localStorage.setItem('refreshToken', refreshToken);

// Set authorization header
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
```

**On Logout**
```typescript
// Clear all tokens
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
delete axios.defaults.headers.common['Authorization'];
```

#### 2. **Axios Interceptor** (`src/lib/axiosInterceptor.ts`)

**Automatic Token Refresh**
```typescript
// Intercepts 401 responses
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Get refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      
      // Request new access token
      const response = await axios.post('/auth/refresh-token', { refreshToken });
      
      // Update access token
      localStorage.setItem('accessToken', response.data.accessToken);
      
      // Retry original request
      return axios(originalRequest);
    }
  }
);
```

**Request Queuing**
- When refreshing token, queues all failed requests
- After getting new token, retries all queued requests
- Prevents multiple simultaneous refresh attempts

## 🔐 Security Features

### 1. **Token Validation**
- Access tokens verified on every API request
- Refresh tokens validated against database
- Expired tokens automatically rejected

### 2. **Token Storage**
- **Access Token**: localStorage (short-lived, less risk)
- **Refresh Token**: localStorage + Database (validated on use)
- HTTP-only cookies option available for enhanced security

### 3. **Token Rotation**
- New access token generated every 15 minutes
- Refresh token remains valid for 7 days
- Can implement refresh token rotation for extra security

### 4. **Logout Security**
- Refresh token removed from database
- Prevents reuse of old refresh tokens
- All tokens cleared from client

## 🎯 Benefits

### 1. **Persistent Sessions**
✅ Users stay logged in across page reloads
✅ No need to re-login every 15 minutes
✅ Seamless user experience

### 2. **Enhanced Security**
✅ Short-lived access tokens minimize exposure
✅ Refresh tokens stored in database for validation
✅ Automatic token cleanup on logout

### 3. **Automatic Token Refresh**
✅ Transparent to the user
✅ No interruption in user experience
✅ Failed requests automatically retried

### 4. **Scalability**
✅ Stateless authentication
✅ Works across multiple devices
✅ Easy to implement token revocation

## 🔧 Configuration

### Environment Variables

```env
# Access Token
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=15m

# Refresh Token
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_REFRESH_EXPIRE=7d
```

### Customization

**Change Token Lifetimes**
```javascript
// In generateTokens.js
generateAccessToken: { expiresIn: '30m' }  // 30 minutes
generateRefreshToken: { expiresIn: '30d' } // 30 days
```

**Implement Token Rotation**
```javascript
// Generate new refresh token on each refresh
const newRefreshToken = generateRefreshToken(user._id);
user.refreshToken = newRefreshToken;
await user.save();
return { accessToken, refreshToken: newRefreshToken };
```

## 🧪 Testing

### Test Session Persistence
1. Login to the application
2. Reload the page
3. ✅ Should remain logged in

### Test Token Expiration
1. Login to the application
2. Wait 15+ minutes (or modify token expiry for testing)
3. Make an API request
4. ✅ Should automatically refresh and succeed

### Test Logout
1. Login to the application
2. Logout
3. Try to use old tokens
4. ✅ Should be rejected and redirect to login

## 🚨 Troubleshooting

### Issue: Redirected to login on page reload

**Solution**: Check if tokens are being stored in localStorage
```javascript
console.log(localStorage.getItem('accessToken'));
console.log(localStorage.getItem('refreshToken'));
```

### Issue: Token refresh fails

**Solution**: Verify refresh token secret in .env
```env
JWT_REFRESH_SECRET=myrefreshsecretkey
```

### Issue: 401 errors after login

**Solution**: Ensure Authorization header is set
```javascript
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
```

## 📊 Token Lifecycle Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      User Login                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  Generate Access Token (15m) + Refresh Token (7d)       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│         Store in localStorage + Database                 │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              User Makes API Requests                     │
│         (Access Token in Authorization header)           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
            ┌────────┴────────┐
            │                 │
         Valid?            Expired?
            │                 │
            ▼                 ▼
      ┌─────────┐      ┌──────────────┐
      │ Success │      │ Auto Refresh │
      └─────────┘      └──────┬───────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │ New Access Token │
                    └──────┬───────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Retry Request│
                    └──────────────┘
```

## 🎓 Best Practices

1. **Always use HTTPS in production** - Prevents token interception
2. **Store refresh tokens securely** - Consider HTTP-only cookies
3. **Implement token rotation** - Generate new refresh token on each use
4. **Set appropriate expiry times** - Balance security and UX
5. **Log token refresh attempts** - Monitor for suspicious activity
6. **Implement rate limiting** - Prevent brute force attacks
7. **Clear tokens on logout** - Both client and server side
8. **Handle edge cases** - Network failures, concurrent requests

## 📚 Additional Resources

- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OAuth 2.0 Refresh Tokens](https://oauth.net/2/refresh-tokens/)
- [Token-Based Authentication](https://auth0.com/docs/secure/tokens)
