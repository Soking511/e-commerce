"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlistController_1 = require("./wishlistController");
const wishlistValidator_1 = require("../../utils/validators/wishlistValidator");
const authController_1 = require("../auth/authController");
const wishlistRoute = (0, express_1.Router)();
wishlistRoute.use(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'));
wishlistRoute.route('/')
    .get(wishlistController_1.getUserWishlist)
    .post(wishlistValidator_1.addProductToWishListValidator, wishlistController_1.addProductToWishlist);
wishlistRoute.route('/:productId')
    .delete(wishlistValidator_1.removeProductToWishListValidator, wishlistController_1.deleteProductFromWishlist);
exports.default = wishlistRoute;
