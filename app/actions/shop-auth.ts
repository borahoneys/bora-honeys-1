'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth'
import { connectDB } from '@/lib/db/mongoose'
import User from '@/lib/models/User'
import { SignupSchema, SignupFormState, LoginFormState, LoginSchema } from '@/app/lib/definitions'
import { AuthError } from 'next-auth'

function safeRedirect(path: string | undefined) {
  return path && path.startsWith('/') ? path : '/'
}

export async function customerSignup(
  state: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const validated = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { name, email, password } = validated.data

  await connectDB()

  const existing = await User.findOne({ email })
  if (existing) {
    return { message: 'An account with this email already exists.' }
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'customer',
  })

  return { success: true, message: 'Account created. Please sign in.' }
}

export async function customerLogin(
  redirectTo: string | undefined,
  state: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  try {
    await signIn('credentials', {
      email: validated.data.email,
      password: validated.data.password,
      redirect: false,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid email or password.' }
        default:
          return { message: 'Something went wrong. Please try again.' }
      }
    }
    throw error
  }

  redirect(safeRedirect(redirectTo))
}

export async function customerLogout() {
  await signOut({ redirectTo: '/' })
}
