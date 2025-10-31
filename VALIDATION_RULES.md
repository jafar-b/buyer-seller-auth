# Form Validation Rules

This document outlines all the validation rules implemented across the authentication forms.

## Registration Form (`RegisterPage.tsx`)

### Role Selection
- **Required**: Must select either "Buyer" or "Seller"
- **Error Messages**: 
  - "Please select a role" (if not selected)

### Name Field
- **Required**: Yes
- **Min Length**: 2 characters
- **Max Length**: 50 characters
- **Pattern**: Only letters and spaces allowed
- **Error Messages**:
  - "Name is required"
  - "Name must be at least 2 characters"
  - "Name must not exceed 50 characters"
  - "Name can only contain letters and spaces"

### Email Field
- **Required**: Yes
- **Format**: Valid email address
- **Transformation**: Automatically converted to lowercase
- **Error Messages**:
  - "Email is required"
  - "Please enter a valid email address"

### Password Field
- **Required**: Yes
- **Min Length**: 8 characters
- **Must Contain**:
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)
  - At least one special character (!@#$%^&*, etc.)
- **Error Messages**:
  - "Password is required"
  - "Password must be at least 8 characters"
  - "Password must contain at least one uppercase letter"
  - "Password must contain at least one lowercase letter"
  - "Password must contain at least one number"
  - "Password must contain at least one special character"

### Confirm Password Field
- **Required**: Yes
- **Must Match**: Password field
- **Error Messages**:
  - "Please confirm your password"
  - "Passwords don't match"

---

## Login Form (`LoginPage.tsx`)

### Email Field
- **Required**: Yes
- **Format**: Valid email address
- **Transformation**: Automatically converted to lowercase
- **Error Messages**:
  - "Email is required"
  - "Please enter a valid email address"

### Password Field
- **Required**: Yes
- **Min Length**: 6 characters
- **Error Messages**:
  - "Password is required"
  - "Password must be at least 6 characters"

---

## Forgot Password Form (`ForgotPasswordPage.tsx`)

### Email Field
- **Required**: Yes
- **Format**: Valid email address
- **Transformation**: Automatically converted to lowercase
- **Error Messages**:
  - "Email is required"
  - "Please enter a valid email address"

---

## Reset Password Form (`ResetPasswordPage.tsx`)

### New Password Field
- **Required**: Yes
- **Min Length**: 8 characters
- **Must Contain**:
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)
  - At least one special character (!@#$%^&*, etc.)
- **Error Messages**:
  - "Password is required"
  - "Password must be at least 8 characters"
  - "Password must contain at least one uppercase letter"
  - "Password must contain at least one lowercase letter"
  - "Password must contain at least one number"
  - "Password must contain at least one special character"

### Confirm Password Field
- **Required**: Yes
- **Must Match**: New password field
- **Error Messages**:
  - "Please confirm your password"
  - "Passwords don't match"

---

## Validation Behavior

All forms use **onBlur validation mode**, which means:
- Validation triggers when a user leaves a field (blur event)
- Real-time feedback as users fill out the form
- Prevents unnecessary validation on every keystroke
- Improves user experience by not showing errors too early

## Technical Implementation

- **Validation Library**: Zod (TypeScript-first schema validation)
- **Form Library**: React Hook Form
- **Integration**: `@hookform/resolvers/zod` for seamless integration
- **Type Safety**: Full TypeScript support with inferred types from Zod schemas
