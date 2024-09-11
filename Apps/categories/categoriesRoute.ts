import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeCategoryImages, updateCategory, uploadCategoryImages } from './categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
import { deleteChildValidator } from '../../utils/validators/childValidator';
import subcategoriesModel from '../subcategory/subcategoryModel';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import Products from "../../Apps/products/productModel";
import { protectRoute } from '../auth/authController';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get(
    // protectRoute,
    getAllCategories
  )

  .post(
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
    deleteCategoryValidator,
    deleteChildValidator(subcategoriesModel, 'category'),
    deleteChildValidator(Products, 'subcategory'),
    deleteCategory
  )
  .put(
    uploadCategoryImages,
    resizeCategoryImages,
    updateCategoryValidator,
    updateCategory
  );


export default categoriesRoute;