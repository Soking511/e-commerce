import { Router } from 'express';
import { createSubcategory, deleteSubcategory, getAllSubcategories, getSubcategoryByID, resizeSubcategoryImages, updateSubcategory, uploadSubcategoryImage } from './subcategoryController';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryByIDValidator, updateSubcategoryValidator } from '../../utils/validators/subcategoriesValidator';
import Products from "../../Apps/products/productModel";
import { deleteChildValidator } from '../../utils/validators/childValidator';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';

const subcategoryRoute:Router = Router( {mergeParams: true} );

subcategoryRoute.route( '/' )
  .get( getAllSubcategories )
  .post(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadSubcategoryImage,
    resizeSubcategoryImages,
    createSubcategoryValidator,
    createSubcategory
  );

  subcategoryRoute.route( '/:id' )
  .get(
    getSubcategoryByIDValidator,
    getSubcategoryByID
  )

  .delete(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    deleteSubcategoryValidator,
    deleteChildValidator(Products, 'subcategory'),
    deleteSubcategory
  )

  .put(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadSubcategoryImage,
    resizeSubcategoryImages,
    updateSubcategoryValidator,
    updateSubcategory
  )

export default subcategoryRoute;