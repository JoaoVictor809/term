import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import nodemailer from "nodemailer";
import { Octokit } from "@octokit/rest";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, cargo, rg, data, assinaturaBase64, emailClient } = body;


    if (!nome || !cargo || !rg || !data || !emailClient) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Monta um template HTML simples mas estilizado
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <style>
          @font-face {
            font-family: 'Aptos';
            src: url('https://your-cdn.com/fonts/aptos.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          body {
            font-family: 'Aptos', sans-serif;S
            font-size: 12pt;
            color: #000;
          }
          h1 {
            font-weight: bold;
            font-size: 12pt;
            margin-bottom: 20px;
          }
          p {
            text-align: justify;
            margin-bottom: 10px;
            line-height: 1.5;
          }
          .bold {
            font-weight: bold;
          }
          ul {
            list-style-type: decimal;
            padding-left: 40px;
          }
          .signature {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          li{
          text-align: justify;
          }
          .page-break {
            page-break-before: always;
          }
          .assinatura {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
           .space{
           padding-top: 7px;
           }
        </style>
      </head>
      <body>
        <img src="http://localhost:3000/logo.png" alt="Logo" width="120" height="100" />
        <h1>TERMO DE RESPONSABILIDADE - NOTEBOOK CORPORATIVO</h1>

        <p><span class="bold">COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A.</span>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada <span class="bold">EMPREGADORA</span>, entrega neste ato, o <span class="bold">NOTEBOOK</span>, modelo: <span class="bold">HP ELITEBOOK 640 G11</span> SÉRIE <span class="bold">BRJ442MM83, MOCHILA e MOUSE C/ FIO,</span> ao Colaborador <span class="bold">${nome}</span>, Cargo <span class="bold">${cargo}</span>, portador do RG sob o nº <span class="bold">${rg}</span>, doravante denominado <span class="bold">COLABORADOR</span>, sob as seguintes condições:</p>

        <ol>
          <li>O Notebook deverá ser utilizado ÚNICA e EXCLUSIVAMENTE a serviço da empresa, tendo em vista a atividade a ser exercida pelo Colaborador.</li>
          <br>
          <li>Ficará o Colaborador responsável pelo uso do equipamento, sendo que, em caso de comprovado mau uso, por culpa ou dolo do Colaborador, este ressarcirá a <span class="bold">EMPREGADORA</span> COBASI pelos danos e prejuízos causados por sua ação ou omissão.</li>
          <br>
          <li>O Colaborador tem somente a DETENÇÃO, tendo em vista o uso exclusivo para prestação de serviços profissionais e NÃO a PROPRIEDADE, sendo terminantemente proibido o empréstimo, aluguel ou cessão deste a terceiros.</li>
          <br>
          <li>Ao término da prestação de serviço ou do contrato individual de trabalho, o Colaborador compromete-se a devolver o NOTEBOOK COM CARREGADOR, em perfeito estado, no mesmo dia em que for comunicado ou comunique seu desligamento.</li>
        </ol>

        <div class="signature">
          <p>São Paulo, ${data}</p>
          <div class="assinatura">
          ${assinaturaBase64 ? `<img src="data:image/png;base64,${assinaturaBase64}" alt="Assinatura" width="160" height="70"/>` : '<p>_____________________________________________</p>'}
          <p>_____________________________________________</p>
          <p><strong>${nome}</strong></p>
          </div>
        </div>
        <div class="page-break"></div>
        <div class="space"></div>
        
        <img src="http://localhost:3000/logo.png" alt="Logo" width="120" height="100" />
        <h1>TERMO DE RESPONSABILIDADE DE BACKUP - DADOS CORPORATIVO</h1>

        <p><span class="bold">COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A.</span>, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada <span class="bold">EMPREGADORA</span>, neste ato comunica que a responsabilidade pelo salvamento e arquivamento de dados corporativos são de inteira responsabilidade do <strong>${nome}</strong> cargo <strong>${cargo}</strong>, portador do RG sob o nº <strong>${rg}</strong>, <span class="bold">DENOMINADO</span> simplesmente <span class="bold">COLABORADOR</span>, sob as seguintes condições:</p>

        <ol>
          <li>Dados corporativos devem ser salvos em nuvem ou nas pastas disponibilizadas na rede corporativa.</li>
          <br>
          <li>Ficará o Colaborador em caso de necessidade da troca da máquina em caráter de manutenção, responsável pelo BACKUP dos arquivos que julgar necessários, em função do seu trabalho (PSTS, DOCs, etcs.).</li>
          <br>
          <li>Em caso de arquivos terem sido mantidos localmente na máquina, será necessário a abertura de uma solicitação para recuperação dos arquivos.</li>
          <br>
          <li>O colaborador fica ciente que, passado o prazo de 5 (cinco) dias corridos, a máquina recolhida pela equipe de TI passará pelo processo de formatação e não serão mais mantidos os arquivos salvos na máquina física.</li>
        </ol>
        <div class="signature">
          <p>São Paulo, ${data}</p>
          <div class="assinatura">
          ${assinaturaBase64 ? `<img src="data:image/png;base64,${assinaturaBase64}" alt="Assinatura" width="160" height="70"/>` : '<p>_____________________________________________</p>'}
          <p>_____________________________________________</p>
          </div>
          <p><strong>${nome}</strong></p>
        </div>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "0cm",
        bottom: "2.5cm",
        left: "3cm",
        right: "3cm",
      },
    });
    //envio para o emial 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // Envia e-mail mas não espera o resultado (ignora erro, só loga)
    transporter.sendMail({
      from: 'joaovictorcobasi@gmail.com',
      to: emailClient,
      subject: 'Testando o envio do email',
      text: "Segue em anexo o termo de responsabilidade.",
      attachments: [
        {
          filename: `termo-responsabilidade-${nome}.pdf`,
          content: Buffer.from(pdfBuffer),
          contentType: 'application/pdf',
        },
      ],
    }).then(info => {
      console.log("E-mail enviado:", info);
    }).catch(error => {
      console.error("Erro ao enviar e-mail:", error);
    });

    // Fecha navegador
    await browser.close();

    // Sempre retorna o PDF no navegador
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="termo-responsabilidade-${nome}.pdf"`,
      },
    });


  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao gerar PDF" }, { status: 500 });
  }
}