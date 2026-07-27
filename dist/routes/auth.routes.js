"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const auth_me_1 = require("../controllers/auth.me");
const auth_controller_1 = require("../controllers/auth.controller");
exports.authRoutes = (0, express_1.Router)();
exports.authRoutes.get('/github', auth_controller_1.redirectToGithub);
exports.authRoutes.get('/github/callback', auth_controller_1.githubCallback);
exports.authRoutes.get('/me', auth_middleware_1.requireAuth, auth_me_1.me);
//# sourceMappingURL=auth.routes.js.map