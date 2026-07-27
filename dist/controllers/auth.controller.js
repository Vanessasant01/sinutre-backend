"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToGithub = redirectToGithub;
exports.githubCallback = githubCallback;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../prisma");
const env_1 = require("../config/env");
const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
// GET /auth/github
// Redireciona o navegador para a tela de autorização do GitHub.
async function redirectToGithub(_req, res) {
    const params = new URLSearchParams({
        client_id: env_1.env.github.clientId,
        redirect_uri: env_1.env.github.callbackUrl,
        scope: 'read:user',
    });
    res.redirect(`${GITHUB_AUTHORIZE_URL}?${params.toString()}`);
}
// GET /auth/github/callback?code=...
// 1) troca o code pelo access_token
// 2) busca dados do usuário no GitHub
// 3) cria ou atualiza o User
// 4) emite um JWT e redireciona ao frontend
async function githubCallback(req, res) {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({ error: 'Parâmetro "code" ausente.' });
    }
    const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: env_1.env.github.clientId,
            client_secret: env_1.env.github.clientSecret,
            code,
            redirect_uri: env_1.env.github.callbackUrl,
        }),
    });
    const tokenData = (await tokenResponse.json());
    if (!tokenData.access_token) {
        return res
            .status(401)
            .json({ error: 'Falha ao obter access_token do GitHub.' });
    }
    const userResponse = await fetch(GITHUB_USER_URL, {
        headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'sinutre-back',
        },
    });
    const githubUser = (await userResponse.json());
    const user = await prisma_1.prisma.user.upsert({
        where: { githubId: String(githubUser.id) },
        update: {
            githubLogin: githubUser.login,
            name: githubUser.name ?? githubUser.login,
            avatarUrl: githubUser.avatar_url ?? undefined,
        },
        create: {
            githubId: String(githubUser.id),
            githubLogin: githubUser.login,
            name: githubUser.name ?? githubUser.login,
            avatarUrl: githubUser.avatar_url ?? undefined,
        },
    });
    const token = jsonwebtoken_1.default.sign({ sub: user.id }, env_1.env.jwtSecret, { expiresIn: '7d' });
    res.redirect(`${env_1.env.frontendUrl}/?token=${token}`);
}
//# sourceMappingURL=auth.controller.js.map