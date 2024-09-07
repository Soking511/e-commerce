import { Router } from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryByID, updateSubcategory } from './subcategoryController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryByIDValidator, updateSubcategoryValidator } from '../../utils/validators/subcategoriesValidator';
import { uploadProductImages, resizeProductImages } from '../categories/categoriesController';
const subcategoryRoute:Router = Router( {mergeParams: true} );

subcategoryRoute.route( '/' )
  .get( getAllSubcategories )
  .post( uploadProductImages, resizeProductImages, createSubcategoryValidator, createSubcategory );

  subcategoryRoute.route( '/:id' )
  .get( getSubcategoryByIDValidator, getSubcategoryByID )
  .delete( deleteSubcategoryValidator, deleteSubcategory )
  .put( uploadProductImages, resizeProductImages, updateSubcategoryValidator, updateSubcategory );


export default subcategoryRoute;