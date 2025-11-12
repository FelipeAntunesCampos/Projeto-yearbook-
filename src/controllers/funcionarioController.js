 import * as funcionarioModel from "./../models/funcionarioModel.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listarTodos = async (req, res) => {
  try {
    // 'funcionarios' precisa ser mutável porque podemos filtrar/reatribuir
    let funcionarios = await funcionarioModel.findAll();
    const { matricula } = req.query;
    let criterioFiltro = null;
    // Filtro de Matrícula para saber se é Feminino(F) ou Masculino(M)

    if (matricula) {
      // não redeclarar, apenas atribuir à variável externa
      criterioFiltro = matricula.toUpperCase(); // deixar letras maiusculas

      if (criterioFiltro !== "M" && criterioFiltro !== "F") {
        return res.status(400).json({
          error: "Critério de Filtro de Matrícula Inválido! Use M ou F.",
        });
      }

      // aplica o filtro somente quando 'matricula' for informada
      funcionarios = funcionarios.filter((funcionario) => {
        if (funcionario.matricula && funcionario.matricula.length >= 5) {
          return funcionario.matricula[4].toUpperCase() === criterioFiltro;
        }
        return false;
      });
    }

    const totalfuncionarios = funcionarios.length;

    if (!funcionarios || funcionarios.length === 0) {
      res.status(404).json({
        total: funcionarios.length,
        mensagem: "Não há funcionarios na lista",
        funcionarios,
      });
    }
    res.status(200).json({
      total: funcionarios.length,
      mensagem: "lista de funcionarios",
      funcionarios,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro interno de servidor",
      detalhes: error.message,
      status: 500,
    });
  }
};

export const listarUm = async (req, res) => {
  try {
    const id = req.params.id;
    const funcionarios = await funcionarioModel.findbyid(id);

    if (!funcionarios) {
      return res.status(404).json({
        erro: "funcionario não encontrado!",
        mensagem: "Verifique se o id do funcionario existe",
        id: id,
      });
    }
    res.status(200).json({
      mensagem: "funcionario encontrado",
      funcionarios,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar funcionarios por id",
      detalhes: error.message,
      status: 500,
    });
  }
};

export const criarfuncionario = async (req, res) => {
  try {
    // 1. Obter dados
    const { nome, email, registro, biografia, fotos, cargo } = req.body;

    // 2. Validação de campos básicos
    if (!nome || !email || !registro) {
      return res.status(400).json({
        error: "Nome, email e registro são obrigatórios.",
      });
    }

    // 3. Validação da Matrícula (manual, caractere por caractere)

    // Verifica o tamanho total
    if (registro.length !== 8) {
      return res.status(400).json({
        error:
          "Formato de registro inválido. Deve ter exatamente 8 caracteres. Ex: 2025M001",
      });
    }

    // Verifica o prefixo (Ano '2025')
    const prefixoAnoValido =
      registro[0] === "2" &&
      registro[1] === "0" &&
      registro[2] === "2" &&
      registro[3] === "5";

    if (!prefixoAnoValido) {
      return res.status(400).json({
        error: "Registro inválido. Deve começar com o ano '2025'.",
      });
    }
    // Verifica o gênero ('M' ou 'F')
    const prefixoGeneroValido = registro[4] === "M" || registro[4] === "F";

    if (!prefixoGeneroValido) {
      return res.status(400).json({
        error: "Registro inválido. O 5º caractere deve ser 'M' ou 'F'.",
      });
    }

  // Verifica se os 3 últimos são LETRAS MAIÚSCULAS
const letrasMaiusculasValidas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Pega os 3 últimos caracteres (Sexto, Sétimo e Oitavo)
const caractere6 = registro[5]; 
const caractere7 = registro[6]; 
const caractere8 = registro[7]; 

// Verifica se cada caractere está na string de letras maiúsculas
const sequencialValido =
  letrasMaiusculasValidas.includes(caractere6) &&
  letrasMaiusculasValidas.includes(caractere7) &&
  letrasMaiusculasValidas.includes(caractere8);

if (!sequencialValido) {
  return res.status(400).json({
    error:
      "Matrícula inválida. Os 3 últimos caracteres devem ser letras maiúsculas (A-Z).",
  });
}

    // 4. Transformação dos dados (fotos )
    const fotosParaPrisma = (fotos || []).map((url) => ({
      url: url,
    }));


    // 5. Montar o objeto de dados final
    const dadosParaSalvar = {
      nome,
      email,
      cargo,
      registro,
      biografia,
      fotos: fotosParaPrisma,
    };

    // 6. Chamar o Model
    console.log("Dados que estou tentando salvar:", dadosParaSalvar);
    const novofuncionario = await funcionarioModel.createfuncionarios(
      dadosParaSalvar
    );

    // 7. Enviar resposta de sucesso
    return res.status(201).json(novofuncionario);
  } catch (error) {
    // 8. Lidar com erros
    console.error("Erro no controller createfuncionario:", error.message);


    if (error.message.includes("já esta(ão) em uso")) {
  return res.status(409).json({ error: error.message });
}

    return res
      .status(500)
      .json({ error: "Erro interno ao criar funcionario." });
  }
};

