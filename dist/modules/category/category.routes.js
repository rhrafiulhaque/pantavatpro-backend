"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/add-category-item', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.CategoryValidationZodSchema), category_controller_1.categoryController.addCategory);
router.get('/get-all-category', category_controller_1.categoryController.getAllCategory);
router.get('/categoryname/:category', category_controller_1.categoryController.getCategoryByName);
exports.categoryRoutes = router;
