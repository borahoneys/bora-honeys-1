import 'server-only'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const verifySession = cache(async () => {
  const session = await auth()

  if (!session?.user) {
    redirect('/admin/login')
  }

  return session
})

export const verifyAdminSession = cache(async () => {
  const session = await auth()
  const role = (session?.user as { role?: string } | undefined)?.role

  if (!session?.user) {
    redirect('/admin/login')
  }

  if (role !== 'admin' && role !== 'super_admin') {
    redirect('/')
  }

  return session
})
