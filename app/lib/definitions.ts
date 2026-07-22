import { z } from 'zod'

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    })
    .trim(),
})

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(1, { message: 'Password is required.' }).trim(),
})

export type SignupFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
      success?: boolean
    }
  | undefined

export type LoginFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const CheckoutAddressSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required.' }).trim(),
  phone: z.string().min(6, { message: 'Enter a valid phone number.' }).trim(),
  line1: z.string().min(3, { message: 'Address is required.' }).trim(),
  line2: z.string().trim().optional(),
  city: z.string().min(2, { message: 'City is required.' }).trim(),
  state: z.string().min(2, { message: 'State is required.' }).trim(),
  postalCode: z.string().min(4, { message: 'Postal code is required.' }).trim(),
  country: z.string().trim().default('IN'),
})
