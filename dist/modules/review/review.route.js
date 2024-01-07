"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const emailAuth_1 = __importDefault(require("../../app/middleware/emailAuth"));
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = express_1.default.Router();
router.post('/add-review', (0, validateRequest_1.default)(review_validation_1.reviewValidation.reviewAddZodSchema), review_controller_1.reviewController.addReview);
router.get('/getReview/:foodId', review_controller_1.reviewController.getReviewsByFoodId);
router.get('/getReviewsByUserEmail/:email', (0, emailAuth_1.default)(), review_controller_1.reviewController.getReviewsByUserEmail);
exports.ReviewRoutes = router;
