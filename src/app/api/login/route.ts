import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { key } = body

    const validKey = '123456' // substitua por sua chave real

    if (key === validKey) {
        const response = NextResponse.json({ success: true })

        response.cookies.set({
            name: 'auth',
            value: 'true',
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 dia
        })

        return response
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
