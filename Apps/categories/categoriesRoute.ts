import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, updateCategory } from './categoriesController';
import subcategoryRoute from '../subcategory/subcategoryRoute';
const categoriesRoute:Router = Router( );

// categoriesRoute.get( '/', getAllCategories);
categoriesRoute.use('/:categoryId/subcategory', subcategoryRoute);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByID )
  .delete( deleteCategory )
  .put( updateCategory );


export default categoriesRoute;