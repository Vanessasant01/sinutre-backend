"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const prisma_1 = require("./prisma");
// OBRIGA usar a porta que o Railway mandar, ou 3333 localmente
const PORT = process.env.PORT || 3333;
async function startServer() {
    await prisma_1.prisma.$connect();
    app_1.app.listen(PORT, () => {
        console.log(`✅ SiNutre Backend rodando na porta ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map