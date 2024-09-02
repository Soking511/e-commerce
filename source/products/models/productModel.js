"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: String,
    price: Number,
    stockQuantity: Number,
    subcategoryID: { type: mongoose_1.Schema.Types.ObjectId, ref: 'subcategory' },
    imageURL: String,
    // couponID:
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('product', productSchema);
