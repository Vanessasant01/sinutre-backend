import express from "express";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const PORT = Number(process.env.PORT) || 3333;

async function startServer() {
  await prisma.$connect();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SiNutre Backend rodando na porta ${PORT}`);
  });
}

startServer();
