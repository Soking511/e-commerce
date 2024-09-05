"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategoryController_1 = require("./subcategoryController");
const subcategoryRoute = (0, express_1.Router)();
subcategoryRoute.route('/')
    .get(subcategoryController_1.getAllSubCategories)
    .post(subcategoryController_1.createSubCategory);
subcategoryRoute.route('/:id')
    .get(subcategoryController_1.getSubCategoryByID)
    .delete(subcategoryController_1.deleteSubCategory)
    .put(subcategoryController_1.updateSubCategory);
exports.default = subcategoryRoute;
