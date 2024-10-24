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
exports.resetPasswordValidator = exports.forgetPasswordValidator = exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const userModel_1 = __importDefault(require("../../Apps/users/userModel"));
const passwordValidator = (field = 'password') => {
    return (0, express_validator_1.check)(field)
        .notEmpty().withMessage(`${field} is required`)
        .isLength({ min: 6, max: 20 }).withMessage(`${field} length must be between 6 and 20 characters`)
        .matches('[0-9]').withMessage(`${field} must contain a number`)
        .matches('[A-Z]').withMessage(`${field} must contain an uppercase letter`)
        .matches('[a-z]').withMessage(`${field} must contain a lowercase letter`);
};
const confirmPasswordValidator = (passwordField, confirmField) => {
    return passwordValidator(passwordField), (0, express_validator_1.check)(confirmField)
        .notEmpty().withMessage(`${confirmField} is required`)
        .custom((confirmVal, { req }) => {
        if (confirmVal !== req.body[passwordField]) {
            throw new Error(`${confirmField} does not match ${passwordField}`);
        }
        return true;
    });
};
exports.registerValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('User name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('Email is required')
        .normalizeEmail().isEmail().withMessage('Invalid email format')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.findOne({ email: val });
        if (user)
            throw new Error('Email already exists');
        return true;
    })),
    (0, express_validator_1.check)('role').optional().custom((val, { req }) => {
        req.body.role = 'user'; // Default role
        return true;
    }),
    confirmPasswordValidator('password', 'confirmPassword'),
    validatorMiddleware_1.default
];
// Login Validator
exports.loginValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    validatorMiddleware_1.default
];
// Forget Password Validator
exports.forgetPasswordValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty().withMessage('Email is required')
        .normalizeEmail().isEmail().withMessage('Invalid email format'),
    validatorMiddleware_1.default
];
// Reset Password Validator
exports.resetPasswordValidator = [
    confirmPasswordValidator('password', 'confirmPassword'),
    validatorMiddleware_1.default
];
