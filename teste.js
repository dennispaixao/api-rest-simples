const db = require("./db"); // Importe a configuração do banco de dados

// Teste de conexão
db.one("SELECT 1")
  .then((result) => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro de conexão com o banco de dados:", error);
  });
