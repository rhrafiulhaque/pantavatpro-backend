"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../app/enums/user");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const emailAuth_1 = __importDefault(require("../../app/middleware/emailAuth"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/add-order', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), order_controller_1.orderController.addOrder);
router.post('/payment/success/:tranId', order_controller_1.orderController.successPayment);
router.patch('/update-delivery-status', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.updateDeliveryStatus);
router.get('/getAllOrders', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getAllOrders);
router.get('/getOrderListByEmail/:email', (0, emailAuth_1.default)(), order_controller_1.orderController.getOrderListByEmail);
exports.OrderRoutes = router;
