const db = require("../db"); // Importe a configuração do banco de dados apropriada

class AlunosController {
  async listarAlunos(req, res) {
    try {
      const alunos = await db.any("SELECT * FROM alunos");
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarAlunoPorId(req, res) {
    const id = req.params.id;
    try {
      const aluno = await db.one("SELECT * FROM alunos WHERE id = $1", id);
      res.json(aluno);
    } catch (error) {
      res.status(404).json({ error: "Aluno não encontrado" });
    }
  }

  async adicionarAluno(req, res) {
    const { nome, idade, nota1, nota2, professor, sala } = req.body;
    try {
      const data = await db.one(
        "INSERT INTO alunos (nome, idade, nota1, nota2, professor, sala) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [nome, idade, nota1, nota2, professor, sala]
      );
      res
        .status(201)
        .json({ message: "Aluno adicionado com sucesso", id: data.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarAluno(req, res) {
    const id = req.params.id;
    const { nome, idade, nota1, nota2, professor, sala } = req.body;
    try {
      await db.none(
        "UPDATE alunos SET nome = $1, idade = $2, nota1 = $3, nota2 = $4, professor = $5, sala = $6 WHERE id = $7",
        [nome, idade, nota1, nota2, professor, sala, id]
      );
      res.json({ message: "Aluno atualizado com sucesso" });
    } catch (error) {
      res.status(404).json({ error: "Aluno não encontrado" });
    }
  }

  async excluirAluno(req, res) {
    const id = req.params.id;
    try {
      const result = await db.result("DELETE FROM alunos WHERE id = $1", id);
      if (result.rowCount > 0) {
        res.json({ message: "Aluno excluído com sucesso" });
      } else {
        res.status(404).json({ error: "Aluno não encontrado" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AlunosController();
