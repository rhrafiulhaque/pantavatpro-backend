"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodValidation = void 0;
const zod_1 = require("zod");
const food_constant_1 = require("./food.constant");
const foodItemAddZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        foodTitle: zod_1.z.string({
            required_error: 'Food Title is required',
        }),
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
        price: zod_1.z.number({
            required_error: 'price is required',
        }),
        description: zod_1.z.string({
            required_error: 'description is required',
        }),
        meal: zod_1.z.enum([...food_constant_1.mealTitle], {
            required_error: 'Meal is required',
        }),
        stock: zod_1.z.number({
            required_error: 'Stock is required',
        }),
    }),
});
exports.FoodValidation = {
    foodItemAddZodSchema,
};
