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
exports.updateSubcategory = exports.deleteSubcategory = exports.createSubcategory = exports.getSubcategoryByID = exports.getAllSubcategories = exports.filterSubcategories = exports.resizeSubcategoryImages = exports.uploadSubcategoryImage = void 0;
const httpMethods_1 = require("../httpMethods");
const subcategoryModel_1 = __importDefault(require("./subcategoryModel"));
const sharp_1 = __importDefault(require("sharp"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uploadImages_1 = require("../../middlewares/uploadImages");
exports.uploadSubcategoryImage = (0, uploadImages_1.uploadSingleImage)('cover');
exports.resizeSubcategoryImages = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const imgName = `subcategory-${Date.now()}-.webp`;
        yield (0, sharp_1.default)(req.file.buffer)
            .toFormat('webp')
            .webp({ quality: 95 })
            .toFile(`uploads/subcategory/${imgName}`);
        req.body.cover = imgName;
    }
    next();
}));
const filterSubcategories = (req, res, next) => {
    let filterData = {};
    if (req.params.categoryId) {
        filterData.category = req.params.categoryId;
    }
    req.filterData = filterData;
    next();
};
exports.filterSubcategories = filterSubcategories;
exports.getAllSubcategories = (0, httpMethods_1.getAll)(subcategoryModel_1.default, 'subcategory');
exports.getSubcategoryByID = (0, httpMethods_1.getOne)(subcategoryModel_1.default);
exports.createSubcategory = (0, httpMethods_1.POST)(subcategoryModel_1.default);
exports.deleteSubcategory = (0, httpMethods_1.DELETE)(subcategoryModel_1.default);
exports.updateSubcategory = (0, httpMethods_1.PUT)(subcategoryModel_1.default);
