'use client'
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation'
import localFont from 'next/font/local'
import { useState, useRef, useEffect } from "react";
import SignatureCanvas from 'react-signature-canvas';
import { IoClose } from "react-icons/io5";
import Loader from '../components/animation/Loader'
import Swal from 'sweetalert2'
import CryptoJS from "crypto-js";

const PagTerm = dynamic(() => import('./headerTerm'), { ssr: false });
// fontes
const boldFont = localFont({ src: '../public/fonts/Poppins-Bold.ttf' })
export default function termPage() {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const clearSignature = () => {
        sigCanvas.current?.clear();
    };
    // formato da data na assinatura
    const [dataFormatada, setDataFormatada] = useState('');
    useEffect(() => {
        const date = new Date();
        const formattedDate = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }).format(date);
        setDataFormatada(formattedDate);
    }, []);

    const secretKey = process.env.NEXT_PUBLIC_AES_SECRET as string;
    const decrypt = (cipherText: string) => {
        const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    };
    const searchParams = useSearchParams();
    const encryptedRg = searchParams.get("rg");

    let rg = "";
    if (encryptedRg) {
        try {
            rg = decrypt(decodeURIComponent(encryptedRg));
        } catch (e) {
            console.error("Erro ao descriptografar RG:", e);
        }
    }

    const nome = searchParams.get('nome')
    const cargo = searchParams.get('cargo')
    const serie = searchParams.get('serie')
    const [showTermBackup, setShowTermBack] = useState(false);
    const [showTermNote, setShowTermNote] = useState(true);
    // botão seguir
    const [showButtonGo, setShowButtonGo] = useState(true)
    // botão assinar
    const [showButtonSign, setShowButtonSign] = useState(false)
    // campo assinar
    const [showToSign, setShowToSign] = useState(false)
    const [signatureURL, setSignatureURL] = useState<string | null>(null);
    //botão de salvar
    const [showButtonSave, setShowButtonSave] = useState(false);
    // monitoramento da animação de carregar 
    const [loading, setLoading] = useState(false);

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <PagTerm />
            {showTermBackup && (
                <div className="flex flex-col items-center justify-center pt-10 gap-7">
                    <h1 className={`${boldFont.className} text-2xl text-center`}>TERMO DE RESPONSABILIDADE DE BACKUP – DADOS CORPORATIVO</h1>
                    <div className="w-5/6 max-h-90 overflow-y-auto scroll flex flex-col gap-5 md:w-2/3 md:max-h-80">
                        <div className="text-justify ">
                            <strong>COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A., </strong>
                            pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-
                            01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila
                            Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada
                            {" "}<strong>EMPREGADORA,</strong> neste ato comunica que a responsabilidade pelo salvamento e
                            arquivamento de dados corporativos são de inteira responsabilidade do {" "}
                            <strong>{nome}</strong>, cargo <strong>{cargo}</strong>, portador do RG sob o
                            nº <strong>{rg}</strong>, DENOMINADO simplesmente <strong>COLABORADOR</strong>, sob as
                            seguintes condições:
                            <pre></pre>
                            1. Dados corporativos devem ser salvos em nuvem ou nas pastas
                            disponibilizadas na rede corporativa.
                            <pre></pre>
                            2. Ficará o Colaborador em caso de necessidade da troca da máquina em
                            caráter de manutenção, responsável pelo BACKUP dos arquivos que julga
                            necessários, em função do seu trabalho (PSTs, DOCs, etcs.).
                            <pre></pre>
                            3. Em caso de arquivos terem sido mantidos localmente na máquina, será
                            necessário a abertura de uma solicitação para recuperação dos arquivos.
                            <pre></pre>
                            4. O colaborador fica ciente que, passado o prazo de 5 (cinco) dias corridos, a
                            máquina recolhida pela equipe de TI passará pelo processo de formatação
                            e não serão mais mantidos os arquivos salvos na máquina física.
                        </div>
                        <div className="text-center">
                            São Paulo, {dataFormatada}
                        </div>
                        <div className="flex flex-col items-center mt-10">
                            {signatureURL && (
                                <img src={signatureURL} alt="Assinatura" className="mt-4 w-[200px] h-[100px] object-contain" />
                            )}
                            <div className="w-60 h-px bg-black" />
                            <span className="text-sm text-gray-700 mt-2"><strong>{nome}</strong></span>
                        </div>
                    </div>
                </div>
            )}
            {/* TERMO DE RESPONSABILIDADE - NOTEBOOK CORPORATIVO */}
            {showTermNote && (
                <div className="flex flex-col items-center justify-center pt-10 gap-7">
                    <h1 className={`${boldFont.className} text-2xl text-center`}>TERMO DE RESPONSABILIDADE - NOTEBOOK CORPORATIVO</h1>
                    <div className="w-5/6 max-h-90 overflow-y-auto scroll flex flex-col gap-5 md:w-2/3 md:max-h-80">
                        <div className="text-justify ">
                            <strong>COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A.,</strong>
                            {" "}pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-
                            01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila
                            Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada {" "}
                            <strong>EMPREGADORA</strong>, entrega neste ato, o <strong>NOTEBOOK</strong>, modelo: <strong>HP ELITEBOOK 640
                                G11</strong> SÉRIE <strong>{serie}</strong> e <strong>MOUSE C/ FIO</strong>, ao Colaborador <strong>{nome}</strong> {" "}
                            Cargo <strong>{cargo}</strong>, portador do RG sob o nº <strong>{rg}</strong> {" "}
                            doravante <strong>DENOMINADO</strong> simplesmente <strong>COLABORADOR</strong>, sob as seguintes
                            seguintes condições:
                            <pre></pre>
                            1. Dados corporativos devem ser salvos em nuvem ou nas pastas
                            disponibilizadas na rede corporativa.
                            <pre></pre>
                            2. Ficará o Colaborador em caso de necessidade da troca da máquina em
                            caráter de manutenção, responsável pelo BACKUP dos arquivos que julga
                            necessários, em função do seu trabalho (PSTs, DOCs, etcs.).
                            <pre></pre>
                            3. Em caso de arquivos terem sido mantidos localmente na máquina, será
                            necessário a abertura de uma solicitação para recuperação dos arquivos.
                            <pre></pre>
                            4. O colaborador fica ciente que, passado o prazo de 5 (cinco) dias corridos, a
                            máquina recolhida pela equipe de TI passará pelo processo de formatação
                            e não serão mais mantidos os arquivos salvos na máquina física.
                        </div>
                        <div className="text-center">
                            São Paulo, {dataFormatada}
                        </div>
                        <div className="flex flex-col items-center mt-10">
                            {signatureURL && (
                                <img src={signatureURL} alt="Assinatura" className="mt-4 w-[200px] h-[100px] object-contain" />
                            )}
                            <div className="w-60 h-px bg-black" />
                            <span className="text-sm text-gray-700 mt-2"><strong>{nome}</strong></span>

                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-around items-center pt-7">
                <button className="w-[20%] h-10 flex items-center justify-center cursor-pointer bg-[#D9D9D9] shadow-xl active:opacity-18"
                    onClick={() => {
                        setShowTermNote(true)
                        setShowTermBack(false)
                        setShowButtonGo(true)
                        setShowButtonSign(false)
                    }}>Voltar</button>
                {showButtonGo && (
                    <button className="w-[20%] h-10 flex items-center justify-center cursor-pointer bg-[#009CA6] shadow-xl active:opacity-18"
                        onClick={() => {
                            setShowTermNote(false)
                            setShowTermBack(true)
                            setShowButtonGo(false)
                            setShowButtonSign(true)
                        }}>Seguir</button>
                )}
                {showButtonSign && (
                    <button className="w-[20%] h-10 flex items-center justify-center cursor-pointer bg-[#009CA6] shadow-xl active:opacity-18"
                        onClick={() => {
                            setShowToSign(true)
                        }}>Assinar</button>
                )}
                {showButtonSave && (
                    <button
                        className="w-[20%] h-10 flex items-center justify-center cursor-pointer bg-[#7EB339] shadow-xl active:opacity-18"
                        onClick={async () => {
                            if (!signatureURL) {
                                Swal.fire({
                                    title: "Erro na assinatura!",
                                    text: "Assinatura não encontrada!",
                                    icon: "error"
                                });
                                return;
                            }

                            try {
                                setLoading(true);
                                const base64 = signatureURL.replace(/^data:image\/png;base64,/, "");
                                const res = await fetch("/api/gerarDocx", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        nome,
                                        cargo,
                                        rg,
                                        data: dataFormatada,
                                        assinaturaBase64: base64,
                                    }),
                                });
                                if (res.ok) {
                                    setLoading(false);
                                    Swal.fire({
                                        title: "Termo salvo!",
                                        text: "Seu termo de responsabilidade foi salvo no nosso sistema",
                                        icon: "success"
                                    });
                                }
                                if (!res.ok) {
                                    const errorData = await res.json().catch(() => ({ message: "Erro desconhecido ao gerar o documento." }));
                                    Swal.fire({
                                        title: "Erro na formatação do documento!",
                                        text: `Erro ao gerar o documento: ${errorData.message || res.statusText}`,
                                        icon: "error"
                                    });
                                    return;
                                }
                                const blob = await res.blob();
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "termo-responsabilidade.docx";
                                document.body.appendChild(a);
                                a.click();
                                URL.revokeObjectURL(url);
                                document.body.removeChild(a);
                            } catch {
                                alert("Erro inesperado entrar")
                            }


                        }}
                    >
                        Salvar
                    </button>
                )}

            </div>
            {/* campo de assinar */}
            {showToSign && (
                <div className="w-[100%] h-[100vh] backdrop-blur-md bg-white/30 border border-white/20 shadow-xl/30 absolute top-0">
                    <div className="absolute top-10 right-10 cursor-pointer"
                        onClick={() => {
                            setShowToSign(false)
                        }}>
                        <IoClose size={35} color="#000" />
                    </div>
                    <div className="flex flex-col justify-center items-center h-[100%] gap-5">
                        Assinar:
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor='black'
                            backgroundColor="#fff"
                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas', color: '#fff' }}
                        />
                        <div className="flex flex-row gap-5">
                            <button className="w-[120px] h-10 flex items-center justify-center cursor-pointer bg-[#D9D9D9] shadow-xl active:opacity-18"
                                onClick={clearSignature}>Corrigir</button>
                            <button
                                className="w-[120px] h-10 flex items-center justify-center cursor-pointer bg-[#009CA6] shadow-xl active:opacity-18"
                                onClick={() => {
                                    const dataUrl = sigCanvas.current?.toDataURL("image/png");
                                    if (dataUrl) {
                                        setSignatureURL(dataUrl);
                                        setShowToSign(false);
                                        setShowButtonSave(true)
                                    }
                                }}
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

//para trazer os dados em next é recomendado usar o useSearchParams
// texto do termo de resposabilidade

//preciso pegar a assinatura junto com o contrato e colocar em um arquivo word
