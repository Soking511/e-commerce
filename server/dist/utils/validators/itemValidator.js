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
exports.getItemByIDValidator = exports.deleteItemValidator = exports.addItemValidator = void 0;
const express_validator_1 = require("express-validator");
const productModel_1 = __importDefault(require("../../Apps/products/productModel"));
const orderModel_1 = __importDefault(require("../../Apps/order/orderModel"));
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
exports.addItemValidator = [
    (0, express_validator_1.check)('product')
        .isMongoId().withMessage('Product Not Found')
        .custom((id_1, _a) => __awaiter(void 0, [id_1, _a], void 0, function* (id, { req }) {
        const product = yield productModel_1.default.findById(id);
        const mainOrder = yield orderModel_1.default.findById(req.body.orders);
        if (!product)
            throw new Error('Product Not Found');
        if (mainOrder.items.quantity < product.quantity)
            throw new Error('There is not enough quantity');
        return true;
    })),
    (0, express_validator_1.check)('quantity')
        .custom((num) => {
        if (num <= 0)
            throw new Error("Invalid Input Number");
        return true;
    }),
    validatorMiddleware_1.default
];
exports.deleteItemValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid ID!'),
    validatorMiddleware_1.default
];
exports.getItemByIDValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid ID!'),
    validatorMiddleware_1.default
];
