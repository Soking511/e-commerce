"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductQuantityValidator = exports.removeProductFromCartValidator = exports.addProductToCartValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.addProductToCartValidator = [
    (0, express_validator_1.check)('product')
        .notEmpty().withMessage('Product required')
        .isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
exports.removeProductFromCartValidator = [
    (0, express_validator_1.check)('itemId').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
exports.updateProductQuantityValidator = [
    (0, express_validator_1.check)('itemId').isMongoId().withMessage('invalid mongo id'),
    (0, express_validator_1.check)('quantity')
        .notEmpty().withMessage('Quantity required')
        .isNumeric().withMessage('quantity must be number').toInt()
        .custom((val) => {
        if (val <= 0) {
            throw new Error('invalid quantity');
        }
        return true;
    }),
    validatorMiddleware_1.default
];
