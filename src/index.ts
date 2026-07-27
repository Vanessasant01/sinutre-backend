import { debugPort } from "process";
import { app } from "./app";
import { prisma } from "./prisma";

const PORT = process.env.PORT || 3333;

async function startServer() {
  await prisma.$connect();
  app.listen(debugPort, '0.0.0.0', () => {
    console.log(`SiNutre Backend rodando na porta ${debugPort}`);
  });
}
startServer();
