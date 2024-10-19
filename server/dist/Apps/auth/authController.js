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
exports.applyResetCode = exports.checkResetCodeVerification = exports.forgetPassword = exports.isHaveAccess = exports.isActive = exports.protectRoutes = exports.Login = exports.Register = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../users/userModel"));
const createToken_1 = require("../../utils/createToken");
const apiErrors_1 = __importDefault(require("../../utils/apiErrors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const sendMessageEmail_1 = __importDefault(require("../../utils/sendMessageEmail"));
const codeExpireTimeLimit = 10 * 60 * 1000;
exports.Register = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userModel_1.default.create(req.body);
    const token = (0, createToken_1.createToken)(currentUser._id, currentUser.role);
    res.status(201).json({ token, data: currentUser });
}));
exports.Login = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield userModel_1.default.findOne({ email: req.body.email });
    if (!currentUser || !(yield bcryptjs_1.default.compare(req.body.password, currentUser.password))) {
        return next(new apiErrors_1.default('invalid email or password', 401));
    }
    const token = (0, createToken_1.createToken)(currentUser._id, currentUser.role);
    res.status(200).json({ token, data: currentUser });
}));
exports.protectRoutes = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiErrors_1.default('please login first', 401));
    }
    const JWTVerify = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
    const user = yield userModel_1.default.findById(JWTVerify._id);
    if (!user) {
        return next(new apiErrors_1.default('User Not Found', 404));
    }
    if (user.passwordChangedAt instanceof Date) {
        if (user.passwordChangedAt.getTime() / 1000 > JWTVerify.iat) {
            return next(new apiErrors_1.default('Please, login again!', 401));
        }
    }
    // req.user = sanitizeUser(user);
    req.user = user;
    next();
}));
exports.isActive = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.active) !== 'true') {
        // return next(new APIErrors('You are not active!', 403));
    }
    next();
}));
const isHaveAccess = (...Roles) => {
    return (0, express_async_handler_1.default)((req, res, next) => {
        // if (!(Roles.includes(req.user?.role!)) ) return next(new APIErrors('you are not allowed to access this', 403));
        next();
    });
};
exports.isHaveAccess = isHaveAccess;
const generateRandomCode = () => { return Math.floor(Math.random() * 900000); };
exports.forgetPassword = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ email: req.body.email });
    if (!user)
        return next(new apiErrors_1.default('Not Found!', 404));
    const resetCode = generateRandomCode().toString();
    if (!resetCode) {
        return next(new apiErrors_1.default('Failed to generate reset code', 500));
    }
    user.resetCode = crypto_1.default.createHash('sha256').update(resetCode).digest('hex');
    user.resetCodeExpireTime = Date.now() + (codeExpireTimeLimit); // for 10 min (init in top of current page)
    user.resetCodeVerify = false;
    yield user.save();
    const message = `Your Reset Password Code is ${resetCode}`;
    try {
        yield (0, sendMessageEmail_1.default)({ email: user.email, subject: 'Reset Password', message });
        yield user.save({ validateModifiedOnly: true });
    }
    catch (err) {
        return next(new apiErrors_1.default('error sending email', 400));
    }
    const resetToken = (0, createToken_1.createResetToken)(user._id);
    res.status(200).json({ message: 'reset password code sent to your email', resetToken });
}));
exports.checkResetCodeVerification = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resetToken = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        resetToken = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiErrors_1.default(`You Don't Have Reset Code!`, 400));
    }
    const JWTVerify = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_KEY);
    const hashCode = crypto_1.default.createHash('sha256').update(req.body.resetCode).digest('hex');
    const user = yield userModel_1.default.findOne({
        _id: JWTVerify._id,
        resetCode: hashCode,
        resetCodeExpireTime: { $gt: Date.now() }
    });
    if (!user)
        return next(new apiErrors_1.default('Invalid or Expired Reset Code', 400));
    user.resetCodeVerify = true;
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'Reset Code Verified' });
}));
exports.applyResetCode = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let resetToken = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        resetToken = req.headers.authorization.split(' ')[1];
    }
    else {
        return next(new apiErrors_1.default("you can't do this action", 400));
    }
    const decodedToken = jsonwebtoken_1.default.verify(resetToken, process.env.JWT_KEY);
    const user = yield userModel_1.default.findOne({
        _id: decodedToken._id,
        resetCodeVerify: true
    });
    if (!user)
        return next(new apiErrors_1.default('Verify Your Reset Code First', 400));
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeExpireTime = undefined;
    user.resetCodeVerify = undefined;
    user.passwordChangedAt = Date.now();
    yield user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: 'Your Password Has Been Changed' });
}));
