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
exports.deleteChildValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const deleteChildValidator = (childModel, parentField) => [
    (0, express_validator_1.check)('id')
        .isMongoId()
        .withMessage('Invalid Mongo ID')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const childDocs = yield childModel.find({ [parentField]: val });
        if (childDocs.length > 0) {
            const bulkOption = childDocs.map((doc) => ({
                deleteOne: { filter: { _id: doc._id } }
            }));
            yield childModel.bulkWrite(bulkOption);
        }
    })),
    validatorMiddleware_1.default
];
exports.deleteChildValidator = deleteChildValidator;
