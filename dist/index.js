"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const app_1 = require("./app");
const prisma_1 = require("./prisma");
const PORT = process.env.PORT || 3333;
async function startServer() {
    await prisma_1.prisma.$connect();
    app_1.app.listen(process_1.debugPort, '0.0.0.0', () => {
        console.log(`SiNutre Backend rodando na porta ${process_1.debugPort}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map