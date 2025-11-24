import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
    return await prisma.aluno.findMany({
        orderBy: { nome: 'asc' },
        include: {
            fotos: true,
            mensagens: true
        }
    });
}

export const findbyid = async (id) => {
    return await prisma.aluno.findUnique({
        where: { id: Number(id)},
        include: {
            fotos: true,
            mensagens: true
        }
    });
}

export const createAluno = async (data) => {
    const { fotos, mensagens, ...alunoData } = data;

    try {
        const novoAluno = await prisma.aluno.create({
            data: {
                ...alunoData,
                fotos: {
                    create: fotos,
                },
                mensagens: {
                    create: mensagens,
                },
            },
            include: {
                fotos: true,
                mensagens: true,
            },
        });

        return novoAluno;

    } catch (error) {
        console.error("Erro no model ao criar aluno:", error);
        
        if (error.code === 'P2002') {
            throw new Error(`Erro: Os dados fornecidos (como email ou matrícula) já existem no sistema.`);
        }
        
        throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
    }
};


export const deleteAluno = async (id) => {
    const idNumerico = Number(id);

    await prisma.foto.deleteMany({
        where: { alunoId: idNumerico },
    });

    
    await prisma.mensagem.deleteMany({
        where: { alunoId: idNumerico },
    });


    return await prisma.aluno.delete({
        where: { id: idNumerico },
        include: {
            fotos: true,
            mensagens: true
        }
    });
};

export const updateAluno = async (id, data) => {
    return await prisma.aluno.update({
        where: { id: Number(id) },
        data: {
            ...(data.nome && { nome: data.nome }),
            ...(data.email && { email: data.email }),
            ...(data.matricula && { matricula: data.matricula }),
            ...(data.biografia && { biografia: data.biografia }),
            ...(data.mensagem && { mensagem: data.mensagem }),
            ...(data.foto && { foto: data.foto }),
        }
    })
}