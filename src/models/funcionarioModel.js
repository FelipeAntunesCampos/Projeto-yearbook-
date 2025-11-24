import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Retorna todos os funcionários, incluindo suas fotos, ordenados por nome.
export const findAll = async () => {
  return await prisma.funcionarios.findMany({
    orderBy: { nome: "asc" },
    include: {
      fotos: true,
    },
  });
};

// Retorna um funcionário específico pelo ID, incluindo suas fotos.
export const findbyid = async (id) => {
  return await prisma.funcionarios.findUnique({
    where: { id: Number(id) },
    include: {
      fotos: true,
    },
  });
};

export const createfuncionarios = async (data) => {
  // Separa os dados de relação (fotos) dos dados do funcionário.
  const { fotos, ...funcionariosData } = data;

  try {
    // Cria o funcionário e as fotos relacionadas em uma única transação.
    const novofuncionarios = await prisma.funcionarios.create({
      data: {
        ...funcionariosData, // Criação aninhada das fotos.

        fotos: {
          create: fotos,
        },
      }, // Inclui as fotos na resposta.
      include: {
        fotos: true,
      },
    });

    return novofuncionarios;
  } catch (error) {
    console.error("Erro no model ao criar funcionarios:", error);

    if (error.code === "P2002") {
      // Tratamento de erro para violação de restrição única (@unique).
      // Mensagem genérica para o usuário, conforme solicitado.
      throw new Error(
        `Erro: O registro que você tentou criar já existe (verifique campos como email ou matrícula).`
      );
    }

    throw new Error(`Erro ao salvar no banco de dados: ${error.message}`);
  }
};

export const deletefuncionarios = async (id) => {
  const idNumerico = Number(id); // Deleta primeiro as fotos relacionadas para evitar conflitos de Foreign Key.

  await prisma.fotoFuncionario.deleteMany({
    where: { funcionarioId: idNumerico },
  }); // Deleta o funcionário.

  return await prisma.funcionarios.delete({
    where: { id: idNumerico },
  });
};

export const updateFuncionarios = async (id, data) => {
  // Separa os dados da relação (fotos) dos dados simples.
  const { fotos, ...funcionariosData } = data; // Prepara a operação de atualização de fotos (se 'fotos' foi enviado).

  const updateOperacoes = {};
  if (fotos) {
    updateOperacoes.fotos = {
      deleteMany: {}, // Deleta todas as fotos existentes.
      create: fotos, // Cria as novas fotos.
    };
  } // Executa o update.

  return await prisma.funcionarios.update({
    where: { id: Number(id) },
    data: {
      // Atualiza os dados básicos.
      ...funcionariosData, // Inclui a operação de atualização de fotos, se definida.

      ...updateOperacoes,
    },
    include: {
      fotos: true, // Retorna o funcionário com as fotos atualizadas.
    },
  });
};
