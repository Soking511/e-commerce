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
exports.deleteReviewValidator = exports.updateReviewValidator = exports.getReviewValidator = exports.createReviewValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const reviewsModel_1 = __importDefault(require("../../Apps/reviews/reviewsModel"));
exports.createReviewValidator = [
    (0, express_validator_1.check)('comment')
        .notEmpty().withMessage('Review comment required')
        .isLength({ min: 10, max: 500 }).withMessage('invalid comment length'),
    (0, express_validator_1.check)('rate')
        .notEmpty().withMessage('product rate required')
        .isFloat({ min: 1, max: 5 }).withMessage('invalid rate'),
    (0, express_validator_1.check)('product')
        .notEmpty().withMessage('product required')
        .isMongoId().withMessage('invalid product id'),
    (0, express_validator_1.check)('user')
        .notEmpty().withMessage('user required')
        .isMongoId().withMessage('invalid user id')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const review = yield reviewsModel_1.default.findOne({ user: val, product: req.params.productId });
        if (review) {
            throw new Error('you created review before');
        }
        ;
        return true;
    })),
    validatorMiddleware_1.default
];
exports.getReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
exports.updateReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id')
        .custom((val_1, _a) => __awaiter(void 0, [val_1, _a], void 0, function* (val, { req }) {
        const review = yield reviewsModel_1.default.findById(val);
        if ((review === null || review === void 0 ? void 0 : review.user._id.toString()) !== req.user._id.toString()) {
            throw new Error('you can only update your review');
        }
        return true;
    })),
    (0, express_validator_1.check)('comment').optional()
        .optional().isLength({ min: 10, max: 500 }).withMessage('invalid comment length'),
    (0, express_validator_1.check)('rate').optional()
        .optional().isFloat({ min: 1, max: 5 }).withMessage('invalid rate'),
    validatorMiddleware_1.default
];
exports.deleteReviewValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    // .custom(async (val: string, { req }) => {
    //   if (req.user.role === 'user') {
    //     const review = await reviewsModel.findById(val);
    //     if (review?.user._id!.toString() !== req.user._id.toString()) {
    //       throw new Error('you can only update your review');
    //     }
    //   }
    //   return true;
    // }),
    validatorMiddleware_1.default
];
