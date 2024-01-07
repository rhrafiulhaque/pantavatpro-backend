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
exports.orderController = void 0;
const pick_1 = __importDefault(require("../../app/shared/pick"));
const common_1 = require("../../interface/common");
const food_service_1 = require("../food/food.service");
const order_model_1 = require("./order.model");
const { ObjectId } = require('mongodb');
const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;
const addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        const email = order.data.email;
        const foods = order.cartFood;
        const total_price = order.cartFood.reduce((acc, food) => {
            const subtotal = food.quantity * food.price;
            return acc + subtotal;
        }, 0);
        const tran_id = new ObjectId().toString();
        const data = {
            total_amount: total_price,
            currency: 'BDT',
            tran_id: tran_id,
            // success_url: `http://localhost:5000/api/v1/orders/payment/success/${tran_id}`,
            success_url: `https://pantavat-backend.vercel.app/api/v1/orders/payment/success/${tran_id}`,
            // fail_url: 'http://localhost:3000/payment/failded',
            fail_url: 'https://pantavat.vercel.app/payment/failded',
            // cancel_url: 'http://localhost:3000/payment/canceled',
            cancel_url: 'https://pantavat.vercel.app/payment/canceled',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'computer',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: order.data.name,
            cus_email: order.data.email,
            cus_add1: order.data.address,
            cus_add2: order.data.district,
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: order.data.contactNo,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        sslcz.init(data).then((apiResponse) => {
            const GatewayPageURL = apiResponse.GatewayPageURL;
            res.send({ url: GatewayPageURL });
        });
        const finalOrder = {
            food_items: foods,
            email,
            isPaid: false,
            tranjectionId: tran_id,
            deliveryStatus: 'Submitted',
        };
        order_model_1.Order.create(finalOrder);
    }
    catch (err) {
        next(err);
    }
});
const successPayment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.updateOne({ tranjectionId: req.params.tranId }, { isPaid: true });
        // Check if the update operation was successful
        if (result.modifiedCount === 1) {
            // Retrieve the order details using the tranId
            const order = yield order_model_1.Order.findOne({ tranjectionId: req.params.tranId });
            if (order) {
                // Iterate through food items in the order and update sells count and available quantity
                for (const food of order.food_items) {
                    yield food_service_1.foodService.updateSellsCount(food._id.toString(), food.quantity);
                    yield food_service_1.foodService.updateAvailabeQuantity({
                        id: food._id.toString(),
                        quantity: food.quantity,
                    });
                }
                // Redirect to the success page
                // res.redirect('http://localhost:3000/payment/success')
                res.redirect('https://pantavat.vercel.app/payment/success');
            }
            else {
                console.log('Order not found');
                res.status(404).json({ message: 'Order not found' });
            }
        }
        else {
            console.log('Document not found or not updated');
            // Handle the case where the document was not found or not updated.
            res.status(404).json({ message: 'Document not found' });
        }
    }
    catch (err) {
        next(err);
    }
});
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_model_1.Order.find();
        res.status(200).json({
            success: true,
            message: 'Order Retrived Successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getOrderListByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paginationOptions = (0, pick_1.default)(req.query, common_1.paginationFields);
        const { page = 1, limit = 4 } = paginationOptions;
        const skip = (page - 1) * limit;
        const result = yield order_model_1.Order.find({ email: req.params.email })
            .sort()
            .skip(skip)
            .limit(limit);
        const resultOfMenu = yield order_model_1.Order.find({ email: req.params.email });
        const total = resultOfMenu.length;
        res.status(200).json({
            success: true,
            message: 'Order Retrived Successfully!',
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateDeliveryStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateFields = {
            deliveryStatus: req.body.deliveryStatus,
        };
        const data = yield order_model_1.Order.findOneAndUpdate({ email: req.body.email } && { _id: new ObjectId(req.body.id) }, { $set: updateFields }, { upsert: true });
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Delivery Statuse Updated Successfully',
            data,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.orderController = {
    addOrder,
    successPayment,
    getAllOrders,
    updateDeliveryStatus,
    getOrderListByEmail,
};
