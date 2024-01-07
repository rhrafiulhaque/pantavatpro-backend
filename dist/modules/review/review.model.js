"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        required: true,
    },
    food: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Foods',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Review = (0, mongoose_1.model)('Reviews', reviewSchema);
