import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../Apps/categories/categoriesModel";

export const createCategoryValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('Category Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const category = await categoriesModel.findOne( {name:valueName} );
      if (category) throw new Error( 'Category is Already exist.' );
      return true;
    })
  , validatorMiddleware
]

export const getCategoryByIDValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const updateCategoryValidator:RequestHandler[] = [
  check( 'id' ).isMongoId().withMessage('Invalid Mongo ID'),
  check( 'name' ).optional().isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
  , validatorMiddleware
]

export const deleteCategoryValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]