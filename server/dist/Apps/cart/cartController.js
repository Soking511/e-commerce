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
exports.calcTotalPrice = exports.applyCoupon = exports.updateProductQuantity = exports.updateCart = exports.removeProductFromCart = exports.addProductToCart = exports.deleteUserCart = exports.getUserCart = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const cartModel_1 = __importDefault(require("./cartModel"));
const productModel_1 = __importDefault(require("../products/productModel"));
const couponsModel_1 = __importDefault(require("../coupons/couponsModel"));
exports.getUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        return next(new Error("you don't have cart yet"));
    }
    ;
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.deleteUserCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartModel_1.default.findOneAndDelete({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        return next(new Error("you don't have cart to delete"));
    }
    ;
    res.status(204).json();
}));
exports.addProductToCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const product = yield productModel_1.default.findById(req.body.product);
    if (!product)
        return next(new Error('product not found'));
    let cart = yield cartModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart) {
        if (!(product.quantity > 0))
            return next(new Error('product not available more quantity'));
        cart = yield cartModel_1.default.create({
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
            items: [{ product: product._id, price: product.price }],
        });
    }
    else {
        const productIndex = cart.items.findIndex((item) => item.product._id.toString() === req.body.product.toString());
        if (productIndex > -1) {
            if (cart.items[productIndex].quantity >= product.quantity)
                return next(new Error('product not available more quantity'));
            cart.items[productIndex].quantity += 1;
        }
        else {
            cart.items.push({ product: product._id, price: product.price });
        }
    }
    (0, exports.calcTotalPrice)(cart);
    yield cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.removeProductFromCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartModel_1.default.findOneAndUpdate({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, {
        $pull: { items: { _id: req.params.itemId } }
    }, { new: true });
    (0, exports.calcTotalPrice)(cart);
    yield cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.updateCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!cart)
        return next(new Error("Cart not found"));
    const productIndex = cart.items.findIndex((item) => { var _a; return ((_a = item._id) === null || _a === void 0 ? void 0 : _a.toString()) === req.params.itemId.toString(); });
    if (productIndex === -1)
        return next(new Error("Product does not exist in cart"));
    const product = yield productModel_1.default.findById(cart.items[productIndex].product._id);
    if (!product)
        return next(new Error("Product not found"));
    const requestedQuantity = Number(req.body.quantity);
    if (product.quantity < requestedQuantity) {
        return next(new Error('Insufficient product stock available'));
    }
    cart.items[productIndex].quantity = requestedQuantity;
    (0, exports.calcTotalPrice)(cart);
    yield cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.updateProductQuantity = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = yield cartModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const productIndex = cart.items.findIndex((item) => item._id.toString() === req.params.itemId.toString());
    const product = yield productModel_1.default.findById(cart.items[productIndex].product._id);
    if (productIndex > -1) {
        if (product.quantity < Number(req.body.quantity))
            return next(new Error('product not available more quantity'));
        cart.items[productIndex].quantity = req.body.quantity;
    }
    else {
        return next(new Error('product not exist in cart'));
    }
    (0, exports.calcTotalPrice)(cart);
    cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
exports.applyCoupon = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const coupon = yield couponsModel_1.default.findOne({
        name: req.body.name,
        expireTime: { $gt: Date.now() }
    });
    if (!coupon) {
        return next(new Error('invalid or expired coupon'));
    }
    ;
    const cart = yield cartModel_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    const totalPrice = cart.totalPrice;
    const totalPriceAfterDiscount = (totalPrice - (totalPrice * (coupon.discount / 100))).toFixed(2);
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
    cart.save();
    res.status(200).json({ length: cart.items.length, data: cart });
}));
const calcTotalPrice = (cart) => {
    let totalPrice = 0;
    cart.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    cart.totalPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
};
exports.calcTotalPrice = calcTotalPrice;
