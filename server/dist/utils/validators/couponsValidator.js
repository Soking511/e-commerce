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
exports.deleteCouponValidator = exports.updateCouponValidator = exports.getCouponValidator = exports.createCouponValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const couponsModel_1 = __importDefault(require("../../Apps/coupons/couponsModel"));
exports.createCouponValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('coupon name required')
        .isLength({ min: 2, max: 50 }).withMessage('name length must be between 2 & 50')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const coupon = yield couponsModel_1.default.findOne({ name: val });
        if (coupon) {
            throw new Error('coupon is already exist');
        }
        ;
        return true;
    })),
    (0, express_validator_1.check)('discount')
        .notEmpty().withMessage('discount is required')
        .isNumeric().custom((val) => {
        if (val <= 0 || val > 100) {
            throw new Error('invalid discount');
        }
        ;
        return true;
    }),
    (0, express_validator_1.check)('expireTime')
        .notEmpty().withMessage('expire time is required')
        .isDate().withMessage('invalid Date'),
    validatorMiddleware_1.default
];
exports.getCouponValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
exports.updateCouponValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    (0, express_validator_1.check)('name')
        .optional().isLength({ min: 2, max: 50 }).withMessage('name length must be between 2 & 50'),
    (0, express_validator_1.check)('discount').optional().isNumeric()
        .custom((val) => {
        if (val <= 0 || val > 100) {
            throw new Error('invalid discount');
        }
        ;
        return true;
    }),
    (0, express_validator_1.check)('expireTime').optional().isDate().withMessage('invalid Date'),
    validatorMiddleware_1.default
];
exports.deleteCouponValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
