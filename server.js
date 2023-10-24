const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const setupDatabase = require("./dbSetup"); // Importe a função de configuração do banco de dados

const alunosRoutes = require("./routes/alunosRoutes");
const db = require("./db");

app.use(bodyParser.json());

// Configurar o banco de dados antes de iniciar a API

app.use("/alunos", alunosRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
