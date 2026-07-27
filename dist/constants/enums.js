"use strict";
// Valores válidos para os campos que no PlantUML são enums.
// Como SQLite não suporta enums no Prisma 5, os campos no schema são `String`
// e a validação acontece no controller usando estas constantes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEVEL_CHOICES = exports.MEAL_CHOICES = exports.GENDER_CHOICES = void 0;
exports.GENDER_CHOICES = [
    'MASCULINO',
    'FEMININO',
    'NAO_ESPECIFICADO',
];
exports.MEAL_CHOICES = [
    'snack',
    'lunch',
    'breakfast',
    'dinner',
    'other',
];
exports.LEVEL_CHOICES = [
    'SEDENTARIO',
    'LEVEMENTE_ATIVO',
    'MODERADAMENTE_ATIVO',
    'MUITO_ATIVO',
    'EXTREMAMENTE_ATIVO',
];
//# sourceMappingURL=enums.js.map