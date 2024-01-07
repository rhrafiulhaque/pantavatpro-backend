"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const CategoryValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
    }),
});
exports.CategoryValidation = {
    CategoryValidationZodSchema,
};
