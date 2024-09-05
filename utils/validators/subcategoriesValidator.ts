import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../Apps/categories/categoriesModel";

export const createSubcategoryValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('Category Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const category = await categoriesModel.findOne( {name:valueName} );
      if (category) throw new Error( 'Category is Already exist.' );
      return true;
    }),
    check( 'category' ).optional().isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const getSubcategoryByIDValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const updateSubcategoryValidator:RequestHandler[] = [
  check( 'id' ).isMongoId().withMessage('Invalid Mongo ID'),
  check( 'name' ).optional().isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20'),
  check( 'category' ).optional().isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const deleteSubcategoryValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]