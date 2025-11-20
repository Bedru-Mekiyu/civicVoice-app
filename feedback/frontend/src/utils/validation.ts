import { z } from 'zod'

// Form validation schemas using Zod
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters')
})

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\u1200-\u137F]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const feedbackSchema = z.object({
  sector: z
    .string()
    .min(1, 'Please select a sector'),
  institution: z
    .string()
    .min(1, 'Please select an institution'),
  rating: z
    .number()
    .min(1, 'Please provide a rating')
    .max(5, 'Rating must be between 1 and 5'),
  comment: z
    .string()
    .trim()
    .min(10, 'Comment must be at least 10 characters')
    .max(2000, 'Comment must be less than 2000 characters'),
  files: z
    .array(z.instanceof(File))
    .optional()
    .refine((files) => {
      if (!files) return true
      return files.every(file => file.size <= 10 * 1024 * 1024) // 10MB limit
    }, 'Each file must be less than 10MB')
    .refine((files) => {
      if (!files) return true
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']
      return files.every(file => allowedTypes.includes(file.type))
    }, 'Only images, PDFs, and text files are allowed')
})

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only numbers')
})

// Sanitization utilities
export const sanitizeHtml = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

export const sanitizeForUrl = (input: string): string => {
  return encodeURIComponent(input.trim())
}

// Input validation helpers
export const isValidEmail = (email: string): boolean => {
  return loginSchema.shape.email.safeParse(email).success
}

export const isValidPassword = (password: string): boolean => {
  return z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be less than 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number')
    .safeParse(password).success
}

export const isValidFileSize = (file: File, maxSizeInMB: number = 10): boolean => {
  return file.size <= maxSizeInMB * 1024 * 1024
}

export const isValidFileType = (file: File, allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']): boolean => {
  return allowedTypes.includes(file.type)
}

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests: number[] = []
  
  return (): boolean => {
    const now = Date.now()
    
    // Remove old requests outside the window
    while (requests.length > 0 && requests[0] <= now - windowMs) {
      requests.shift()
    }
    
    // Check if we've exceeded the limit
    if (requests.length >= maxRequests) {
      return false
    }
    
    requests.push(now)
    return true
  }
}

export type LoginForm = z.infer<typeof loginSchema>
export type RegisterForm = z.infer<typeof registerSchema>
export type FeedbackForm = z.infer<typeof feedbackSchema>
export type OtpForm = z.infer<typeof otpSchema>