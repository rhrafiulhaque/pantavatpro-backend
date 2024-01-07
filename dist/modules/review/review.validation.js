"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const reviewAddZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userEmail: zod_1.z.string({
            required_error: 'userEmail is required',
        }),
        rating: zod_1.z.number({
            required_error: 'rating is required',
        }),
        reviewText: zod_1.z.string({
            required_error: 'reviewText is required',
        }),
    }),
});
exports.reviewValidation = {
    reviewAddZodSchema,
};
