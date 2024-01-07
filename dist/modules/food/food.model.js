"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const mongoose_1 = require("mongoose");
const food_constant_1 = require("./food.constant");
const foodSchema = new mongoose_1.Schema({
    foodTitle: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    afterDiscountPrice: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    meal: {
        type: String,
        enum: food_constant_1.mealTitle,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sellsCount: {
        type: Number,
        default: 0,
    },
    isTrending: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Food = (0, mongoose_1.model)('Foods', foodSchema);
