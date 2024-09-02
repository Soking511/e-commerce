import { Router } from 'express';
import { createSubCategory, deleteSubCategory, getAllSubCategories, getSubCategoryByID, updateSubCategory } from '../controllers/subcategoryController';
const subcategoryRoute:Router = Router( );

subcategoryRoute.route( '/' )
  .get( getAllSubCategories )
  .post( createSubCategory );

  subcategoryRoute.route( '/:id' )
  .get( getSubCategoryByID )
  .delete( deleteSubCategory )
  .put( updateSubCategory );


export default subcategoryRoute;