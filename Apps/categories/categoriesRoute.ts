import { NextFunction, Request, Response, Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeCategoryImages, updateCategory, uploadCategoryImages } from './categoriesController';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
import subcategoriesModel from '../subcategory/subcategoryModel';
import { childDeleteValidator } from '../../utils/validators/childValidator';
import Products from "../../Apps/products/productModel";
import APIErrors from '../../utils/apiErrors';
import { Model } from 'mongoose';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( uploadCategoryImages, resizeCategoryImages, createCategoryValidator, createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByIDValidator, getCategoryByID )
  .delete( deleteCategoryValidator, childDeleteValidator(subcategoriesModel, 'category'), childDeleteValidator(Products, 'subcategory'), deleteCategory
  )
  .put( uploadCategoryImages, resizeCategoryImages, updateCategoryValidator, updateCategory );


export default categoriesRoute;