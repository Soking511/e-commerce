"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productModel_1 = __importDefault(require("../products/productModel"));
const subcategoriesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    images: [String],
    cover: String,
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'categories' },
    child: { productsModel: productModel_1.default, type: mongoose_1.Schema.Types.ObjectId }
}, { timestamps: true });
subcategoriesSchema.pre(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name' });
    next();
});
exports.default = (0, mongoose_1.model)('subcategories', subcategoriesSchema);
