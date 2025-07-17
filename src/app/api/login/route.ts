import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { key } = body

    const validKey = 'CoB5202' 

    if (key === validKey) {
        const response = NextResponse.json({ success: true })

        response.cookies.set({
            name: 'auth',
            value: 'true',
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, 
        })

        return response
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
