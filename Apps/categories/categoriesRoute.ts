import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, updateCategory } from './categoriesController';
import subcategoryRoute from '../subcategory/subcategoryRoute';
import { createCategoryValidator, deleteCategoryValidator, getCategoryByIDValidator, updateCategoryValidator } from '../../utils/validators/categoriesValidator';
import { deleteSubcategory } from '../subcategory/subcategoryController';
const categoriesRoute:Router = Router( );

categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( createCategoryValidator, createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByIDValidator, getCategoryByID )
  .delete( deleteCategoryValidator, deleteCategory ) 
  .put( updateCategoryValidator, updateCategory );


export default categoriesRoute;