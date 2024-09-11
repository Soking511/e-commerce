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
exports.deleteProductValidator = exports.updateProductValidator = exports.getProductsByIDValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const categoriesModel_1 = __importDefault(require("../../Apps/categories/categoriesModel"));
const subcategoryModel_1 = __importDefault(require("../../Apps/subcategory/subcategoryModel"));
require("../../Apps/categories/categoriesInterface");
exports.createProductValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('Category Name Required')
        .isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20')
        .custom((valueName) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findOne({ name: valueName });
        if (category)
            throw new Error('Category is Already exist.');
        return true;
    })),
    (0, express_validator_1.check)('quantity').optional()
        .isNumeric().withMessage('Quantity Must Be Number').toInt()
        .custom((val) => {
        if (val < 0)
            throw new Error('Invalid Quantity');
        return true;
    }),
    (0, express_validator_1.check)('price')
        .notEmpty().withMessage('product price required')
        .isNumeric().withMessage('price must be number').toFloat()
        .custom((val) => {
        if (val <= 0)
            throw new Error('invalid price');
        return true;
    }),
    (0, express_validator_1.check)('priceAfterDiscount').optional()
        .isNumeric().withMessage('price with discount must be number').toFloat()
        .custom((val, { req }) => {
        if (val <= 0 || val > req.body.price)
            throw new Error('invalid discount price');
        return true;
    }),
    (0, express_validator_1.check)('category').optional().isMongoId().withMessage('Invalid Mongo ID')
        .notEmpty().withMessage('Enter Category')
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const category = yield categoriesModel_1.default.findById(value);
        if (!category)
            throw new Error('category not exist');
        return true;
    })),
    (0, express_validator_1.check)('subcategory').isMongoId().withMessage('Invalid Mongo ID')
        .notEmpty().withMessage('Enter Subcategory')
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const subcategory = yield subcategoryModel_1.default.findById(value);
        if (!subcategory)
            throw new Error('subcategory not exist');
        return true;
    })),
    validatorMiddleware_1.default
];
exports.getProductsByIDValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.updateProductValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    (0, express_validator_1.check)('name').optional()
        .notEmpty().withMessage('Category Name Required')
        .isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20')
        .custom((valueName) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findOne({ name: valueName });
        if (category)
            throw new Error('Category is Already exist.');
        return true;
    })),
    (0, express_validator_1.check)('quantity').optional()
        .isNumeric().withMessage('quantity must be number').toInt()
        .custom((val) => {
        if (val < 0)
            throw new Error('invalid quantity');
        return true;
    }),
    (0, express_validator_1.check)('price').optional()
        .notEmpty().withMessage('product price required')
        .isNumeric().withMessage('price must be number').toFloat()
        .custom((val) => {
        if (val <= 0)
            throw new Error('invalid price');
        return true;
    }),
    (0, express_validator_1.check)('priceAfterDiscount').optional()
        .isNumeric().withMessage('price with discount must be number').toFloat()
        .custom((val, { req }) => {
        if (val <= 0 || val > req.body.price)
            throw new Error('invalid discount price');
        return true;
    }),
    (0, express_validator_1.check)('category').optional().isMongoId().withMessage('Invalid Mongo ID')
        .notEmpty().withMessage('Enter Category')
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const category = yield categoriesModel_1.default.findById(value);
        if (!category)
            throw new Error('category not exist');
        return true;
    })),
    (0, express_validator_1.check)('subcategories').optional().isMongoId().withMessage('Invalid Mongo ID')
        .notEmpty().withMessage('Enter SubCategory')
        .custom((value_1, _a) => __awaiter(void 0, [value_1, _a], void 0, function* (value, { req }) {
        const subcategories = yield subcategoryModel_1.default.findById(value);
        if (!subcategories)
            throw new Error('subcategory not exist');
        return true;
    })),
    validatorMiddleware_1.default
];
exports.deleteProductValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
