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
exports.deleteSubcategoryValidator = exports.updateSubcategoryValidator = exports.getSubcategoryByIDValidator = exports.createSubcategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const categoriesModel_1 = __importDefault(require("../../Apps/categories/categoriesModel"));
exports.createSubcategoryValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('Subcategory Name Required')
        .isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20')
        .custom((valueName) => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield categoriesModel_1.default.findOne({ name: valueName });
        if (category) {
            throw new Error('Subcategory is Already exist.');
        }
        return true;
    })),
    (0, express_validator_1.check)('category').optional().isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.getSubcategoryByIDValidator = [
    (0, express_validator_1.check)('id')
        .isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.updateSubcategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Mongo ID'),
    (0, express_validator_1.check)('name').optional().isLength({ min: 2, max: 20 }).withMessage('Name Length Must Be Between 2 > 20'),
    (0, express_validator_1.check)('category').optional().isMongoId().withMessage('Invalid Mongo ID'),
    validatorMiddleware_1.default
];
exports.deleteSubcategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('invalid mongo id'),
    validatorMiddleware_1.default
];
