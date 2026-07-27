"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_routes_1 = require("./routes/auth.routes");
const meals_routes_1 = require("./routes/meals.routes");
const food_routes_1 = require("./routes/food.routes");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({ origin: env_1.env.frontendUrl, credentials: true }));
exports.app.use(express_1.default.json());
exports.app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
exports.app.use('/auth', auth_routes_1.authRoutes);
exports.app.use('/meals', meals_routes_1.mealsRoutes);
exports.app.use('/foods', food_routes_1.foodRouter);
//# sourceMappingURL=app.js.map