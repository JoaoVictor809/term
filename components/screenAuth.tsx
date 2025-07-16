'use client'

import localFont from 'next/font/local'
import { useState } from "react"
import { useRouter } from 'next/navigation'
import Loader from '../components/animation/LoadingAuth'

const boldFont = localFont({ src: '../public/fonts/Poppins-Bold.ttf' })

export default function screenAuth() {
    const [inputKey, setInputKey] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try{
            const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: inputKey }),
        })

        if (res.ok) {
            setLoading(false)
            router.push('/registro')
        } else {
            setLoading(false)
            setError('Chave inválida')
        }
        }catch{
            setLoading(false)
            setError('Erro inesperado ao se autenticar entrar em contato com T.I')
        }
    }
    if (loading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col items-center justify-center gap-20">
            <img src="/shape001.svg" alt="" className="absolute top-0 left-0 w-[20%]" />
            <img src="/title.svg" alt="" className="pt-10" />
            <p className={`${boldFont.className} text-2xl`}>Termo de responsabilidade</p>

            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-5 w-full'>
                <label className={`${boldFont.className} text-2xl`}>Chave de acesso:</label>
                <input
                    type="text"
                    className='bg-[#d9d9d971] pl-2 outline-0 w-[70%] md:w-[50%] h-[50px] shadow-[0px_9px_11px_rgba(0,0,0,0.25)]'
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    required
                />
                <button
                    type='submit'
                    className={`${boldFont.className} bg-[#009CA6] text-[20px] w-[30%] h-[50px] md:w-[10%] shadow-[0px_9px_11px_rgba(0,0,0,0.25)] cursor-pointer active:opacity-25`}
                >Entrar</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

            <img src="/shape002.svg" alt="" className="absolute bottom-0 right-0" />
        </div>
    )
}
