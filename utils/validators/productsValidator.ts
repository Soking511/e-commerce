import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import categoriesModel from "../../Apps/categories/categoriesModel";
import subcategoriesModel from "../../Apps/subcategory/subcategoryModel";
import "../../Apps/categories/categoriesInterface"

export const createProductValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('Category Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const category = await categoriesModel.findOne( {name:valueName} );
      if (category) throw new Error( 'Category is Already exist.' );
      return true;
    }),

  check('quantity').optional()
    .isNumeric().withMessage('Quantity Must Be Number').toInt()
    .custom((val) => {
      if (val < 0)
        throw new Error('Invalid Quantity');

      return true;
    }),
  check('price')
    .notEmpty().withMessage('product price required')
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0)
        throw new Error('invalid price');

      return true;
    }),
  check('priceAfterDiscount').optional()
    .isNumeric().withMessage('price with discount must be number').toFloat()
    .custom((val: number, { req }) => {
      if (val <= 0 || val > req.body.price)
        throw new Error('invalid discount price');

      return true;
    }),

  check( 'category' ).optional().isMongoId().withMessage('Invalid Mongo ID')
      .notEmpty().withMessage('Enter Category')
      .custom( async( value:string, {req} ) => {
        const category = await categoriesModel.findById( value );
        if ( !category )
          throw new Error('category not exist');

        return true;
      }),

      check( 'subcategory' ).isMongoId().withMessage('Invalid Mongo ID')
      .notEmpty().withMessage('Enter Subcategory')
      .custom( async( value:string, {req} ) => {
        const subcategory = await subcategoriesModel.findById( value );
        if ( !subcategory )
          throw new Error('subcategory not exist');

        return true;
      }),
    validatorMiddleware
  ];

export const getProductsByIDValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const updateProductValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID'),

  check( 'name' ).optional()
    .notEmpty( ).withMessage('Category Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const category = await categoriesModel.findOne( {name:valueName} );
      if (category) throw new Error( 'Category is Already exist.' );
      return true;
    }),

  check('quantity').optional()
    .isNumeric().withMessage('quantity must be number').toInt()
    .custom((val) => {
      if (val < 0) throw new Error('invalid quantity');
      return true;
    }),
  check('price').optional()
    .notEmpty().withMessage('product price required')
    .isNumeric().withMessage('price must be number').toFloat()
    .custom((val: number) => {
      if (val <= 0) throw new Error('invalid price');
      return true;
    }),
  check('priceAfterDiscount').optional()
    .isNumeric().withMessage('price with discount must be number').toFloat()
    .custom((val: number, { req }) => {
      if (val <= 0 || val > req.body.price) throw new Error('invalid discount price');
      return true;
    }),

    check( 'category' ).optional().isMongoId().withMessage('Invalid Mongo ID')
    .notEmpty().withMessage('Enter Category')
    .custom( async( value:string, {req} ) => {
      const category = await categoriesModel.findById( value );
      if ( !category )
        throw new Error('category not exist');

      return true;
    }),

    check( 'subcategories' ).optional().isMongoId().withMessage('Invalid Mongo ID')
    .notEmpty().withMessage('Enter SubCategory')
    .custom( async( value:string, {req} ) => {
      const subcategories = await subcategoriesModel.findById( value );
      if ( !subcategories )
        throw new Error('subcategory not exist');

      return true;
    }),
  validatorMiddleware
]

export const deleteProductValidator: RequestHandler[] = [
  check('id')
    .isMongoId().withMessage('invalid mongo id')
    ,
  validatorMiddleware
];