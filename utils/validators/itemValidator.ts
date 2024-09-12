import { RequestHandler } from "express";
import { check } from "express-validator";
import productModel from "../../Apps/products/productModel";
import orderModel from "../../Apps/order/orderModel";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

export const addItemValidator:RequestHandler[] = [
  check('product')
    .isMongoId().withMessage('Product Not Found')
    .custom(async(id:string, {req}) => {
      const product = await productModel.findById( id );
      const mainOrder = await orderModel.findById( req.body.orders );
      if ( !product ) throw new Error( 'Product Not Found' );
      if ( mainOrder!.items.quantity < product.quantity ) throw new Error('There is not enough quantity');
      return true;
    }),

  check('quantity')
    .custom((num:number) => {
      if ( num <= 0 )
        throw new Error("Invalid Input Number");

      return true;
    })
  , validatorMiddleware
]

export const deleteItemValidator:RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid ID!')
  , validatorMiddleware
]

export const getItemByIDValidator:RequestHandler[] = [
  check('id').isMongoId().withMessage('Invalid ID!')
  , validatorMiddleware
]
