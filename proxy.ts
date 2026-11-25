import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set to false (and redeploy) to take the site out of "under construction".
// While on, every public page shows /under-construction; the admin panel,
// API routes and static files keep working.
const UNDER_CONSTRUCTION = true
const UNDER_CONSTRUCTION_PATH = '/under-construction'
const underConstructionAllowed = ['/admin', UNDER_CONSTRUCTION_PATH, '/robots.txt', '/sitemap.xml', '/manifest.webmanifest']

const adminPublicRoutes = ['/admin/login', '/admin/signup']
const adminProtectedPrefix = '/admin'

const customerPublicRoutes = ['/login', '/signup']
const customerProtectedPrefixes = ['/account', '/checkout', '/orders']

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (UNDER_CONSTRUCTION) {
    const allowed = underConstructionAllowed.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    )
    if (!allowed) {
      return NextResponse.rewrite(new URL(UNDER_CONSTRUCTION_PATH, request.url))
    }
  } else if (pathname === UNDER_CONSTRUCTION_PATH) {
    return NextResponse.redirect(new URL('/', request.url))
  }

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

    return NextResponse.next()
  }

  const isCustomerPublic = customerPublicRoutes.includes(pathname)
  const isCustomerProtected = customerProtectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

  if (isCustomerPublic && session?.user) {
    const redirectTo = request.nextUrl.searchParams.get('redirect')
    const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/'
    return NextResponse.redirect(new URL(target, request.url))
  }

  if (isCustomerProtected && !session?.user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)'],
}
