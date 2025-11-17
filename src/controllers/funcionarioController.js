import * as funcionarioModel from "./../models/funcionarioModel.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listarTodos = async (req, res) => {
  try {
    // 'funcionarios' precisa ser mutável porque podemos filtrar/reatribuir
    let funcionarios = await funcionarioModel.findAll();
    const { registro } = req.query;
    let criterioFiltro = null;
    // Filtro de Matrícula para saber se é Feminino(F) ou Masculino(M)

    if (registro) {
      // não redeclarar, apenas atribuir à variável externa
      criterioFiltro = registro.toUpperCase(); // deixar letras maiusculas

      if (criterioFiltro !== "M" && criterioFiltro !== "F") {
        return res.status(400).json({
          error: "Critério de Filtro de Matrícula Inválido! Use M ou F.",
        });
      }

      // aplica o filtro somente quando 'registro' for informada
      funcionarios = funcionarios.filter((funcionario) => {
        if (funcionario.registro && funcionario.registro.length >= 5) {
          return funcionario.registro[4].toUpperCase() === criterioFiltro;
        }
        return false;
      });
    }

    const totalfuncionarios = funcionarios.length;

    if (!funcionarios || funcionarios.length === 0) {
      return res.status(404).json({
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

    let temDados = false;
    for (const chave in dados) {
      temDados = true; 
      break; 
    }

    if (!temDados) {
      return res.status(400).json({
        erro: "Nenhum dado fornecido para atualização.",
      });
    }

    const { registro } = dados;

    // 1. BUG CORRIGIDO: Usar o Model para checar se existe
    const funcionarioExiste = await funcionarioModel.findbyid(id);

    if (!funcionarioExiste) {
      return res.status(404).json({
        erro: "funcionario não encontrado com esse id",
        id: id,
      });
    }

    //VERIFICAÇÃO CONDICIONAL DA MATRÍCULA
    if (registro) {
      // Verifica o tamanho total
      if (registro.length !== 8) {
        return res.status(400).json({
          error:
            "Formato de matrícula inválido. Deve ter exatamente 8 caracteres. Ex: 2025MABC",
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
          error: "Matrícula inválida. Deve começar com o ano '2025'.",
        });
      }

      // Verifica o gênero ('M' ou 'F')
      const prefixoGeneroValido = registro[4] === "M" || registro[4] === "F";

      if (!prefixoGeneroValido) {
        return res.status(400).json({
          error: "Matrícula inválida. O 5º caractere deve ser 'M' ou 'F'.",
        });
      }

      // 2. BUG CORRIGIDO: Validação de LETRAS (igual ao 'criar')
      const letrasMaiusculasValidas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const caractere6 = registro[5];
      const caractere7 = registro[6];
      const caractere8 = registro[7];

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

      // findUnique para ver se alguém JÁ TEM essa matrícula
      const funcionarioComEssaMatricula = await prisma.funcionarios.findUnique({
        where: {
          registro: registro, 
        },
      });

      if (
        funcionarioComEssaMatricula &&
        funcionarioComEssaMatricula.id !== id
      ) {
        return res.status(409).json({
          erro: "Conflito: A matrícula informada já está em uso por outro funcionario.",
        });
      }
    }

    // 3. BUG CORRIGIDO: Chamar o Model para atualizar (ele sabe lidar com as fotos)
    const funcionarioAtualizado = await funcionarioModel.updateFuncionarios(id, dados);

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