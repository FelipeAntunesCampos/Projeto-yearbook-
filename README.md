# Projeto Yearbook

Descrição
---------
Projeto Yearbook é uma API backend desenvolvida em Node.js que serve como suporte para um anuário (yearbook) digital. A aplicação oferece endpoints para gerenciar usuários, perfis de estudantes, fotos, publicações e interações típicas de um anuário escolar.

Principais funcionalidades
--------------------------
- Autenticação e gerenciamento de usuários (registro, login, tokens).
- CRUD de perfis de estudantes (dados pessoais, breve biografia).
- Upload e gerenciamento de fotos (retratos, álbuns).
- Publicações de turma e comentários.
- Organização por turmas/ano e busca por alunos/posts.
- Persistência de dados via Prisma ORM.

Tecnologias
-----------
- Node.js
- Express (servidor HTTP)
- Prisma (ORM)
- npm (gerenciamento de pacotes)
- Possível uso de bibliotecas adicionais para upload de arquivos e autenticação (ex.: multer, bcrypt, jsonwebtoken)

Arquitetura geral
-----------------
- server.js: ponto de entrada da aplicação, configuração de middlewares e inicialização do servidor.
- src/routes: definição das rotas da API.
- src/controllers: handlers que processam as requisições e delegam a lógica.
- src/models (ou services): camada de acesso a dados e lógica de negócio.
- prisma/: schema do banco de dados e migrações do Prisma.

Instalação (resumo)
-------------------
1. Clone o repositório:
   git clone https://github.com/FelipeAntunesCampos/Projeto-yearbook-.git
2. Acesse o diretório do projeto:
   cd Projeto-yearbook-
3. Instale dependências:
   npm install

Variáveis de ambiente
---------------------
Configure um arquivo `.env` com as variáveis mínimas necessárias, por exemplo:

- PORT: porta em que a API será executada (ex.: 3000)
- DATABASE_URL: string de conexão do banco para o Prisma
- NODE_ENV: ambiente (development ou production)

Banco de dados (Prisma)
-----------------------
- O projeto utiliza Prisma para interação com o banco de dados.
- Comandos úteis:
  - npx prisma generate           # gera o client do Prisma
  - npx prisma migrate dev        # cria/aplica migrações em dev
  - npx prisma migrate deploy     # aplica migrações em produção
  - npx prisma studio             # abre a interface do Prisma Studio

Como rodar
----------
- Desenvolvimento:
  1. Configure o `.env`.
  2. Gere o client do Prisma: npx prisma generate
  3. Rode migrações: npx prisma migrate dev --name init
  4. Inicie o servidor: npm run dev (ou node server.js)

- Produção:
  - Defina NODE_ENV=production e variáveis de ambiente.
  - Execute npm start ou inicie com um process manager (PM2) / conteinerize com Docker.


Estrutura de pastas (resumo)
----------------------------
- .env
- .gitignore
- package.json
- server.js
- prisma/
  - schema.prisma
  - migrations/
- src/
  - routes/
  - controllers/
  - models


Contato
-------
Para dúvidas e informações, abra uma issue no repositório ou contacte o mantenedor do projeto.
