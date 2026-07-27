"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = me;
const prisma_1 = require("../prisma");
async function me(req, res) {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            githubLogin: true,
            name: true,
            avatarUrl: true,
        },
    });
    return res.json(user);
}
//# sourceMappingURL=auth.me.js.map