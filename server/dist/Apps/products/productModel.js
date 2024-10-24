"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 1, max: 100000 },
    priceAfterDiscount: { type: Number, min: 1, max: 100000 },
    ratingAverage: Number,
    ratingCount: Number,
    quantity: { type: Number, min: 0, default: 0 },
    sold: { type: Number, default: 0 },
    cover: String,
    images: [String],
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'categories' },
    subcategory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'subcategories' }
}, { timestamps: true });
productsSchema.virtual('reviews', { ref: 'reviews', localField: '_id', foreignField: 'product' });
productsSchema.pre(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name' });
    this.populate({ path: 'subcategory', select: 'name' });
    next();
});
exports.default = (0, mongoose_1.model)('products', productsSchema);
