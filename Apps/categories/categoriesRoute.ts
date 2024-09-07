import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, resizeProductImages, updateCategory, uploadProductImages } from './categoriesController';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( uploadProductImages, resizeProductImages, createCategoryValidator, createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByIDValidator, getCategoryByID )
  .delete( deleteCategoryValidator, deleteCategory )
  .put( uploadProductImages, resizeProductImages, updateCategoryValidator, updateCategory );


export default categoriesRoute;