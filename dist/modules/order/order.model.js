"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    food_items: [
        {
            _id: mongoose_1.Schema.Types.ObjectId,
            quantity: Number,
            foodTitle: String,
            price: Number,
        },
    ],
    isPaid: {
        type: Boolean,
        default: false,
    },
    tranjectionId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    deliveryStatus: {
        type: String,
        default: 'Submitted',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)('Orders', orderSchema);
