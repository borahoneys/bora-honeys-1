import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const adminPublicRoutes = ['/admin/login', '/admin/signup']
const adminProtectedPrefix = '/admin'

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const user = session?.user as ({ role?: string } & NonNullable<typeof session>['user']) | undefined

  const isAdminPublic = adminPublicRoutes.includes(pathname)
  const isAdminRoute = pathname.startsWith(adminProtectedPrefix)

  if (isAdminPublic && session?.user) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (isAdminRoute && !isAdminPublic) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    if (user?.role !== 'admin' && user?.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)'],
}
