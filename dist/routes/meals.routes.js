"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsRoutes = void 0;
const express_1 = require("express");
const meals_controller_1 = require("../controllers/meals.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.mealsRoutes = (0, express_1.Router)();
exports.mealsRoutes.post('/', auth_middleware_1.requireAuth, meals_controller_1.createMeal);
exports.mealsRoutes.get('/', auth_middleware_1.requireAuth, meals_controller_1.meals);
//# sourceMappingURL=meals.routes.js.map