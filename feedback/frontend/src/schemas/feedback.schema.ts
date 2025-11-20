import { z } from 'zod';

// Ethiopian regions for validation
export const ethiopianRegions = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'SNNPR',
  'Somali',
  'Tigray',
] as const;

// Ethiopian sectors
export const ethiopianSectors = [
  'Healthcare',
  'Education',
  'Infrastructure',
  'Agriculture',
  'Justice',
  'Public Safety',
  'Environment',
  'Economy',
  'Social Services',
  'Technology',
] as const;

type EthiopianSector = typeof ethiopianSectors[number];

// Feedback status types
export const feedbackStatuses = [
  'pending',
  'under_review',
  'in_progress',
  'resolved',
  'rejected',
] as const;

// Phone number validation for Ethiopian format
const ethiopianPhoneRegex = /^\+251[79]\d{8}$|^0[79]\d{8}$/;

// Feedback submission schema
export const feedbackSubmissionSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must be less than 200 characters'),
  comment: z
    .string()
    .trim()
    .min(20, 'Feedback must be at least 20 characters')
    .max(2000, 'Feedback must be less than 2000 characters'),
  sector: z.string().refine(
    (val) => ethiopianSectors.includes(val as any),
    { message: 'Please select a valid sector' }
  ),
  region: z.string().refine(
    (val) => ethiopianRegions.includes(val as any),
    { message: 'Please select a valid region' }
  ),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  anonymous: z.boolean().default(false),
  contactEmail: z
    .string()
    .email('Please enter a valid email address')
    .optional()
    .or(z.literal('')),
  contactPhone: z
    .string()
    .regex(ethiopianPhoneRegex, 'Please enter a valid Ethiopian phone number (+251 or 09)')
    .optional()
    .or(z.literal('')),
});

// User profile schema
export const userProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(ethiopianPhoneRegex, 'Please enter a valid Ethiopian phone number')
    .optional()
    .or(z.literal('')),
  region: z.string().refine(
    (val) => !val || ethiopianRegions.includes(val as any),
    'Please select a valid region'
  ).optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
});

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Contact form schema
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z
    .string()
    .trim()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .trim()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

// Type exports
export type FeedbackSubmission = z.infer<typeof feedbackSubmissionSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
