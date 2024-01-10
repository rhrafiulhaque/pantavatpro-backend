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
exports.reviewController = void 0;
const pick_1 = __importDefault(require("../../app/shared/pick"));
const common_1 = require("../../interface/common");
const review_service_1 = require("./review.service");
const addReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.reviewService.addReview(req.body);
        res.status(200).json({
            success: true,
            message: 'Review Added Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getReviewsByFoodId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodId = req.params.foodId;
        const reviews = yield review_service_1.reviewService.getReviewsByFoodId(foodId);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.reviewService.getAllReview();
        res.status(200).json({
            success: true,
            message: 'Reviews are  Retrived Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getFeedBack = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield review_service_1.reviewService.getFeedBack();
        res.status(200).json({
            success: true,
            message: 'FeedBack are  Retrived Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getReviewsByUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const paginationOptions = (0, pick_1.default)(req.query, common_1.paginationFields);
        const result = yield review_service_1.reviewService.getReviewsByUserEmail(email, paginationOptions);
        res.status(200).json({
            success: true,
            message: 'Reviews are  Retrived Successfully!',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.reviewController = {
    addReview,
    getReviewsByFoodId,
    getReviewsByUserEmail,
    getAllReview,
    getFeedBack,
};
