# 🚀 Quick Start Guide

Get your Buyer-Seller Authentication System up and running in 5 minutes!

## Prerequisites

- ✅ Node.js (v16+)
- ✅ MongoDB (running locally or MongoDB Atlas)
- ✅ npm or yarn

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb://localhost:27017/authsystem

# JWT Tokens
JWT_SECRET=your_super_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Email (Ethereal for development)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USERNAME=your_ethereal_username
EMAIL_PASSWORD=your_ethereal_password
EMAIL_FROM=noreply@authsystem.com
EMAIL_FROM_NAME='Auth System'

# Frontend
VITE_API_URL=http://localhost:5000/api
```

### Get Ethereal Email Credentials

1. Visit https://ethereal.email/
2. Click "Create Ethereal Account"
3. Copy the credentials to your `.env` file

## Step 3: Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Just update MONGO_URI in .env
```

## Step 4: Run the Application

```bash
# Run both frontend and backend
npm run dev
```

**Or run separately:**

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

## Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🎯 Test the Application

### 1. Register a New User

1. Go to http://localhost:5173/register
2. Select role (Buyer or Seller)
3. Fill in the form:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Password**: SecurePass123!
   - **Confirm Password**: SecurePass123!
4. Click "Sign Up"

### 2. Verify Email

1. Check terminal for email verification link
2. Click the link or copy to browser
3. Email verified successfully!

### 3. Login

1. Go to http://localhost:5173/login
2. Enter credentials
3. Redirected to role-specific dashboard

### 4. Test Session Persistence

1. After logging in, **reload the page**
2. ✅ You should stay logged in!
3. This is the session management working

### 5. Test Different Roles

**Buyer Dashboard** (`/buyer/dashboard`):
- Shopping-focused interface
- Orders, wishlist, cart

**Seller Dashboard** (`/seller/dashboard`):
- Store management interface
- Products, sales, analytics

## 🔧 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution**: Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**: Change port in `.env`
```env
PORT=5001
```

### Email Not Sending

**Solution**: Check Ethereal credentials in `.env`
- Visit https://ethereal.email/messages to see test emails

### Page Reloads to Login

**Solution**: Check browser console for errors
- Verify tokens in localStorage
- Check backend is running
- Verify JWT secrets in `.env`

## 📚 Next Steps

1. ✅ Read [README.md](./README.md) for full documentation
2. ✅ Check [SESSION_MANAGEMENT.md](./SESSION_MANAGEMENT.md) for token details
3. ✅ Review [VALIDATION_RULES.md](./VALIDATION_RULES.md) for form validations
4. ✅ Customize for your needs!

## 🎨 Customization

### Change Token Expiration

Edit `server/utils/generateTokens.js`:

```javascript
// Access Token
{ expiresIn: '30m' }  // 30 minutes instead of 15

// Refresh Token
{ expiresIn: '30d' }  // 30 days instead of 7
```

### Add More User Roles

1. Update `server/models/userModel.js`:
```javascript
role: {
  type: String,
  enum: ['buyer', 'seller', 'admin'],  // Add 'admin'
  required: true,
}
```

2. Create new dashboard component
3. Add role-protected route in `App.tsx`

### Change Password Requirements

Edit `src/pages/RegisterPage.tsx`:

```typescript
password: z
  .string()
  .min(10, 'Password must be at least 10 characters')  // Change min length
  // Add or remove regex patterns
```

## 🚀 Production Deployment

### Environment Variables

Update for production:

```env
NODE_ENV=production
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=very_strong_secret_key
JWT_REFRESH_SECRET=another_strong_secret_key

# Use real email service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USERNAME=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Build for Production

```bash
npm run build
```

### Deploy

- **Frontend**: Vercel, Netlify, or any static host
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Database**: MongoDB Atlas

## 💡 Tips

1. **Use strong secrets** in production
2. **Enable HTTPS** for security
3. **Set up proper CORS** for your domain
4. **Monitor token refresh** attempts
5. **Implement rate limiting** for APIs
6. **Add logging** for debugging
7. **Set up error tracking** (Sentry, etc.)

## 🆘 Need Help?

- 📖 Check the [README.md](./README.md)
- 🔍 Search existing issues
- 💬 Open a new issue
- 📧 Contact support

---

**Happy Coding! 🎉**
