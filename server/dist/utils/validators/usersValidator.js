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
exports.changeLoggedUserPasswordValidator = exports.changeUserPasswordValidator = exports.deleteUserValidator = exports.updateUserValidator = exports.getUserByIDValidator = exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const userModel_1 = __importDefault(require("../../Apps/users/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.createUserValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('User Name Required')
        .isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20'),
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('Email Address is Required')
        .isEmail().withMessage('Invalid Email Address')
        .custom((valueName) => __awaiter(void 0, void 0, void 0, function* () {
        const User = yield userModel_1.default.findOne({ email: valueName });
        if (User)
            throw new Error('Email Address is Already Exist');
        return true;
    })),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({ min: 6, max: 20 }).withMessage('Password Length Must Be Between 8 & 20')
        .custom((inputPassword_1, _a) => __awaiter(void 0, [inputPassword_1, _a], void 0, function* (inputPassword, { req }) {
        if (inputPassword !== req.body.confirmPassword)
            throw new Error(`Password Doesn't Match!`);
        return true;
    })),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty().withMessage('Confirm Password is Required')
        .isLength({ min: 6, max: 20 }).withMessage('Password Length Must Be Between 8 & 20'),
    (0, express_validator_1.check)('phone').optional()
        .isMobilePhone(['ar-EG']).withMessage('Phone Number Must Be Egyptian Number'),
    validatorMiddleware_1.default
];
exports.getUserByIDValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.updateUserValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Mongo ID'),
    (0, express_validator_1.check)('name').optional()
        .notEmpty().withMessage('User Name Required')
        .isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20'),
    (0, express_validator_1.check)('phone').optional()
        .isMobilePhone(['ar-EG']).withMessage('Phone Number Must Be Egyptian Number'),
    (0, express_validator_1.check)('active').optional()
        .isBoolean().withMessage('Active Must Be Boolean ( true or false )'),
    validatorMiddleware_1.default
];
exports.deleteUserValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.changeUserPasswordValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('Password is Required')
        .isLength({ min: 8, max: 20 }).withMessage('Password Length Must Be Between 8 & 20')
        .custom((inputPassword_1, _a) => __awaiter(void 0, [inputPassword_1, _a], void 0, function* (inputPassword, { req }) {
        if (inputPassword !== req.body.confirmPassword)
            throw new Error(`Password Doesn't Match!`);
        return true;
    })),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty().withMessage('Confirm Password is Required')
        .isLength({ min: 6, max: 20 }).withMessage('Password Length Must Be Between 8 & 20'),
    validatorMiddleware_1.default
];
exports.changeLoggedUserPasswordValidator = [
    (0, express_validator_1.check)('currentPassword')
        .notEmpty().withMessage('current password is required')
        .isLength({ min: 6, max: 20 }).withMessage('current password length from 6 to 20 char')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const user = yield userModel_1.default.findById(req.user._id);
        const isValidPassword = yield bcryptjs_1.default.compare(val, user.password);
        if (!isValidPassword) {
            throw new Error("current password is incorrect");
        }
        ;
        return true;
    })),
    (0, express_validator_1.check)('password')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6, max: 20 }).withMessage('password length from 6 to 20 char')
        .custom((val, { req }) => {
        if (val !== req.body.confirmPassword) {
            throw new Error("password doesn't match");
        }
        ;
        return true;
    }),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty().withMessage('password is required')
        .isLength({ min: 6, max: 20 }).withMessage('password length from 6 to 20 char'),
    validatorMiddleware_1.default
];
