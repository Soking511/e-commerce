"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const orderValidator_1 = require("../../utils/validators/orderValidator");
const orderController_1 = require("./orderController");
const ordersRoute = (0, express_1.Router)();
ordersRoute.use(authController_1.protectRoutes, authController_1.isActive);
ordersRoute.route('/')
    .get(orderController_1.filterOrders, orderController_1.getAllOrders)
    .post((0, authController_1.isHaveAccess)('user'), orderValidator_1.createOrderValidator, orderController_1.createCashOrder);
ordersRoute.route('/:id').get(orderValidator_1.getOrderValidator, orderController_1.getOrder);
ordersRoute.use((0, authController_1.isHaveAccess)('manager', 'admin'));
ordersRoute.route('/:id/paid').put(orderValidator_1.getOrderValidator, orderController_1.payOrder);
ordersRoute.route('/:id/delivered').put(orderValidator_1.getOrderValidator, orderController_1.deliverOrder);
exports.default = ordersRoute;
