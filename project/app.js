const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

// Routes
const MahasiswaRouter = require("./routes/Mahasiswa");
const AuthRouter = require("./routes/Auth");

app.use("/mahasiswa", MahasiswaRouter);
app.use("/auth", AuthRouter);

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learn-1 API",
      version: "1.0.0",
      description: "API Dokumentasi Mahasiswa",
    },
    servers: [{ url: "http://localhost:3001" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "/routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
