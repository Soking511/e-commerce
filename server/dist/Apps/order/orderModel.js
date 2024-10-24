"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ordersSchema = new mongoose_1.Schema({
    items: [{
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'products' },
            quantity: Number,
            price: Number
        }],
    totalPrice: Number,
    paymentMethod: { type: String, enum: ['card', 'cash'], default: 'cash' },
    deliveredAt: Date,
    paidAt: Date,
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    taxPrice: { type: Number, default: 0 },
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String
    },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });
ordersSchema.pre(/^find/, function (next) {
    this.populate({ path: 'items.product', select: 'name cover' });
    this.populate({ path: 'user', select: 'name image email' });
    next();
});
exports.default = (0, mongoose_1.model)('orders', ordersSchema);
