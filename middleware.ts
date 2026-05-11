import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/jwt'

// Rutas protegidas y sus roles permitidos
const protectedRoutes = {
  '/dashboard': ['ADMIN', 'USER'],
  '/formulario': ['ADMIN', 'USER'],
  '/multimedia': ['ADMIN', 'USER'],
  '/panel': ['ADMIN'],
}

// Rutas públicas que no deben ser accesibles si ya estás logueado
const publicRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('session')?.value

  let sessionData = null
  if (sessionToken) {
    try {
      sessionData = await decrypt(sessionToken)
    } catch (err) {
      // Token inválido o expirado
      sessionData = null
    }
  }

  // Si está logueado y trata de entrar a login/register, redirigir al dashboard (o panel si es admin)
  if (publicRoutes.includes(pathname) && sessionData) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = sessionData.role === 'ADMIN' ? '/panel' : '/dashboard'
    return NextResponse.redirect(redirectUrl)
  }

  // Verificar si la ruta requiere autenticación
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Si no hay sesión, al login
    if (!sessionData) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/login'
      return NextResponse.redirect(loginUrl)
    }

    // Verificar roles permitidos
    const matchingRoute = Object.keys(protectedRoutes).find(route => pathname.startsWith(route))
    if (matchingRoute) {
      const allowedRoles = protectedRoutes[matchingRoute as keyof typeof protectedRoutes]
      if (!allowedRoles.includes(sessionData.role)) {
        // No tiene permisos (ej: USER tratando de entrar a /panel)
        const dashboardUrl = request.nextUrl.clone()
        dashboardUrl.pathname = '/dashboard'
        return NextResponse.redirect(dashboardUrl)
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, we handle auth inside them if needed)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
