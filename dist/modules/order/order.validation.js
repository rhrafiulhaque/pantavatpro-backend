"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
const order_constant_1 = require("./order.constant");
const OrderAddZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        tranjectionId: zod_1.z.string({
            required_error: 'Image is required',
        }),
        email: zod_1.z.string({
            required_error: 'price is required',
        }),
        deliveryStatus: zod_1.z.enum([...order_constant_1.DeliveryStatus], {
            required_error: 'Meal is required',
        }),
    }),
});
exports.OrderValidation = {
    OrderAddZodSchema,
};
