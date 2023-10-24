const express = require("express");
const router = express.Router();
const alunosController = require("../controllers/alunosController");

router.get("/", alunosController.listarAlunos);
router.get("/:id", alunosController.buscarAlunoPorId);
router.post("/", alunosController.adicionarAluno);
router.put("/:id", alunosController.atualizarAluno);
router.delete("/:id", alunosController.excluirAluno);

module.exports = router;
