
import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from "express";
import { FilterData } from '../moreInterfaces/filterData';
import { CartItems } from '../cart/cartInterface';
import { getAll, getOne } from '../httpMethods';
import { Orders } from './orderInterface';
import orderModel from './orderModel';
import cartModel from '../cart/cartModel';
import APIErrors from '../../utils/apiErrors';
import productModel from '../products/productModel';
import { calcTotalPrice } from '../cart/cartController';

export const filterOrders = asyncHandler((req: Request, res: Response, next: NextFunction) => {
  const filterData: FilterData = {};
  if (req.user?.role === 'user') { filterData.user = req.user._id }; 
  next();
});

export const getAllOrders = getAll<Orders>(orderModel, 'orders');
export const getOrder = getOne<Orders>(orderModel)

export const createCashOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const taxPrice: number = 100;
  const cart: any = await cartModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new APIErrors("you don't have cart to checkout", 400)) };
  const order = await orderModel.create({
    items: cart.items,
    taxPrice,
    totalPrice: cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice,
    address: req.body.address,
    user: req.user?._id
  });
  const bulkOption = await Promise.all(
    cart.items.map(async (item: CartItems) => {
      const cartCatch = await cartModel.findOne({ _id: item.product._id, user: { $ne: req.user?._id } });
      const productCatch = await productModel.findOne({ _id: item.product._id });

      if (cartCatch && productCatch) {
        if (!(item.quantity >= productCatch.quantity - 1)) {
          const cart: any = await cartModel.findByIdAndUpdate( {id: item.product._id}, {
            $pull: { items: { _id: item.product._id } }
          }, { new: true });
          calcTotalPrice(cart);
          await cart.save();
        }
      }

      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
        }
      };
    })

  );

  await productModel.bulkWrite(bulkOption);
  await cartModel.deleteOne({ user: req.user?._id });

  res.status(200).json({ data: order })
});

// update order paid
export const payOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderModel.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now()
  }, { new: true })
  res.status(200).json({ data: order })
});

// update order delivered
export const deliverOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const order = await orderModel.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now()
  }, { new: true })
  res.status(200).json({ data: order })
});