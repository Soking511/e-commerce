"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const cartValidator_1 = require("../../utils/validators/cartValidator");
const cartController_1 = require("./cartController");
const cartRoute = (0, express_1.Router)();
cartRoute.use(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'));
cartRoute.route('/')
    .get(cartController_1.getUserCart)
    .post(cartValidator_1.addProductToCartValidator, cartController_1.addProductToCart)
    .put(cartController_1.updateCart)
    .delete(cartController_1.deleteUserCart);
cartRoute.put('/applyCoupon', cartController_1.applyCoupon);
cartRoute.route('/:itemId')
    .put(cartValidator_1.updateProductQuantityValidator, cartController_1.updateProductQuantity)
    .delete(cartValidator_1.removeProductFromCartValidator, cartController_1.removeProductFromCart);
exports.default = cartRoute;
