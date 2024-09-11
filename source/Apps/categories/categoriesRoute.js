"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("./categoriesController");
const categoriesValidator_1 = require("../../utils/validators/categoriesValidator");
const childValidator_1 = require("../../utils/validators/childValidator");
const subcategoryModel_1 = __importDefault(require("../subcategory/subcategoryModel"));
const subcategoryRoute_1 = __importDefault(require("../subcategory/subcategoryRoute"));
const productModel_1 = __importDefault(require("../../Apps/products/productModel"));
const authController_1 = require("../auth/authController");
const categoriesRoute = (0, express_1.Router)();
categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute_1.default);
categoriesRoute.route('/')
    .get(categoriesController_1.getAllCategories)
    .post(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, categoriesController_1.uploadCategoryImages, categoriesController_1.resizeCategoryImages, categoriesValidator_1.createCategoryValidator, categoriesController_1.createCategory);
categoriesRoute.route('/:id')
    .get(categoriesValidator_1.getCategoryByIDValidator, categoriesController_1.getCategoryByID)
    .delete(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, categoriesValidator_1.deleteCategoryValidator, (0, childValidator_1.deleteChildValidator)(subcategoryModel_1.default, 'category'), (0, childValidator_1.deleteChildValidator)(productModel_1.default, 'subcategory'), categoriesController_1.deleteCategory)
    .put(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, categoriesController_1.uploadCategoryImages, categoriesController_1.resizeCategoryImages, categoriesValidator_1.updateCategoryValidator, categoriesController_1.updateCategory);
exports.default = categoriesRoute;
