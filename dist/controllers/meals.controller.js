"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meals = meals;
exports.createMeal = createMeal;
const prisma_1 = require("../prisma");
async function meals(req, res) {
    const meals = await prisma_1.prisma.meal.findMany({
        where: {
            userId: req.userId,
        },
        include: {
            foods: {
                include: {
                    food: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    const result = meals.map((meal) => {
        const totals = meal.foods.reduce((acc, item) => {
            const factor = item.foodG / 100;
            acc.grams += item.foodG;
            acc.calories +=
                item.food.caloriesPer100g *
                    factor;
            acc.carbs +=
                item.food.carbsPer100g *
                    factor;
            acc.proteins +=
                item.food.proteinPer100g *
                    factor;
            acc.fats +=
                item.food.fatPer100g *
                    factor;
            return acc;
        }, {
            grams: 0,
            calories: 0,
            carbs: 0,
            proteins: 0,
            fats: 0,
        });
        return {
            id: meal.id,
            name: meal.description,
            type: meal.type,
            createdAt: meal.createdAt,
            eatTime: meal.eatTime,
            totals,
            items: meal.foods,
        };
    });
    return res.json(result);
}
async function createMeal(req, res) {
    const userId = req.userId;
    const { type, eatTime, description, items, } = req.body;
    const meal = await prisma_1.prisma.$transaction(async (tx) => {
        // Busca os alimentos envolvidos
        const foods = await tx.food.findMany({
            where: {
                id: {
                    in: items.map((i) => i.foodId),
                },
                userId,
            },
        });
        if (foods.length !== items.length) {
            throw new Error('Alimento não encontrado');
        }
        // Cria a refeição
        const meal = await tx.meal.create({
            data: {
                type,
                eatTime: new Date(eatTime),
                description,
                userId,
            },
        });
        // Cria MealFood
        await tx.mealFood.createMany({
            data: items.map((item) => {
                const food = foods.find((f) => f.id === item.foodId);
                return {
                    mealId: meal.id,
                    foodId: food.id,
                    foodG: item.grams,
                    calories: (food.caloriesPer100g *
                        item.grams) /
                        100,
                    carbs: (food.carbsPer100g *
                        item.grams) /
                        100,
                    protein: (food.proteinPer100g *
                        item.grams) /
                        100,
                    fat: (food.fatPer100g *
                        item.grams) /
                        100,
                };
            }),
        });
        return meal;
    });
    return res.status(201).json(meal);
}
//# sourceMappingURL=meals.controller.js.map