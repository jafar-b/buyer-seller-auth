# BUYER-SELLER AUTHENTICATION SYSTEM

https://github.com/user-attachments/assets/9f012abe-4edf-401c-b2d3-35bd2326f15d

🛡️ Buyer-Seller Authentication System

A full-stack role-based authentication system built with React, TypeScript, Node.js, Express, and MongoDB. Features separate dashboards for buyers and sellers with comprehensive form validations and protected routes.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Form Validations](#form-validations)
- [Protected Routes](#protected-routes)
- [Session Management](#session-management)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)

---

## ✨ Features

### 🔐 Authentication
- **User Registration** with role selection (Buyer/Seller)
- **Email Verification** system
- **Login/Logout** functionality
- **Password Reset** via email
- **JWT-based** authentication with access & refresh tokens
- **Session Management** - Persistent login across page reloads
- **Automatic Token Refresh** - Seamless token renewal
- **Protected Routes** with role-based access control

### 👥 Role-Based System
- **Buyer Dashboard** - Shopping-focused interface
- **Seller Dashboard** - Store management interface
- **Role-specific routing** and access control
- **Automatic redirection** based on user role

### ✅ Form Validations
- **Comprehensive field validation** on all forms
- **Real-time error feedback** (onBlur validation)
- **Strong password requirements**
- **Email format validation**
- **Type-safe** with Zod schemas

### 🎨 UI/UX
- **Modern, responsive design** with Tailwind CSS
- **Dark mode support** with theme toggle
- **Beautiful UI components** using shadcn/ui
- **Loading states** and error handling
- **Toast notifications** for user feedback

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.3** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM 6** - Client-side routing
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service

---

## 📁 Project Structure

```
authsystem/
├── public/                 # Static assets
├── server/                 # Backend code
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Auth & error middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── index.js           # Server entry point
├── src/                   # Frontend code
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── context/          # React context
│   │   └── AuthContext.tsx
│   ├── lib/              # Utilities
│   ├── pages/            # Page components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── BuyerDashboard.tsx
│   │   ├── SellerDashboard.tsx
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   └── VerifyEmailPage.tsx
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── .env                  # Environment variables
├── package.json          # Dependencies
└── README.md            # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd authsystem
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Copy the example .env file
cp .env.example .env

# Edit .env with your configuration
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/authsystem

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Email Configuration (using Ethereal for development)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USERNAME=your_ethereal_username
EMAIL_PASSWORD=your_ethereal_password
EMAIL_FROM=noreply@authsystem.com
EMAIL_FROM_NAME='Auth System'

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### Email Setup

For development, use [Ethereal Email](https://ethereal.email/):
1. Visit https://ethereal.email/
2. Click "Create Ethereal Account"
3. Copy the credentials to your `.env` file

For production, use a real email service like:
- Gmail
- SendGrid
- AWS SES
- Mailgun

---

## ▶️ Running the Application

### Development Mode

**Run both frontend and backend concurrently:**
```bash
npm run dev
```

**Or run them separately:**

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

---

## ✅ Form Validations

### Registration Form

#### **Role Selection**
- ✅ Required field
- ✅ Must select either "Buyer" or "Seller"

#### **Name Field**
- ✅ Required
- ✅ Minimum 2 characters
- ✅ Maximum 50 characters
- ✅ Only letters and spaces allowed
- ❌ No numbers or special characters

#### **Email Field**
- ✅ Required
- ✅ Valid email format
- ✅ Automatically converted to lowercase
- ✅ Must be unique (checked on backend)

#### **Password Field**
- ✅ Required
- ✅ Minimum 8 characters
- ✅ Must contain at least one uppercase letter (A-Z)
- ✅ Must contain at least one lowercase letter (a-z)
- ✅ Must contain at least one number (0-9)
- ✅ Must contain at least one special character (!@#$%^&*)

#### **Confirm Password**
- ✅ Required
- ✅ Must match password field

### Login Form

#### **Email Field**
- ✅ Required
- ✅ Valid email format
- ✅ Automatically converted to lowercase

#### **Password Field**
- ✅ Required
- ✅ Minimum 6 characters

### Forgot Password Form

#### **Email Field**
- ✅ Required
- ✅ Valid email format
- ✅ Automatically converted to lowercase

### Reset Password Form

#### **New Password Field**
- ✅ Required
- ✅ Minimum 8 characters
- ✅ Must contain uppercase, lowercase, number, and special character

#### **Confirm Password**
- ✅ Required
- ✅ Must match new password

### Validation Behavior
- **Validation Mode**: `onBlur` - Validates when user leaves a field
- **Real-time Feedback**: Immediate error messages
- **Visual Indicators**: Red borders on invalid fields
- **Type Safety**: Full TypeScript support with Zod schemas

---

## 🔒 Protected Routes

### Route Protection Levels

#### **1. Public Routes** (Accessible only when NOT logged in)
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Forgot password page
- `/reset-password/:token` - Reset password page
- `/verify-email/:token` - Email verification page

**Behavior**: Redirects to role-specific dashboard if already authenticated

#### **2. Protected Routes** (Requires authentication)
- `/dashboard` - Generic dashboard (legacy)

**Behavior**: Redirects to `/login` if not authenticated

#### **3. Role-Based Protected Routes**

##### **Buyer Routes** (Only accessible to users with `role: 'buyer'`)
- `/buyer/dashboard` - Buyer dashboard

**Features**:
- Order management
- Shopping cart
- Wishlist
- Purchase history
- Product browsing

##### **Seller Routes** (Only accessible to users with `role: 'seller'`)
- `/seller/dashboard` - Seller dashboard

**Features**:
- Product management
- Sales analytics
- Order processing
- Store settings
- Revenue tracking

**Behavior**: 
- Redirects to `/login` if not authenticated
- Redirects to correct role dashboard if accessing wrong role's route
- Example: Buyer trying to access `/seller/dashboard` → redirected to `/buyer/dashboard`

### Route Protection Implementation

```typescript
// Role-based Protected Route Component
<RoleProtectedRoute allowedRole="buyer">
  <BuyerDashboard />
</RoleProtectedRoute>

<RoleProtectedRoute allowedRole="seller">
  <SellerDashboard />
</RoleProtectedRoute>
```

### Authentication Flow
1. User logs in with email and password
2. Backend validates credentials and returns JWT token
3. Token stored in localStorage
4. Token sent with every API request in Authorization header
5. Backend middleware verifies token
6. User redirected to role-specific dashboard

---

## 🔄 Session Management

### Access & Refresh Token System

This application implements a robust session management system using **access tokens** and **refresh tokens** to maintain user sessions across page reloads and provide automatic token renewal.

#### **How It Works**

1. **Login**
   - User logs in with credentials
   - Server generates:
     - **Access Token** (15 minutes) - For API authentication
     - **Refresh Token** (7 days) - To obtain new access tokens
   - Both tokens stored in localStorage
   - Refresh token also saved in database for validation

2. **API Requests**
   - Access token sent in Authorization header
   - If access token expires (401 error):
     - Automatically uses refresh token to get new access token
     - Retries the original request
     - User experiences no interruption

3. **Page Reload**
   - Checks localStorage for tokens
   - If access token valid: Fetches user data
   - If access token expired: Uses refresh token to get new one
   - **Result**: User stays logged in across page reloads ✅

4. **Logout**
   - Clears refresh token from database
   - Removes all tokens from localStorage
   - Redirects to login page

#### **Benefits**

✅ **Persistent Sessions** - Stay logged in across page reloads  
✅ **Enhanced Security** - Short-lived access tokens (15 min)  
✅ **Automatic Refresh** - Seamless token renewal  
✅ **Better UX** - No frequent re-logins required  

#### **Token Storage**

| Token Type | Lifetime | Storage | Purpose |
|------------|----------|---------|---------|
| Access Token | 15 minutes | localStorage | API authentication |
| Refresh Token | 7 days | localStorage + Database | Get new access tokens |

#### **Security Features**

- Access tokens expire quickly (15 min) to minimize exposure
- Refresh tokens validated against database on each use
- Tokens cleared from database on logout
- Automatic token cleanup on expiration
- Request queuing during token refresh

📖 **Detailed Documentation**: See [SESSION_MANAGEMENT.md](./SESSION_MANAGEMENT.md) for complete implementation details.

---

## 🌐 API Endpoints

### Authentication Endpoints

#### **POST** `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "buyer"
}
```

#### **POST** `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

#### **GET** `/api/auth/me`
Get current user (Protected)
- Requires: `Authorization: Bearer <token>`

#### **POST** `/api/auth/logout`
Logout user (Protected)
- Requires: `Authorization: Bearer <token>`

#### **POST** `/api/auth/refresh-token`
Refresh access token
```json
{
  "refreshToken": "your_refresh_token_here"
}
```
Returns new access token

#### **GET** `/api/auth/verify-email/:token`
Verify email address

#### **POST** `/api/auth/forgot-password`
Request password reset
```json
{
  "email": "john@example.com"
}
```

#### **PUT** `/api/auth/reset-password/:token`
Reset password
```json
{
  "password": "NewSecurePass123!"
}
```

---

## 👥 User Roles

### Buyer Role
**Purpose**: Purchase products from sellers

**Permissions**:
- Browse products
- Add items to cart
- Place orders
- Manage wishlist
- View order history
- Update profile

**Dashboard Features**:
- Total orders count
- Active orders tracking
- Wishlist items
- Total spent statistics
- Quick access to shopping

### Seller Role
**Purpose**: Sell products to buyers

**Permissions**:
- Add/edit/delete products
- Manage inventory
- Process orders
- View sales analytics
- Configure store settings
- Manage payment methods

**Dashboard Features**:
- Total products count
- Total sales statistics
- Revenue tracking
- Pending orders
- Sales analytics
- Store management tools

---

## 🎨 UI Components

### Built with shadcn/ui
- Button
- Input
- Label
- Card
- Toast/Sonner notifications
- Theme Provider (Dark/Light mode)

### Icons
- Lucide React icons throughout the application

---

## 🔐 Security Features

- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth with access & refresh tokens
- ✅ **Session Management** - Persistent and secure sessions
- ✅ **Automatic Token Refresh** - Seamless token renewal
- ✅ **Token Validation** - Database validation for refresh tokens
- ✅ **HTTP-Only Cookies** - Prevents XSS attacks
- ✅ **Email Verification** - Confirms user email
- ✅ **Password Reset** - Secure token-based reset
- ✅ **Input Validation** - Frontend and backend validation
- ✅ **CORS Protection** - Configured CORS policy
- ✅ **Environment Variables** - Sensitive data protection

---

## 📝 Scripts

```json
{
  "client": "vite",                    // Run frontend only
  "server": "nodemon server/index.js", // Run backend only
  "dev": "concurrently ...",           // Run both concurrently
  "build": "tsc -b && vite build",     // Build for production
  "lint": "eslint .",                  // Lint code
  "preview": "vite preview"            // Preview production build
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and Node.js

---

## 🐛 Known Issues

None at the moment. Please report any issues you find!

---

## 🔮 Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] OAuth integration (Google, Facebook)
- [ ] Product catalog and shopping cart
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Chat system between buyers and sellers
- [ ] Product reviews and ratings
- [ ] Advanced search and filtering

---

## 📞 Support

For support, email support@authsystem.com or open an issue in the repository.
