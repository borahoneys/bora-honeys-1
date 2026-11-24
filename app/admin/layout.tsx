import type { ReactNode } from 'react'
import { auth } from '@/auth'
import type { Metadata } from 'next'
import AdminSidebar from './_components/AdminSidebar'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-background overflow-hidden font-sans">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
