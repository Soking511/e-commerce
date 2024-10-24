"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const couponsValidator_1 = require("../../utils/validators/couponsValidator");
const couponsController_1 = require("./couponsController");
const couponsRoute = (0, express_1.Router)();
couponsRoute.use(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('manager', 'admin'));
couponsRoute.route('/')
    .get(couponsController_1.getAllCoupons)
    .post(couponsValidator_1.createCouponValidator, couponsController_1.createCoupon);
couponsRoute.route('/:id')
    .get(couponsValidator_1.getCouponValidator, couponsController_1.getCoupon)
    .put(couponsValidator_1.updateCouponValidator, couponsController_1.updateCoupon)
    .delete(couponsValidator_1.deleteCouponValidator, couponsController_1.deleteCoupon);
exports.default = couponsRoute;
