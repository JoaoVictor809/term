import { NextRequest, NextResponse } from "next/server";
import { Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType } from "docx";
import { Buffer } from "buffer"; // Import Buffer

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { nome, cargo, rg, data, assinaturaBase64 } = body;

        if (!nome || !cargo || !rg || !data) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const quebraLinha = () => new Paragraph({ text: "", spacing: { before: 200 } });

        const termoNotebook = [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "TERMO DE RESPONSABILIDADE - NOTEBOOK CORPORATIVO",
                        bold: true,
                        size: 28, // Corresponds to 14pt
                    }),
                ],
                spacing: { after: 300 }, // 15pt spacing after
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun("COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A., "),
                    new TextRun("pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada "),
                    new TextRun({ text: "EMPREGADORA", bold: true }),
                    new TextRun(", entrega neste ato, o "),
                    new TextRun({ text: "NOTEBOOK", bold: true }),
                    new TextRun(", modelo: "),
                    new TextRun({ text: "HP ELITEBOOK 640 G11", bold: true }),
                    new TextRun(", SÉRIE "),
                    new TextRun({ text: "BRJ442MM83", bold: true }),
                    new TextRun(" e "),
                    new TextRun({ text: "MOUSE C/ FIO", bold: true }),
                    new TextRun(", ao Colaborador "),
                    new TextRun({ text: nome, bold: true }),
                    new TextRun(", Cargo "),
                    new TextRun({ text: cargo, bold: true }),
                    new TextRun(", portador do RG sob o nº "),
                    new TextRun({ text: rg, bold: true }),
                    new TextRun(", doravante denominado simplesmente "),
                    new TextRun({ text: "COLABORADOR", bold: true }),
                    new TextRun(", sob as seguintes condições:"),
                ],
            }),
            quebraLinha(),
            new Paragraph("1. Dados corporativos devem ser salvos em nuvem ou nas pastas disponibilizadas na rede corporativa."),
            quebraLinha(),
            new Paragraph("2. Ficará o Colaborador, em caso de necessidade da troca da máquina, responsável pelo BACKUP dos arquivos que julgar necessários."),
            quebraLinha(),
            new Paragraph("3. Em caso de arquivos mantidos localmente, será necessário solicitar a recuperação."),
            quebraLinha(),
            new Paragraph("4. Após 5 dias, a máquina será formatada e os dados não serão mais mantidos."),
        ];

        const termoBackup = [
            quebraLinha(),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: "TERMO DE RESPONSABILIDADE DE BACKUP – DADOS CORPORATIVOS",
                        bold: true,
                        size: 28,
                    }),
                ],
                spacing: { after: 300 },
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun("COBASI COMÉRCIO DE PRODUTOS BÁSICOS E INDUSTRIALIZADOS S.A., "),
                    new TextRun("pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o n.º 53.153.938/0007-01, com endereço na Rua Professora Helena Moura Lacerda, n.º 140 – Vila Hamburguesa – São Paulo/SP – CEP: 05319-015, aqui denominada "),
                    new TextRun({ text: "EMPREGADORA", bold: true }),
                    new TextRun(", comunica que a responsabilidade por salvamento e arquivamento de dados corporativos é do "),
                    new TextRun({ text: nome, bold: true }),
                    new TextRun(", cargo "),
                    new TextRun({ text: cargo, bold: true }),
                    new TextRun(", RG nº "),
                    new TextRun({ text: rg, bold: true }),
                    new TextRun(", denominado "),
                    new TextRun({ text: "COLABORADOR", bold: true }),
                    new TextRun(", sob as seguintes condições:"),
                ],
            }),
            quebraLinha(),
            new Paragraph("1. Dados corporativos devem ser salvos em nuvem ou nas pastas disponibilizadas na rede corporativa."),
            quebraLinha(),
            new Paragraph("2. Em caso de troca de máquina, o colaborador deve fazer BACKUP dos dados necessários."),
            quebraLinha(),
            new Paragraph("3. Caso mantenha arquivos localmente, deve abrir solicitação de recuperação."),
            quebraLinha(),
            new Paragraph("4. Após 5 dias, a máquina será formatada e os dados serão apagados."),
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
                children: [new TextRun(`São Paulo, ${data}`)],
            }),
            quebraLinha(),
            ...assinaturaContent,
            new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: assinaturaBase64 ? 0 : 200 }, // Less space if signature is present
                children: [new TextRun("____________________________")],
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun(nome)],
            }),
        ];

        const doc = new Document({
            sections: [
                {
                    properties: {
                        page: {
                            margin: {
                                top: 720, // 0.5 inch
                                right: 720,
                                bottom: 720,
                                left: 720,
                            },
                        },
                    },
                    children: [...termoNotebook, ...assinaturaFinal, ...termoBackup, ...assinaturaFinal],
                },
            ],
        });

        const buffer = await Packer.toBuffer(doc);

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": 'attachment; filename="termo-responsabilidade.docx"',
            },
        });

    } catch (error) {
        console.error("Error generating document:", error);
        return NextResponse.json({ error: "Internal server error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
