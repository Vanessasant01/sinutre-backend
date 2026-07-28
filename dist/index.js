"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = Number(process.env.PORT) || 3333;
async function startServer() {
    await prisma_1.prisma.$connect();
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`SiNutre Backend rodando na porta ${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map