import { Router } from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryByID, resizeSubcategoryImages, updateSubcategory, uploadSubcategoryImages } from './subcategoryController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryByIDValidator, updateSubcategoryValidator } from '../../utils/validators/subcategoriesValidator';
import Products from "../../Apps/products/productModel";
import { childDeleteValidator } from '../../utils/validators/childValidator';

const subcategoryRoute:Router = Router( {mergeParams: true} );

subcategoryRoute.route( '/' )
  .get( getAllSubcategories )
  .post( uploadSubcategoryImages, resizeSubcategoryImages, createSubcategoryValidator, createSubcategory );

  subcategoryRoute.route( '/:id' )
  .get( getSubcategoryByIDValidator, getSubcategoryByID )
  // .delete( deleteSubcategoryValidator, deleteSubcategory )
  .delete( childDeleteValidator(Products, 'subcategory'), deleteSubcategory )
  .put( uploadSubcategoryImages, resizeSubcategoryImages, updateSubcategoryValidator, updateSubcategory );


export default subcategoryRoute;