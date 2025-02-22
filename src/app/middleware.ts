import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";

const protectedRoutes = ['/dashboard', '/profile', '/pets']
const authRoutes = ['/login', '/register']
const onboardingRoutes = ['/completed-profile', '/questioner']

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // If no token and trying to access protected routes
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If has token
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const user = decoded as any;

      // If accessing auth routes while logged in
      if (authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }

      // Check profile completion first
      const isProfileIncomplete = !user.profile?.bio || 
                                !user.profile?.age || 
                                !user.profile?.gender;

      if (isProfileIncomplete && 
          !pathname.startsWith('/completed-profile') && 
          !authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/completed-profile', request.url))
      }

      // Check questionnaire completion
      const isQuestionnaireIncomplete = !user.questionnaire;
      
      // Force questionnaire completion for all protected routes
      if (isQuestionnaireIncomplete && 
          protectedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/questioner', request.url))
      }
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/pets/:path*',
    '/login',
    '/register',
    '/completed-profile',
    '/questioner'
  ]
}