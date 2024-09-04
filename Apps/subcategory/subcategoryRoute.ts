import { Router } from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryByID, updateSubcategory } from './subcategoryController';
const subcategoryRoute:Router = Router( {mergeParams: true} );

subcategoryRoute.route( '/' )
  .get( getAllSubcategories )
  .post( createSubcategory );

  subcategoryRoute.route( '/:id' )
  .get( getSubcategoryByID )
  .delete( deleteSubcategory )
  .put( updateSubcategory );


export default subcategoryRoute;