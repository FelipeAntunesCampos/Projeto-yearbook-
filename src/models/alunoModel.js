import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//crio a variavel findAll e já exporto
export const findAll = async () => {
    return await prisma.aluno.findMany({
        orderBy: { nome: 'asc' }
    });
}

//crio a variavel findbyid e já exporto
export const findbyid = async (id) => {
    return await prisma.aluno.findUnique({
        where: { id: Number(id)}
    });
}

export const createAluno = async (data) => {
    // 1. Separa os dados de relação dos dados do aluno
    const { fotos, mensagens, ...alunoData } = data;

    try {
        // 2. Cria o Aluno e os registros aninhados em uma única transação
        const novoAluno = await prisma.aluno.create({
            data: {
                //...alunoData contém { nome, email, matricula, biografia }
                ...alunoData,
                
                // 3. Cria os registros relacionados
                fotos: {
                    create: fotos, // Espera um array: [{ url: '...' }, { url: '...' }]
                },
                mensagens: {
                    create: mensagens, // Espera um array: [{ texto: '...' }, { texto: '...' }]
                },
            },
            // 4. Inclui os dados recém-criados na resposta
            include: {
                fotos: true,
                mensagens: true,
            },
        });

        return novoAluno;

    } catch (error) {
        // 5. Tratamento de erro (ex: violação de @unique)
        console.error("Erro no model ao criar aluno:", error);
        
        if (error.code === 'P2002') {
            // "Unique constraint failed on the {constraint}"
            // Pega os campos que falharam (ex: ['email', 'matricula'])
            const campos = error.meta.target; 
            throw new Error(`Erro: O(s) campo(s) ${campos.join(', ')} já está(ão) em uso.`);
        }
        
        throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
    }
};

export const createFuncionario = async (data) => {
  const { fotos, ...funcionarioData } = data;

  try {
    const novoFuncionario = await prisma.funcionario.create({
      data: {
        ...funcionarioData,
        fotos: {
          create: fotos,
        },
      },
      include: {
        fotos: true,
      },
    });

    return novoFuncionario;
    
  } catch (error) {
    console.error("Erro no model ao criar funcionário:", error);

    if (error.code === 'P2002') {
      const campos = error.meta.target;
      throw new Error(
        `Erro: O(s) campo(s) ${campos.join(', ')} já está(ão) em uso.`
      );
    }

    throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
  }
};


export const deleteAluno = async (id) => {
    const idNumerico = Number(id);

    await prisma.foto.deleteMany({
        where: { alunoId: idNumerico }
    });

    
    await prisma.mensagem.deleteMany({
        where: { alunoId: idNumerico }
    });


    return await prisma.aluno.delete({
        where: { id: idNumerico }
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