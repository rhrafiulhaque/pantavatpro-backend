"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
