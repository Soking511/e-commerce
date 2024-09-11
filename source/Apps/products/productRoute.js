"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("./productController");
const productsValidator_1 = require("../../utils/validators/productsValidator");
const authController_1 = require("../auth/authController");
const productRoute = (0, express_1.Router)();
productRoute.route('/')
    .get(productController_1.getAllProducts)
    .post(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, productController_1.uploadProductImages, productController_1.resizeProductImages, productsValidator_1.createProductValidator, productController_1.createProduct);
productRoute.route('/:id')
    .get(productsValidator_1.getProductsByIDValidator, productController_1.getProductByID)
    .delete(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, productsValidator_1.deleteProductValidator, productController_1.deleteProduct)
    .put(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, productController_1.uploadProductImages, productController_1.resizeProductImages, productsValidator_1.updateProductValidator, productController_1.updateProduct);
exports.default = productRoute;
