"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const prisma_1 = require("./prisma");
const PORT = process.env.PORT || 3333;
async function startServer() {
    await prisma_1.prisma.$connect();
    app_1.app.listen(PORT, () => {
        console.log(`SiNutre back rodando em http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map