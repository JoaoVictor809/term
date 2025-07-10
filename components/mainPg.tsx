'use client'
import localFont from 'next/font/local'
import { useState } from 'react';
import { RiMessage3Fill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Header from '../components/headerTerm'
import Loader from '../components/animation/Loader'


const boldFont = localFont({ src: '../public/fonts/Poppins-Bold.ttf' })
const regularFont = localFont({ src: '../public/fonts/Poppins-Regular.ttf' })
export default function Pgmain() {
    const [inputName, setInputName] = useState('');
    const [inputPosition, setInputPosition] = useState('');
    const [inputRg, setInputRg] = useState('');
    const [showContact, setShowContact] = useState(false);
    // monitoramento da animação de carregar 
    const [loading, setLoading] = useState(false);

    const [click, setClick] = useState(Number)


    const handleClick = () => {
        if (click === 0) {
            // Primeira ação
            setShowContact(true)
            setClick(1);
        } else {
            // Segunda ação
            setShowContact(false)
            setClick(0);
        }
    };
    const router = useRouter();

    const handleRouter = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                router.push(`/term?nome=${inputName}&cargo=${inputPosition}&rg=${inputRg}`);
            } catch {
                alert('Erro ao gerar contrato');
                setLoading(false);
            }
        }, 5000); 
    };


    if (loading) {
        return <Loader />
    }

    return (
        // main
        <div>
            {/* header */}
            <Header />

            {/* main */}
            <div className="p-3 flex flex-col gap-7 relative min-h-screen">
                <p className={`${boldFont.className} text-2xl md:text-3xl`}>Termo de responsabilidade</p>
                <form className="flex flex-col gap-5" action={handleRouter}>
                    {/* inputs */}
                    <div className="flex flex-col md:flex-row md:gap-5 gap-3 flex-wrap">
                        <input
                            type="text"
                            className={`${regularFont.className} w-full md:w-auto outline-0 border border-[#009CA6] p-4 rounded-2xl placeholder:text-[#009CA6]`}
                            placeholder="Nome Completo"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className={`${regularFont.className} w-full md:w-auto outline-0 border border-[#009CA6] p-4 rounded-2xl placeholder:text-[#009CA6]`}
                            placeholder="Cargo"
                            value={inputPosition}
                            onChange={(e) => setInputPosition(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            className={`${regularFont.className} w-full md:w-auto outline-0 border border-[#009CA6] p-4 rounded-2xl placeholder:text-[#009CA6]`}
                            placeholder="RG sem os pontos"
                            value={inputRg}
                            onChange={(e) => setInputRg(e.target.value)}
                            required
                        />
                    </div>
                    {/* botão */}
                    <div>
                        <button
                            type='submit'
                            className={`${regularFont.className} bg-[#009CA6] w-full md:w-auto p-4 text-white rounded-2xl shadow-lg hover:-translate-y-1 duration-300 ease-out hover:shadow-xl/30 active:opacity-25`}
                        >
                            Seguir
                        </button>
                    </div>
                </form>

                {/* contato com a julia */}
                <div className="fixed bottom-6 left-6 flex flex-row items-end gap-3 z-50">
                    <button
                        onClick={handleClick}
                        className="flex items-center justify-center w-14 h-14 bg-[#009CA6] rounded-full shadow-lg"
                    >
                        <RiMessage3Fill color="#fff" size={30} />
                    </button>
                    {showContact && (
                        <div className="backdrop-blur-md bg-white/30 border border-white/20 shadow-xl/30 rounded-2xl max-w-[80vw]">
                            <div className="flex flex-row gap-5 p-3 items-center">
                                <MdEmail color="#009CA6" size={25} />
                                <div>
                                    <p className={`${boldFont.className} text-[#009CA6]`}>Email</p>
                                    <p className={`${regularFont.className} text-sm break-words`}>julia.moreira@petanjofranqueadora.com.br</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* imagem */}
                <div className="absolute right-0 bottom-0 hidden md:block z-0">
                    <img src="/animals.svg" alt="Imagem ilustrativa de um cão e gato" />
                </div>
            </div>
        </div>

    );
}
