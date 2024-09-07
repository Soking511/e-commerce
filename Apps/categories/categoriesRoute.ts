import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeCategoryImages, updateCategory, uploadCategoryImages } from './categoriesController';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( uploadCategoryImages, resizeCategoryImages, createCategoryValidator, createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByIDValidator, getCategoryByID )
  .delete( deleteCategoryValidator, deleteCategory )
  .put( uploadCategoryImages, resizeCategoryImages, updateCategoryValidator, updateCategory );


export default categoriesRoute;