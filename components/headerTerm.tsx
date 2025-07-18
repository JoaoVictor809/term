'use client'
import { useRouter } from 'next/navigation'
import localFont from 'next/font/local'

const boldFont = localFont({ src: '../public/fonts/Poppins-Bold.ttf' })
export default function Pgmain() {
    const router = useRouter()
    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' })
        router.push('/') 
    }
    return (
        // main
        <div>
            {/* header */}
            <div className="w-full p-5 border-b border-[#e5e8eb] flex flex-row justify-between">
                <img src="/title.svg" alt="cobasi" className="w-1/3 md:w-[16%]" />
                <button onClick={handleLogout}
                className={`${boldFont.className} cursor-pointer h-[30px] w-[20%] md:w-[7%] bg-[#009CA6] text-white shadow-[0px_9px_11px_rgba(0,0,0,0.25)]`}>Sair</button>
            </div>
        </div>
    );
}
