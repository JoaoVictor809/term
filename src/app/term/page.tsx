'use client'
import dynamic from "next/dynamic";

const PagTerm = dynamic(() => import('../../../components/screenTerm'), { ssr: false });

export default function termPage() {
    return (
        <div>
            <PagTerm/>
        </div>
    )
}

//para trazer os dados em next é recomendado usar o useSearchParams
// texto do termo de resposabilidade 
// <p className="text-justify ">
//                         COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A., <pre></pre>
//                         pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-<pre></pre>
//                         01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila<pre></pre>
//                         Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada<pre></pre>
//                         EMPREGADORA, entrega neste ato, o NOTEBOOK, modelo: HP ELITEBOOK 640<pre></pre>
//                         G11 SÉRIE BRJ442MM83 e MOUSE C/ FIO, ao Colaborador {valor}<pre></pre>
//                         Cargo Especialista de Prevenção e Perdas, portador do RG sob o nº MG19303083<pre></pre>
//                         doravante DENOMINADO simplesmente COLABORADOR, sob as seguintes<pre></pre>
//                         seguintes condições:<pre></pre>
//                         <pre></pre>
//                         1. Dados corporativos devem ser salvos em nuvem ou nas pastas<pre></pre>
//                         disponibilizadas na rede corporativa.<pre></pre>

//                         2. Ficará o Colaborador em caso de necessidade da troca da máquina em<pre></pre>
//                         caráter de manutenção, responsável pelo BACKUP dos arquivos que julga<pre></pre>
//                         necessários, em função do seu trabalho (PSTs, DOCs, etcs.).<pre></pre>

//                         3. Em caso de arquivos terem sido mantidos localmente na máquina, será<pre></pre>
//                         necessário a abertura de uma solicitação para recuperação dos arquivos.<pre></pre>

//                         4. O colaborador fica ciente que, passado o prazo de 5 (cinco) dias corridos, a<pre></pre>
//                         máquina recolhida pela equipe de TI passará pelo processo de formatação<pre></pre>
//                         e não serão mais mantidos os arquivos salvos na máquina física.
//                     </p>

// import React, { useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';

// const AssinaturaForm = () => {
//     const sigCanvas = useRef<SignatureCanvas>(null);
//     const clearSignature = () => {
//         sigCanvas.current?.clear();
//     };

//     const saveSignature = () => {
//         if (sigCanvas.current) {
//             const dataUrl = sigCanvas.current.toDataURL();
//             console.log('Assinatura salva:', dataUrl);
//             // Aqui você pode enviar dataUrl para o seu backend ou usá-la
//         }
//     };

//     return (
//         <div>
//             <SignatureCanvas
//                 ref={sigCanvas}
//                 penColor='black'
//                 canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
//             />
//             <div>
//                 <button onClick={clearSignature}>Limpar</button>
//                 <button onClick={saveSignature}>Salvar</button>
//             </div>
//         </div>
//     );
// };

// export default AssinaturaForm;