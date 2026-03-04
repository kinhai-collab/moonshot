import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  const { pathname } = req.nextUrl

  const isDashboard =
    pathname.startsWith('/feed') ||
    pathname.startsWith('/discover') ||
    pathname.startsWith('/traders') ||
    pathname.startsWith('/trade') ||
    pathname.startsWith('/account')

  const isAuth = pathname === '/login' || pathname === '/register'

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAuth && token) {
    return NextResponse.redirect(new URL('/feed', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
