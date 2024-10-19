"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategoryModel_1 = __importDefault(require("../subcategory/subcategoryModel"));
const categoriesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    cover: String,
    child: { subcategoriesModel: subcategoryModel_1.default, type: mongoose_1.Schema.Types.ObjectId }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('categories', categoriesSchema);
