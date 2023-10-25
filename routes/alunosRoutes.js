const express = require("express");
const router = express.Router();
const alunosController = require("../controllers/alunosController");

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Operações relacionadas a alunos
 */

/**
 * @swagger
 * /alunos:
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Obter lista de alunos
 *     description: Retorna uma lista de alunos.
 *     responses:
 *       200:
 *         description: Uma lista de alunos.
 *       500:
 *         description: Erro interno do servidor. Algo deu errado.
 */

router.get("/", alunosController.listarAlunos);

/**
 * @swagger
 * /alunos/{id}:
 */

/**
 * @swagger
 * /alunos/{id}:
 *   get:
 *     summary: Buscar aluno por ID
 *     description: Retorna os detalhes de um aluno com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno a ser buscado.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do aluno.
 *       404:
 *         description: Aluno não encontrado.
 */

router.get("/:id", alunosController.buscarAlunoPorId);

/**
 * @swagger
 * /alunos:
 *   post:
 *     summary: Adicionar um novo aluno
 *     description: Adiciona um novo aluno ao banco de dados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *           example:
 *             nome: "João Silva"
 *             idade: 18
 *             nota1: 90
 *             nota2: 85
 *             professor: "Maria"
 *             sala: "A1"
 *     responses:
 *       201:
 *         description: Aluno adicionado com sucesso.
 *       500:
 *         description: Erro interno do servidor. Algo deu errado.
 */

router.post("/", alunosController.adicionarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualizar aluno por ID
 *     description: Atualiza os detalhes de um aluno com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *           example:
 *             nome: "João Silva"
 *             idade: 18
 *             nota1: 90
 *             nota2: 85
 *             professor: "Maria"
 *             sala: "A1"
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 */

router.put("/:id", alunosController.atualizarAluno);

/**
 * @swagger
 * /alunos/{id}:
 *   delete:
 *     summary: Excluir aluno por ID
 *     description: Exclui um aluno com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno excluído com sucesso.
 *       404:
 *         description: Aluno não encontrado.
 */

router.delete("/:id", alunosController.excluirAluno);

module.exports = router;
