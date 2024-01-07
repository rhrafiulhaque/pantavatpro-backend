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
exports.foodController = void 0;
const pick_1 = __importDefault(require("../../app/shared/pick"));
const common_1 = require("../../interface/common");
const food_service_1 = require("./food.service");
const addFoodItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield food_service_1.foodService.addFoodItem(req.body);
        res.status(200).json({
            success: true,
            message: 'Food Added Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllFoods = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationOptions = (0, pick_1.default)(req.query, common_1.paginationFields);
        const result = yield food_service_1.foodService.getAllFoods(paginationOptions);
        res.status(200).json({
            success: true,
            message: 'Food Retrived Successfully!',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getFoodsByMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { menuname } = req.params;
    const paginationOptions = (0, pick_1.default)(req.query, common_1.paginationFields);
    try {
        const result = yield food_service_1.foodService.getFoodsByMenu(menuname, paginationOptions);
        res.status(200).json({
            success: true,
            message: 'Food Retrived Successfully!',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
});
const getFoodsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodId } = req.params;
    try {
        const result = yield food_service_1.foodService.getFoodsById(foodId);
        res.status(200).json({
            success: true,
            message: 'Food Retrived Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSearchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const searchKeyword = req.query.searchKeyword;
    try {
        const result = yield food_service_1.foodService.getSearchFood(searchKeyword);
        res.status(200).json({
            success: true,
            message: 'Searched Product Retrieve Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.foodController = {
    addFoodItem,
    getAllFoods,
    getFoodsByMenu,
    getFoodsById,
    getSearchFood,
};
