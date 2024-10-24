"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressValidator = exports.removeAddressValidator = exports.addAddressValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.addAddressValidator = [
    (0, express_validator_1.check)('address').notEmpty().withMessage('address required'),
    validatorMiddleware_1.default
];
exports.removeAddressValidator = [
    (0, express_validator_1.check)('addressId').isMongoId().withMessage('invalid address id'),
    validatorMiddleware_1.default
];
exports.updateAddressValidator = [
    (0, express_validator_1.check)('addressId').isMongoId().withMessage('invalid address id'),
    (0, express_validator_1.check)('street').optional().isLength({ min: 2, max: 10 }),
    (0, express_validator_1.check)('city').optional()
        .isLength({ min: 2, max: 10 }).withMessage('Invalid Length, must be between 2 & 10'),
    (0, express_validator_1.check)('state').optional()
        .isLength({ min: 2, max: 10 }).withMessage('Invalid Length, must be between 2 & 10'),
    validatorMiddleware_1.default
];
