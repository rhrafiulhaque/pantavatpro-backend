"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const food_model_1 = require("../food/food.model");
const review_model_1 = require("./review.model");
const addReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, food } = review;
    console.log(userEmail, food);
    const reviewExist = yield review_model_1.Review.findOne({ food, userEmail });
    if (reviewExist) {
        throw new ApiError_1.default(500, 'The User has already submitted a review for this food.');
    }
    else {
        const result = yield review_model_1.Review.create(review);
        const stats = yield review_model_1.Review.aggregate([
            {
                $match: { food: new mongoose_1.default.Types.ObjectId(food._id) },
            },
            {
                $group: {
                    _id: '$food',
                    nRating: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                },
            },
        ]);
        if (stats.length > 0) {
            yield food_model_1.Food.findByIdAndUpdate(food._id, {
                averageRating: stats[0].avgRating,
                ratingsQuantity: stats[0].nRating,
            });
        }
        else {
            yield food_model_1.Food.findByIdAndUpdate(food._id, {
                averageRating: 0,
                ratingsQuantity: 0,
            });
        }
        return result;
    }
});
const getReviewsByFoodId = (foodId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield review_model_1.Review.find({ food: foodId });
    return reviews;
});
const getReviewsByUserEmail = (email, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 2 } = paginationOptions;
    const skip = (page - 1) * limit;
    const reviews = yield review_model_1.Review.find({ userEmail: email })
        .sort()
        .skip(skip)
        .limit(limit);
    const resultOfMenu = yield review_model_1.Review.find({ userEmail: email });
    const total = resultOfMenu.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: reviews,
    };
});
exports.reviewService = {
    addReview,
    getReviewsByFoodId,
    getReviewsByUserEmail,
};
