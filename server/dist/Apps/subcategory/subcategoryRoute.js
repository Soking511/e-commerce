"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoryController_1 = require("./subcategoryController");
const subcategoriesValidator_1 = require("../../utils/validators/subcategoriesValidator");
const productModel_1 = __importDefault(require("../../Apps/products/productModel"));
const childValidator_1 = require("../../utils/validators/childValidator");
const authController_1 = require("../auth/authController");
const subcategoryRoute = (0, express_1.Router)({ mergeParams: true });
subcategoryRoute.route('/')
    .get(subcategoryController_1.getAllSubcategories)
    .post(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, subcategoryController_1.uploadSubcategoryImage, subcategoryController_1.resizeSubcategoryImages, subcategoriesValidator_1.createSubcategoryValidator, subcategoryController_1.createSubcategory);
subcategoryRoute.route('/:id')
    .get(subcategoriesValidator_1.getSubcategoryByIDValidator, subcategoryController_1.getSubcategoryByID)
    .delete(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, subcategoriesValidator_1.deleteSubcategoryValidator, (0, childValidator_1.deleteChildValidator)(productModel_1.default, 'subcategory'), subcategoryController_1.deleteSubcategory)
    .put(authController_1.isActive, (0, authController_1.isHaveAccess)('admin', 'manager'), authController_1.protectRoutes, subcategoryController_1.uploadSubcategoryImage, subcategoryController_1.resizeSubcategoryImages, subcategoriesValidator_1.updateSubcategoryValidator, subcategoryController_1.updateSubcategory);
exports.default = subcategoryRoute;
