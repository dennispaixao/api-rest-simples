const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configurando o bodyParser para analisar JSON
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados PostgreSQL
const pgp = require("pg-promise")();
const db = pgp({
  connectionString: "postgres://postgres:postgre@localhost:5432/api_rest",
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

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
