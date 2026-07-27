"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");

dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();

app.use((0, cors_1.default)());
app.use(express_1.default.json());

// SUAS ROTAS AQUI — NÃO PRECISA MUDAR NADA
app.get("/", (req, res) => {
  res.json({ mensagem: "SiNutre Backend funcionando!" });
});

const PORT = process.env.PORT || 3333;

async function startServer() {
  await prisma.$connect();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SiNutre Backend rodando na porta ${PORT}`);
  });
}

startServer();