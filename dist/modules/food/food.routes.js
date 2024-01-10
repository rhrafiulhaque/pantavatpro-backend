"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const food_controller_1 = require("./food.controller");
const food_validation_1 = require("./food.validation");
const router = express_1.default.Router();
router.post('/add-food-item', (0, validateRequest_1.default)(food_validation_1.FoodValidation.foodItemAddZodSchema), food_controller_1.foodController.addFoodItem);
router.get('/get-all-foods', food_controller_1.foodController.getAllFoods);
router.get('/getfoodsbymenu/:menuname', food_controller_1.foodController.getFoodsByMenu);
router.get('/getfoodsbyid/:foodId', food_controller_1.foodController.getFoodsById);
router.get('/getsearchfood/:searchKeyword', food_controller_1.foodController.getSearchFood);
exports.FoodRoutes = router;