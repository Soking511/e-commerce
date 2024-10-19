"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const addressController_1 = require("./addressController");
const addressValidator_1 = require("../../utils/validators/addressValidator");
const addressRoute = (0, express_1.Router)();
addressRoute.use(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'));
addressRoute.route('/')
    .get(addressController_1.getUserAddress)
    .post(addressValidator_1.addAddressValidator, addressController_1.addAddress);
addressRoute.route('/:addressId')
    .delete(addressValidator_1.removeAddressValidator, addressController_1.deleteAddress)
    .put(addressValidator_1.updateAddressValidator, addressController_1.updateAddress);
exports.default = addressRoute;
