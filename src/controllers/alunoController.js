import * as alunoModel from './../models/alunoModel.js'

export const listarTodos = async (req, res) => {
    try {
        const alunos = await alunoModel.findAll();

        if (!alunos || alunos.length === 0) {
            res.status(404).json({
                total: alunos.length,
                mensagem: 'Não há Alunos na lista',
                alunos
            })
        }
        res.status(200).json({
            total: alunos.length,
            mensagem: 'lista de alunos',
            alunos
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro interno de servidor',
            detalhes: error.message,
            status: 500
        })
    }
}

export const listarUm = async (req, res) => {
    try {
        const id = req.params.id;
        const alunos = await alunoModel.findbyid(id);

        if (!alunos) {
            return res.status(404).json({
                erro: 'aluno não encontrado!',
                mensagem: 'Verifique se o id do aluno existe',
                id: id
            })
        }
        res.status(200).json({
            mensagem: 'aluno encontrado',
            alunos
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao buscar Alunos por id',
            detalhes: error.message,
            status: 500
        })
    }
}

export const criarAluno = async (req, res) => {
    try {
        // 1. Obter dados
        const {
            nome,
            email,
            matricula,
            biografia,
            fotos,
            mensagens
        } = req.body;

        // 2. Validação de campos básicos
        if (!nome || !email || !matricula) {
            return res.status(400).json({
                error: "Nome, email e matrícula são obrigatórios."
            });
        }

        // 3. Validação da Matrícula (manual, caractere por caractere)

        // Verifica o tamanho total
        if (matricula.length !== 8) {
            return res.status(400).json({
                error: "Formato de matrícula inválido. Deve ter exatamente 8 caracteres. Ex: 2025M001"
            });
        }

        // Verifica o prefixo (Ano '2025')
        const prefixoAnoValido = matricula[0] === '2' &&
            matricula[1] === '0' &&
            matricula[2] === '2' &&
            matricula[3] === '5';

        if (!prefixoAnoValido) {
            return res.status(400).json({
                error: "Matrícula inválida. Deve começar com o ano '2025'."
            });
        }

        // Verifica o gênero ('M' ou 'F')
        const prefixoGeneroValido = matricula[4] === 'M' || matricula[4] === 'F';

        if (!prefixoGeneroValido) {
            return res.status(400).json({
                error: "Matrícula inválida. O 5º caractere deve ser 'M' ou 'F'."
            });
        }

        // Verifica se os 3 últimos são números
        // isNaN('1') == false (é número)
        // isNaN('a') == true (NÃO é número)
        const sequencialValido = !isNaN(matricula[5]) &&
            !isNaN(matricula[6]) &&
            !isNaN(matricula[7]);

        if (!sequencialValido) {
            return res.status(400).json({
                error: "Matrícula inválida. Os 3 últimos caracteres devem ser numéricos."
            });
        }

        // 4. Transformação dos dados (fotos e mensagens)
        const fotosParaPrisma = (fotos || []).map(url => ({
            url: url
        }));

        const mensagensParaPrisma = (mensagens || []).map(texto => ({
            conteudo: texto // Ajustado para 'conteudo'
        }));

        // 5. Montar o objeto de dados final
        const dadosParaSalvar = {
            nome,
            email,
            matricula,
            biografia,
            fotos: fotosParaPrisma,
            mensagens: mensagensParaPrisma
        };

        // 6. Chamar o Model
        const novoAluno = await alunoModel.create(dadosParaSalvar);

        // 7. Enviar resposta de sucesso
        return res.status(201).json(novoAluno);

    } catch (error) {
        // 8. Lidar com erros
        console.error("Erro no controller createAluno:", error.message);

        if (error.message.includes("já está(ão) em uso")) {
            return res.status(409).json({ error: error.message });
        }

        return res.status(500).json({ error: "Erro interno ao criar aluno." });
    }
};

export const apagarAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const alunoExiste = await alunoModel.findbyid(id);

        if (!alunoExiste) {
            return res.status(404).json({
                erro: 'Aluno não encontrado com esse id',
                id: id
            })
        }

        await alunoModel.deleteAluno(id)

        res.status(200).json({
            mensagem: 'aluno removido com sucesso',
            alunoRemovido: alunoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar aluno!',
            detalhes: error.message
        })
    }
}

// Assumo que alunoModel está importado
// import * as alunoModel from '../models/aluno.model.js';

export const atualizarAluno = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        // 1. VERIFICAÇÃO "PELO MENOS UM DADO" (sem Object.keys)
        //    Vamos usar um loop 'for...in' para checar se o objeto 'dados' tem chaves
        let temDados = false;
        for (const chave in dados) {
            temDados = true; // Encontrou pelo menos uma chave
            break;           // Pode parar o loop
        }

        if (!temDados) {
            return res.status(400).json({
                erro: 'Nenhum dado fornecido para atualização.'
            });
        }

        // 2. Extrai a matrícula (ou undefined se não existir)
        const { matricula } = dados;

        // 3. Verifica se o aluno existe
        const alunoExiste = await alunoModel.findbyid(id);

        if (!alunoExiste) {
            return res.status(404).json({
                erro: 'Aluno não encontrado com esse id',
                id: id
            })
        }

        // 4. VERIFICAÇÃO CONDICIONAL DA MATRÍCULA
        //    (Só roda se 'matricula' foi enviada no body)
        if (matricula !== undefined) {

            // Verifica o tamanho total
            if (matricula.length !== 8) {
                return res.status(400).json({
                    error: "Formato de matrícula inválido. Deve ter exatamente 8 caracteres. Ex: 2025M001"
                });
            }
            // ... (resto da sua validação de matrícula) ...
            // Verifica o prefixo (Ano '2025')
            const prefixoAnoValido = matricula[0] === '2' &&
                matricula[1] === '0' &&
                matricula[2] === '2' &&
                matricula[3] === '5';

            if (!prefixoAnoValido) {
                return res.status(400).json({
                    error: "Matrícula inválida. Deve começar com o ano '2025'."
                });
            }

            // Verifica o gênero ('M' ou 'F')
            const prefixoGeneroValido = matricula[4] === 'M' || matricula[4] === 'F';

            if (!prefixoGeneroValido) {
                return res.status(400).json({
                    error: "Matrícula inválida. O 5º caractere deve ser 'M' ou 'F'."
                });
            }

            // Verifica se os 3 últimos são números
            const sequencialValido = !isNaN(matricula[5]) &&
                !isNaN(matricula[6]) &&
                !isNaN(matricula[7]);

            if (!sequencialValido) {
                return res.status(400).json({
                    error: "Matrícula inválida. Os 3 últimos caracteres devem ser numéricos."
                });
            }
        }

        // 5. Chama o Model
        const alunoAtualizado = await alunoModel.update(id, dados);

        res.status(200).json({
            mensagem: 'aluno atualizado com sucesso',
            aluno: alunoAtualizado
        })

    } catch (error) {
        // ... (seu 'catch' continua aqui) ...
        if (error.code === 'P2002') {
            return res.status(409).json({
                erro: `Erro: O(s) campo(s) ${error.meta.target.join(', ')} já está(ão) em uso.`
            });
        }
        res.status(500).json({
            erro: 'Erro ao atualizar aluno',
            detalhes: error.message
        })
    }
}

