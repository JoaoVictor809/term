import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ message: 'Logout realizado com sucesso' })

    response.cookies.set({
        name: 'auth',
        value: '',
        path: '/',
        maxAge: 0, 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    return response
}