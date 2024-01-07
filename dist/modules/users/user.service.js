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
exports.usersService = void 0;
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield user_model_1.User.findOne({
        email: user.email,
    });
    if (userExist) {
        throw new ApiError_1.default(400, 'The Email  is already Exist');
    }
    else {
        const result = yield user_model_1.User.create(user);
        return result;
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    if (result.length == 0) {
        throw new ApiError_1.default(500, 'Users Are Not Found');
    }
    return result;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    if (!result) {
        throw new ApiError_1.default(500, 'User Not Found');
    }
    return result;
});
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, contactNo, address, district } = user;
    const updateFields = {
        name,
        contactNo,
        address,
        district,
    };
    const result = yield user_model_1.User.findOneAndUpdate({ email }, { $set: updateFields }, { new: true, upsert: true });
    return result;
});
exports.usersService = {
    createUser,
    getAllUsers,
    getUserByEmail,
    updateUser,
};
