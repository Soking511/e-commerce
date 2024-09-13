import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import productModel from "../../Apps/products/productModel";

export const addProductToWishListValidator: RequestHandler[] = [
  check('product')
    .isMongoId().withMessage( 'Invalid Mongo ID' )
    .custom( async(val:string) => {
      const product = await productModel.findById(val);
      if (!product) throw new Error('Product Not Found');
      return true;
    })
  , validatorMiddleware
]
export const removeProductToWishListValidator: RequestHandler[] = [
  check('productId')
    .isMongoId().withMessage( 'Invalid Mongo ID' )
  , validatorMiddleware
]