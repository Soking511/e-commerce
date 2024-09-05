import { Router } from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryByID, updateSubcategory } from './subcategoryController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryByIDValidator, updateSubcategoryValidator } from '../../utils/validators/subcategoriesValidator';
const subcategoryRoute:Router = Router( {mergeParams: true} );

subcategoryRoute.route( '/' )
  .get( getAllSubcategories )
  .post( createSubcategoryValidator, createSubcategory );

  subcategoryRoute.route( '/:id' )
  .get( getSubcategoryByIDValidator, getSubcategoryByID )
  .delete( deleteSubcategoryValidator, deleteSubcategory )
  .put( updateSubcategoryValidator, updateSubcategory );


export default subcategoryRoute;