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
exports.foodService = void 0;
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const food_model_1 = require("./food.model");
const addFoodItem = (food) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodTitle } = food;
    const foodExist = yield food_model_1.Food.findOne({ foodTitle });
    if (foodExist) {
        throw new ApiError_1.default(500, 'The food is already Exist');
    }
    else {
        const result = yield food_model_1.Food.create(food);
        return result;
    }
});
const getAllFoods = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 4 } = paginationOptions;
    const skip = (page - 1) * limit;
    const result = yield food_model_1.Food.find().sort().skip(skip).limit(limit);
    const total = yield food_model_1.Food.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getFoodsByMenu = (meal, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 2 } = paginationOptions;
    const skip = (page - 1) * limit;
    const result = yield food_model_1.Food.find({ meal }).sort().skip(skip).limit(limit);
    const resultOfMenu = yield food_model_1.Food.find({ meal });
    const total = resultOfMenu.length;
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getFoodsById = (foodId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield food_model_1.Food.findById(foodId);
        return result;
    }
    catch (err) {
        throw new ApiError_1.default(400, 'Failed to get food by ID: ' + err);
    }
});
const updateAvailabeQuantity = (updatefood) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield food_model_1.Food.findById(updatefood.id);
        if (!food) {
            throw new ApiError_1.default(404, 'food not found');
        }
        if (food.stock < updatefood.quantity) {
            throw new ApiError_1.default(500, 'Your Quanity is More Than Stock');
        }
        food.stock = food.stock - updatefood.quantity;
        yield food.save();
        return food;
    }
    catch (err) {
        throw new ApiError_1.default(400, 'Failed to update food availableQuantity:');
    }
});
const updateSellsCount = (foodId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield food_model_1.Food.findById(foodId);
        if (!food) {
            throw new ApiError_1.default(404, 'Food not found');
        }
        food.sellsCount += quantity;
        yield food.save();
        return food;
    }
    catch (err) {
        throw new ApiError_1.default(400, 'Failed to update food sales:');
    }
});
const updateFood = (food) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, foodTitle, category, price, image, description, stock } = food;
    const updateFields = {
        foodTitle,
        category,
        price,
        image,
        description,
        stock,
    };
    const result = yield food_model_1.Food.findOneAndUpdate({ _id }, { $set: updateFields }, { new: true, upsert: true });
    return result;
});
const getSearchFood = (searchKeyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regexPattern = new RegExp(searchKeyword, 'i');
        const food = yield food_model_1.Food.find({
            $or: [
                { foodTitle: { $regex: regexPattern } },
                { category: { $regex: regexPattern } },
            ],
        });
        if (food.length === 0) {
            throw new ApiError_1.default(400, 'There are no foods matching the search criteria');
        }
        return food;
    }
    catch (err) {
        throw new ApiError_1.default(400, 'There was a problem retrieving foods: ' + err);
    }
});
exports.foodService = {
    addFoodItem,
    getAllFoods,
    getFoodsByMenu,
    getFoodsById,
    updateAvailabeQuantity,
    updateSellsCount,
    getSearchFood,
    updateFood,
};
