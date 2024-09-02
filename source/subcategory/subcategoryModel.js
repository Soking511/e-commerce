"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subcategoriesSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    image: String,
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'categories' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('subcategory', subcategoriesSchema);
