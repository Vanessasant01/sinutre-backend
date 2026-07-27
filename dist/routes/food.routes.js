"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const prisma_1 = require("../prisma");
exports.foodRouter = (0, express_1.Router)();
//foods/
exports.foodRouter.get('/', auth_middleware_1.requireAuth, async (req, res) => {
    const search = String(req.query.search ?? '');
    const foods = await prisma_1.prisma.food.findMany({
        where: {
            userId: req.userId,
            name: {
                contains: search,
            }
        },
        take: 10,
        orderBy: {
            name: 'asc',
        },
    });
    return res.json(foods);
});
exports.foodRouter.post('/', auth_middleware_1.requireAuth, async (req, res) => {
    const { name, caloriesPer100g, carbsPer100g, proteinPer100g, fatPer100g, } = req.body;
    const food = await prisma_1.prisma.food.create({
        data: {
            name,
            caloriesPer100g,
            carbsPer100g,
            proteinPer100g,
            fatPer100g,
            userId: req.userId,
        },
    });
    return res.status(201).json(food);
});
//# sourceMappingURL=food.routes.js.map