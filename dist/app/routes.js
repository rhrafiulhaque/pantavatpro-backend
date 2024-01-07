"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const category_routes_1 = require("../modules/category/category.routes");
const food_routes_1 = require("../modules/food/food.routes");
const order_route_1 = require("../modules/order/order.route");
const review_route_1 = require("../modules/review/review.route");
const user_route_1 = require("../modules/users/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/foods',
        route: food_routes_1.FoodRoutes,
    },
    {
        path: '/category',
        route: category_routes_1.categoryRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