export const apagarfuncionario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const funcionarioExiste = await funcionarioModel.findbyid(id);

    if (!funcionarioExiste) {
      return res.status(404).json({
        erro: "funcionario não encontrado com esse id",
        id: id,
      });
    }

    await funcionarioModel.deletefuncionarios(id);

    res.status(200).json({
      mensagem: "funcionario removido com sucesso",
      funcionarioRemovido: funcionarioExiste,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao apagar funcionario!",
      detalhes: error.message,
    });
  }
};

export const atualizarfuncionario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dados = req.body;

    // usando laço de repetição 'for' para checar se o objeto 'dados' tem chaves
    let temDados = false;
    for (const chave in dados) {
      temDados = true; // Encontrou pelo menos uma chave
      break; // Pode parar o loop
    }

    if (!temDados) {
      return res.status(400).json({
        erro: "Nenhum dado fornecido para atualização.",
      });
    }

    // 2. Extrai a matrícula (ou undefined se não existir)
    const { matricula } = dados;

    // verificando se o funcionario existe
    const funcionarioExiste = await prisma.funcionarios.findUnique({
      where: { id: id },
    });

    if (!funcionarioExiste) {
      return res.status(404).json({
        erro: "funcionario não encontrado com esse id",
        id: id,
      });
    }

    //VERIFICAÇÃO CONDICIONAL DA MATRÍCULA
    // (Só roda se 'matricula' foi enviada no body)

    if (matricula) {
      // Verifica o tamanho total
      if (matricula.length !== 8) {
        return res.status(400).json({
          error:
            "Formato de matrícula inválido. Deve ter exatamente 8 caracteres. Ex: 2025M001",
        });
      }

      // Verifica o prefixo (Ano '2025')
      const prefixoAnoValido =
        matricula[0] === "2" &&
        matricula[1] === "0" &&
        matricula[2] === "2" &&
        matricula[3] === "5";

      if (!prefixoAnoValido) {
        return res.status(400).json({
          error: "Matrícula inválida. Deve começar com o ano '2025'.",
        });
      }

      // Verifica o gênero ('M' ou 'F')
      const prefixoGeneroValido = matricula[4] === "M" || matricula[4] === "F";

      if (!prefixoGeneroValido) {
        return res.status(400).json({
          error: "Matrícula inválida. O 5º caractere deve ser 'M' ou 'F'.",
        });
      }

      // Verifica se os 3 últimos são números
      const sequencialValido =
        !isNaN(matricula[5]) && !isNaN(matricula[6]) && !isNaN(matricula[7]);

      if (!sequencialValido) {
        return res.status(400).json({
          error:
            "Matrícula inválida. Os 3 últimos caracteres devem ser numéricos.",
        });
      }

      // findUnique para ver se alguém JÁ TEM essa matrícula
      const funcionarioComEssaMatricula = await prisma.funcionarios.findUnique({
        where: {
          matricula: matricula, // Procurando pelo campo 'matricula'
        },
      });

      // vendo o resultado
      // Se encontramos alguém E esse alguém NÃO É o funcionario que estamos editando
      if (
        funcionarioComEssaMatricula &&
        funcionarioComEssaMatricula.id !== id
      ) {
        // Se 'funcionarioComEssaMatricula' não for 'null'
        // E o 'id' dele for DIFERENTE do 'id' da nossa URL...
        // ... significa que OUTRO funcionario já tem essa matrícula.

        // Retorna um erro 409 (Conflict)
        return res.status(409).json({
          erro: "Conflito: A matrícula informada já está em uso por outro funcionario.",
        });
      }
    }

    const funcionarioAtualizado = await prisma.funcionarios.update({
      where: {
        id: id, // procure o id do params
      },
      data: dados, // atualiza com os dados do req.body
    });

    res.status(200).json({
      mensagem: "funcionario atualizado com sucesso",
      funcionario: funcionarioAtualizado,
    });
  } catch (error) {
    console.error("ERRO DETECTADO NO CATCH:", error);

    res.status(500).json({
      erro: "Erro ao atualizar funcionario",
      detalhes: error.message,
    });
  }
};