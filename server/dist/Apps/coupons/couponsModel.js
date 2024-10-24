"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const couponsSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    discount: { type: Number, required: true, min: 1, max: 100 },
    expireTime: { type: Date, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('coupons', couponsSchema);
