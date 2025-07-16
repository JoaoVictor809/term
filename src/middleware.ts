import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    const auth = request.cookies.get('auth')?.value

    const isProtectedRoute = ['/registro', '/term'].some((path) =>
        request.nextUrl.pathname.startsWith(path)
    )

    if (isProtectedRoute && auth !== 'true') {
        return NextResponse.redirect(new URL('/', request.url)) // volta para tela de login
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/registro', '/term'],
}
