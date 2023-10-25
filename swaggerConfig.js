const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentation for your API",
    },
  },
  apis: ["server.js", "routes/*.js"], // Pode variar dependendo da estrutura do seu projeto
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
