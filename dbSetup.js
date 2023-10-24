const db = require("./db");

// Função para verificar e criar a tabela
async function setupDatabase() {
  try {
    // Verifica se a tabela já existe
    const tableExists = await db.oneOrNone(
      "SELECT to_regclass($1) AS result",
      "public.alunos"
    );

    if (!tableExists) {
      // A tabela não existe, então a criamos
      await db.none(`
          CREATE TABLE public.alunos (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            idade INTEGER NOT NULL,
            nota1 REAL NOT NULL,
            nota2 REAL NOT NULL,
            professor VARCHAR(255) NOT NULL,
            sala VARCHAR(10) NOT NULL
          )
        `);

      console.log('Tabela "alunos" criada com sucesso.');
    } else {
      console.log('Tabela "alunos" já existe.');
    }
  } catch (error) {
    console.error("Erro durante a configuração do banco de dados:", error);
  }
}

module.exports = setupDatabase;
