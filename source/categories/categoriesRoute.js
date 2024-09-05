"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriesController_1 = require("./categoriesController");
const categoriesRoute = (0, express_1.Router)();
// categoriesRoute.get( '/', getAllCategories);
categoriesRoute.route('/')
    .get(categoriesController_1.getAllCategories)
    .post(categoriesController_1.createCategory);
categoriesRoute.route('/:id')
    .get(categoriesController_1.getCategoryByID)
    .delete(categoriesController_1.deleteCategory)
    .put(categoriesController_1.updateCategory);
exports.default = categoriesRoute;
