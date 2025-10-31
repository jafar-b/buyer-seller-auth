import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getMe, 
  logoutUser, 
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshAccessToken
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Protected routes (require authentication)
router.get('/me', protect, getMe);
router.post('/logout', protect, logoutUser);

export default router;
