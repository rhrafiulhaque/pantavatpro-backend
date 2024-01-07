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
exports.categoryService = void 0;
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const food_model_1 = require("../food/food.model");
const category_model_1 = require("./category.model");
const addCategory = (cat) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = cat;
    const categoryExist = yield category_model_1.Category.findOne({ category });
    if (categoryExist) {
        throw new ApiError_1.default(500, 'The Category is already Exist');
    }
    else {
        const result = yield category_model_1.Category.create(cat);
        return result;
    }
});
const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.find();
    return result;
});
const getCategoryByName = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield food_model_1.Food.find({ category });
    return result;
});
exports.categoryService = {
    addCategory,
    getAllCategory,
    getCategoryByName,
};
