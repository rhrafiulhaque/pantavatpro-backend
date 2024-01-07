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
exports.authService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../app/config"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const user_model_1 = require("../users/user.model");
const logIn = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const userExist = yield user_model_1.User.findOne({ email }, { password: 1, role: 1, email: 1, name: 1 }).lean();
    if (!userExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Doesnot Exist!');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(password, userExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password Doesnot Match!');
    }
    const accessToken = jsonwebtoken_1.default.sign({
        email: userExist.email,
        role: userExist === null || userExist === void 0 ? void 0 : userExist.role,
        name: userExist === null || userExist === void 0 ? void 0 : userExist.name,
    }, config_1.default.jwt.jwt_secret, {
        expiresIn: config_1.default.jwt.jwt_expire_in,
    });
    const refreshToken = jsonwebtoken_1.default.sign({
        email: userExist.email,
        role: userExist === null || userExist === void 0 ? void 0 : userExist.role,
    }, config_1.default.jwt.jwt_refresh_token, {
        expiresIn: config_1.default.jwt.jwt_refresh_expire_in,
    });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt.jwt_refresh_token);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { email } = verifiedToken;
    const userExist = yield user_model_1.User.findOne({ email }, { password: 1, role: 1, email: 1 }).lean();
    if (!userExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User Doesnot Exist!');
    }
    const newAccessToken = jsonwebtoken_1.default.sign({
        email: userExist.email,
        role: userExist === null || userExist === void 0 ? void 0 : userExist.role,
    }, config_1.default.jwt.jwt_secret, {
        expiresIn: config_1.default.jwt.jwt_expire_in,
    });
    return {
        accessToken: newAccessToken,
    };
});
exports.authService = {
    logIn,
    refreshToken,
};
