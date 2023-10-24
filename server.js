const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configurando o bodyParser para analisar JSON
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados PostgreSQL
const pgp = require("pg-promise")();
const db = pgp({
  connectionString:
    "postgres://dennis:MvdVtecDx4fazqVXBW0tBKTODbSKA79f@dpg-ckrv3810at9c73bt1lmg-a/api_rest_zgyn",
});

// Rota para buscar todos os itens no banco de dados
app.get("/api/items", async (req, res) => {
  try {
    const items = await db.any("SELECT * FROM items");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os itens" });
  }
});

// Rota para adicionar um novo item
app.post("/api/items", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Nome é obrigatório" });
  } else {
    try {
      const newItem = await db.one(
        "INSERT INTO items(name) VALUES($1) RETURNING *",
        [name]
      );
      res.json(newItem);
    } catch (error) {
      res.status(500).json({ error: "Erro ao adicionar um item" });
    }
  }
});

async function verificaECreateTabela() {
  const tableName = "items";

  try {
    // Verifica se a tabela já existe no banco de dados
    const tableExists = await db.one(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = $1)`,
      [tableName]
    );

    if (!tableExists.exists) {
      // A tabela não existe, crie-a
      await db.none(
        `CREATE TABLE ${tableName} (id serial PRIMARY KEY, name VARCHAR(255))`
      );
      console.log(`Tabela ${tableName} criada com sucesso.`);
    } else {
      console.log(`A tabela ${tableName} já existe no banco de dados.`);
    }
  } catch (error) {
    console.error(`Erro ao verificar/criar a tabela ${tableName}: ${error}`);
  }
}

// Chame a função para verificar e criar a tabela
verificaECreateTabela();

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
