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
exports.updateProduct = exports.deleteProduct = exports.getProductByID = exports.createProduct = exports.getAllProductsFromSubcategory = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("./productModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.getAllProducts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find();
    res.status(200).json({ data: products });
}));
exports.getAllProductsFromSubcategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let subcategoryID = req.params.id;
    if (!subcategoryID || !mongoose_1.default.Types.ObjectId.isValid(subcategoryID)) {
        res.status(204).json();
        return;
    }
    const filter = { subcategoryID };
    const SubcategoryProducts = yield productModel_1.default.find(filter);
    res.status(200).json({ data: SubcategoryProducts });
}));
exports.createProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.create(req.body);
    res.status(201).json({ data: product });
}));
exports.getProductByID = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    res.status(200).json({ data: product });
}));
exports.deleteProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findByIdAndDelete(req.params.id);
    res.status(204).json();
}));
exports.updateProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ data: product });
}));
