"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const productRoute = (0, express_1.Router)();
productRoute.route('/')
    .get(productController_1.getAllProducts)
    .post(productController_1.createProduct);
productRoute.route('/:id')
    .get(productController_1.getProductByID)
    .delete(productController_1.deleteProduct)
    .put(productController_1.updateProduct);
productRoute.route('/subcategory/:id')
    .get(productController_1.getAllProductsFromSubcategory);
exports.default = productRoute;
