import { NextRequest, NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, PageBreak } from "docx";
import { Buffer } from "buffer";
import { Octokit } from "@octokit/rest";

export async function POST(req: NextRequest) {
    try {
        const logoUrl = new URL("/logo.png", req.url).toString();
        const logoResponse = await fetch(logoUrl);
        const logoBuffer = await logoResponse.arrayBuffer();

        const body = await req.json();
        const { nome, cargo, rg, data, assinaturaBase64 } = body;

        if (!nome || !cargo || !rg || !data) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const quebraLinha = () => new Paragraph({ text: "", spacing: { before: 200 } });

        const termoNotebook = [
            new Paragraph({
                alignment: AlignmentType.START,
                children: [
                    new ImageRun({
                        data: logoBuffer,
                        type: "png",
                        transformation: {
                            width: 120,
                            height: 91,
                        },
                    }),
                ],
            }),
            new Paragraph({
                alignment: AlignmentType.START,
                children: [
                    new TextRun({
                        text: "TERMO DE RESPONSABILIDADE - NOTEBOOK CORPORATIVO",
                        bold: true,
                        size: 28,
                        font: "Aptos (Corpo)",
                    }),
                ],
                spacing: { after: 300 },
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({ text: "COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A.,  ", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: "pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: " EMPREGADORA, ", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: "entrega neste ato, o ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "NOTEBOOK", bold: true, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: ", modelo: ", size: 24, font: "Aptos (Corpo)" }),
                    new TextRun({ text: "HP ELITEBOOK 640 G11  ", bold: true, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "SÉRIE", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "BRJ442MM83 e MOUSE C/ FIO,", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: " ao Colaborador ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: nome, bold: true, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: ", Cargo ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: cargo, bold: true, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: ", portador do RG sob o nº ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: rg, bold: true, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: ", doravante  ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "DENOMINADO", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: " simplesmente", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "  COLABORADOR", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: ", sob as seguintes condições:", font: "Aptos (Corpo)", size: 24 }),
                ],
            }),
            quebraLinha(),
            new Paragraph({
                numbering: { reference: "notebookList", level: 0 },
                children: [new TextRun({ text: "O Notebook deverá ser numbering ÚNICA e EXCLUSIVAMENTE a serviço da empresa, tendo em vista a atividade a ser exercida pelo Colaborador.", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "notebookList", level: 0 },
                children: [new TextRun({ text: "Ficará o Colaborador responsável pelo uso do equipamento, sendo que, em caso de comprovado mau uso, por culpa ou dolo do Colaborador, este ressarcirá a EMPREGADORA COBASI pelos danos e prejuízos causados por sua ação ou omissão.", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "notebookList", level: 0 },
                children: [new TextRun({ text: "O Colaborador tem somente a DETENÇÃO, tendo em vista o uso exclusivo para prestação de serviços profissionais e NÃO a PROPRIEDADE, sendo terminantemente proibido o empréstimo, aluguel ou cessão deste a terceiros.", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "notebookList", level: 0 },
                children: [new TextRun({ text: "Ao término da prestação de serviço ou do contrato individual de trabalho, o Colaborador compromete-se a devolver o NOTEBOOK COM CARREGADOR, em perfeito estado, no mesmo dia em que for comunicado ou comunique seu desligamento.", font: "Aptos (Corpo)", size: 24 })],
            }),
        ];

        const termoBackup = [
            new Paragraph({ children: [new PageBreak()] }),
            new Paragraph({
                alignment: AlignmentType.START,
                children: [
                    new ImageRun({
                        data: logoBuffer,
                        type: "png",
                        transformation: {
                            width: 120,
                            height: 91,
                        },
                    }),
                ],
            }),
            new Paragraph({
                alignment: AlignmentType.START,
                children: [
                    new TextRun({
                        text: "TERMO DE RESPONSABILIDADE DE BACKUP – DADOS CORPORATIVO",
                        bold: true,
                        size: 28,
                        font: "Aptos (Corpo)",
                    }),
                ],
                spacing: { after: 300 },
            }),
            new Paragraph({
                alignment: AlignmentType.START,
                children: [
                    new TextRun({
                        text: `COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A.,`,
                        font: "Aptos (Corpo)",
                        bold: true,
                        size: 24
                    }),
                    new TextRun({ text: " pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada ", font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: "EMPREGADORA,", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: ` neste ato comunica que a responsabilidade pelo salvamento e arquivamento de dados corporativos são de inteira responsabilidade do ${nome}, cargo ${cargo}, portador do RG sob o nº ${rg},`, font: "Aptos (Corpo)", size: 24 }),
                    new TextRun({ text: " DENOMINADO ", font: "Aptos (Corpo)", bold: true, size: 24 }),
                    new TextRun({ text: "simplesmente COLABORADOR, sob as seguintes condições:", font: "Aptos (Corpo)", size: 24 }),

                ],
            }),
            quebraLinha(),
            new Paragraph({
                numbering: { reference: "backupList", level: 0 },
                children: [new TextRun({ text: "Dados corporativos devem ser salvos em nuvem ou nas pastas disponibilizadas na rede corporativa.", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "backupList", level: 0 },
                children: [new TextRun({ text: "Ficará o Colaborador em caso de necessidade da troca da máquina em caráter de manutenção, responsável pelo BACKUP dos arquivos que julgar necessários, em função do seu trabalho (PSTs, DOCs, etcs.).", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "backupList", level: 0 },
                children: [new TextRun({ text: "Em caso de arquivos terem sido mantidos localmente na máquina, será necessário a abertura de uma solicitação para recuperação dos arquivos.", font: "Aptos (Corpo)", size: 24 })],
            }),
            new Paragraph({
                numbering: { reference: "backupList", level: 0 },
                children: [new TextRun({ text: "O colaborador fica ciente que, passado o prazo de 5 (cinco) dias corridos, a máquina recolhida pela equipe de TI passará pelo processo de formatação e não serão mais mantidos os arquivos salvos na máquina física.", font: "Aptos (Corpo)", size: 24 })],
            }),
        ];

        const assinaturaContent = [];
        if (assinaturaBase64 && typeof assinaturaBase64 === 'string') {
            assinaturaContent.push(
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new ImageRun({
                            data: Buffer.from(assinaturaBase64, "base64"),
                            type: "png",
                            transformation: {
                                width: 200,
                                height: 100,
                            },
                        }),
                    ],
                })
            );
        }

        const assinaturaFinal = [
            quebraLinha(),
            quebraLinha(),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `São Paulo, ${data}`, font: "Aptos (Corpo)", size:24 })],
            }),
            quebraLinha(),
            ...assinaturaContent,
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: assinaturaBase64 ? 0 : 200 },
                children: [new TextRun({ text: "_____________________________________________", font: "Aptos (Corpo)" })],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: nome, font: "Aptos (Corpo)", bold: true })],
            }),
        ];

        const doc = new Document({
            numbering: {
                config: [
                    {
                        reference: "notebookList",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.LEFT,
                                style: { paragraph: { indent: { left: 720 } } },
                            },
                        ],
                    },
                    {
                        reference: "backupList",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.LEFT,
                                style: { paragraph: { indent: { left: 720 } } },
                            },
                        ],
                    },
                ],
            },
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 1418,      // 2,5 cm
                                bottom: 1418,   // 2,5 cm
                                left: 1701,     // 3 cm
                                right: 1701     // 3 cm
                            },
                        },
                    },
                    children: [
                        ...termoNotebook,
                        ...assinaturaFinal,
                        ...termoBackup,
                        ...assinaturaFinal,
                    ],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);

        // Upload to GitHub
        const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
        const owner = process.env.GITHUB_OWNER;
        const repo = process.env.GITHUB_REPO;
        const filePath = process.env.GITHUB_PATH ? `${process.env.GITHUB_PATH}/termo-responsabilidade-${nome}-${data}.docx` : `termo-responsabilidade-${nome}-${data}.docx`;

        if (owner && repo) {
            await octokit.repos.createOrUpdateFileContents({
                owner,
                repo,
                path: filePath,
                message: `Adicionando termo de responsabilidade para ${nome}`,
                content: buffer.toString("base64"),
            });
        }

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="termo-responsabilidade-${nome}.docx"`,
            },
        });
    } catch (error) {
        console.error("Error generating document:", error);
        return NextResponse.json(
            { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
