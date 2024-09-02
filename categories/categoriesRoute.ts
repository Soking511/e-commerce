import { Router } from 'express';
import { createCategory, deleteCategory, getAllCategories, getCategoryByID, updateCategory } from './categoriesController';
const categoriesRoute:Router = Router( );

// categoriesRoute.get( '/', getAllCategories);

categoriesRoute.route( '/' )
  .get( getAllCategories )
  .post( createCategory );

categoriesRoute.route( '/:id' )
  .get( getCategoryByID )
  .delete( deleteCategory )
  .put( updateCategory );


export default categoriesRoute;