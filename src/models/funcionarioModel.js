import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//crio a variavel findAll e já exporto
export const findAll = async () => {
  return await prisma.funcionarios.findMany({
    orderBy: { nome: "asc" },
    include: {
      fotos: true,      // Isto vai incluir o array de fotos
    }
  });
};

//crio a variavel findbyid e já exporto
export const findbyid = async (id) => {
  return await prisma.funcionarios.findUnique({
    where: { id: Number(id) },
    include: {
      fotos: true,      // Isto vai incluir o array de fotos
    }
  });
};

export const createfuncionarios = async (data) => {
  // 1. Separa os dados de relação dos dados do funcionarios
  const { fotos, ...funcionariosData } = data;

  try {
    // 2. Cria o funcionarios e os registros aninhados em uma única transação
    const novofuncionarios = await prisma.funcionarios.create({
      data: {
        //...funcionariosData contém { nome, email, matricula, biografia }
        ...funcionariosData,

        // 3. Cria os registros relacionados
        fotos: {
          create: fotos, // Espera um array: [{ url: '...' }, { url: '...' }]
        },

      },
      // 4. Inclui os dados recém-criados na resposta
      include: {
        fotos: true,

      },
    });

    return novofuncionarios;
  } catch (error) {
    // 5. Tratamento de erro (ex: violação de @unique)
    console.error("Erro no model ao criar funcionarios:", error);

    if (error.code === "P2002") {
      // "Unique constraint failed on the {constraint}"
      // Pega os campos que falharam (ex: ['email', 'matricula'])
      const campos = error.meta.target;
      throw new Error(
        `Erro: O(s) campo(s) ${campos.join(", ")} já esta(ão) em uso.`
      );
    }

    throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
  }
};

export const deletefuncionarios = async (id) => {
  const idNumerico = Number(id);

  await prisma.fotoFuncionario.deleteMany({
    where: { funcionarioId: idNumerico },
  });

  return await prisma.funcionarios.delete({
    where: { id: idNumerico },
  });
};

export const updateFuncionarios = async (id, data) => {

  // 1. Separa os dados da relação (fotos) dos dados simples (funcionariosData)
  const { fotos, ...funcionariosData } = data;

  // 2. Prepara a operação de atualização de fotos (se 'fotos' foi enviado)
  const updateOperacoes = {};
  if (fotos) {
    updateOperacoes.fotos = {
      deleteMany: {}, // Deleta todas as fotos antigas
      create: fotos,  // Cria as novas fotos (espera um array)
    };
  }

  // 3. Executa o update
  return await prisma.funcionarios.update({
    where: { id: Number(id) },
    data: {
      // Atualiza os dados simples (nome, email, cargo...)
      ...funcionariosData,

      // Atualiza a relação 'fotos' (se houver)
      ...updateOperacoes,
    },
    include: {
      fotos: true, // Retorna o funcionário com as fotos atualizadas
    }
  });
};