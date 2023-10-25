const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const alunosRoutes = require("./routes/alunosRoutes");
const db = require("./db");

app.use(bodyParser.json());

// Configurar o banco de dados antes de iniciar a API
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig.json"); // Importe o arquivo de configuração do Swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/alunos", alunosRoutes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
