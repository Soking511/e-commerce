"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: String,
    phoneNumber: String,
    image: String,
    verified: Boolean
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('user', userSchema);
