import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeCategoryImages, updateCategory, uploadCategoryImages } from './categoriesController';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
import { childDeleteValidator } from '../../utils/validators/childValidator';
import subcategoriesModel from '../subcategory/subcategoryModel';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import Products from "../../Apps/products/productModel";
import { protectRoute } from '../auth/authController';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  // .get( protectRoute('category'), getAllCategories ) // for test
  .get( protectRoute('category'), getAllCategories )
  .post( uploadCategoryImages, resizeCategoryImages, createCategoryValidator, createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByIDValidator, getCategoryByID )
  .delete( deleteCategoryValidator, childDeleteValidator(subcategoriesModel, 'category'), childDeleteValidator(Products, 'subcategory'), deleteCategory
  )
  .put( uploadCategoryImages, resizeCategoryImages, updateCategoryValidator, updateCategory );


export default categoriesRoute;