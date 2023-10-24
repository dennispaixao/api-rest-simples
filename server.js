const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const setupDatabase = require("./dbSetup"); // Importe a função de configuração do banco de dados

const alunosRoutes = require("./routes/alunosRoutes");
const db = require("./db");

app.use(bodyParser.json());

// Configurar o banco de dados antes de iniciar a API
setupDatabase()
  .then(() => {
    // Rota principal
    app.use("/alunos", alunosRoutes);

    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`API está rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro na configuração do banco de dados:", err);
  });
