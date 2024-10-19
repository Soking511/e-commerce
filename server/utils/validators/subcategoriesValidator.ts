import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../Apps/categories/categoriesModel";
import productModel from "../../Apps/products/productModel";
import {Products} from "../../Apps/products/productInterface";

export const createSubcategoryValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('Subcategory Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const category = await categoriesModel.findOne( {name:valueName} );
      if (category) { throw new Error( 'Subcategory is Already exist.' ); }
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

export const deleteSubcategoryValidator: RequestHandler[] = [
  check('id').isMongoId().withMessage('invalid mongo id')
  , validatorMiddleware
];