// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import alunoRoute from './src/routes/alunoRoute.js';
import funcionarioRoute from './src/routes/funcionarioRoute.js';
import cors from "cors";

// Criar aplicação com Express
const app = express();

// --- Configuração de CORS Simples (Corrigido) ---
// Isto permite TODAS as origens e resolve o erro "Não permitido pelo CORS".
app.use(cors());

// Configurar a app para aceitar JSON
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Aqui vão todas suas Rotas
app.use('/alunos', alunoRoute);
app.use('/funcionarios', funcionarioRoute);

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
