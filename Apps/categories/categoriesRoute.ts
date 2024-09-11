import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeCategoryImages, updateCategory, uploadCategoryImages } from './categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
import { deleteChildValidator } from '../../utils/validators/childValidator';
import subcategoriesModel from '../subcategory/subcategoryModel';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import Products from "../../Apps/products/productModel";
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get(
    getAllCategories
  )

  .post(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadCategoryImages,
    resizeCategoryImages,
    createCategoryValidator,
    createCategory
  );

categoriesRoute.route( '/:id' )
  .get(
    getCategoryByIDValidator,
    getCategoryByID
  )

  .delete(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    deleteCategoryValidator,
    deleteChildValidator(subcategoriesModel, 'category'),
    deleteChildValidator(Products, 'subcategory'),
    deleteCategory
  )
  .put(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadCategoryImages,
    resizeCategoryImages,
    updateCategoryValidator,
    updateCategory
  );


export default categoriesRoute;