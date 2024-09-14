import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import cartModel from './cartModel';
import productModel from '../products/productModel';
import couponsModel from '../coupons/couponsModel';
import { CartItems, Carts } from './cartInterface';

export const getUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new Error("you don't have cart yet")) };
  res.status(200).json({ length: cart.items.length, data: cart })
});

export const deleteUserCart = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const cart = await cartModel.findOneAndDelete({ user: req.user?._id });
  if (!cart) { return next(new Error("you don't have cart to delete")) };
  res.status(204).json()
});

export const addProductToCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const product = await productModel.findById(req.body.product);
  if (!product) { return next(new Error('product not found')) };
  let cart: any = await cartModel.findOne({ user: req.user?._id });
  if (!cart) {
    cart = await cartModel.create({
      user: req.user?._id,
      items: [{ product: product._id, price: product.price }],
    })
  } else {
    const productIndex: number = cart.items.findIndex((item: CartItems) => item.product._id!.toString() === req.body.product.toString());
    if (productIndex > -1) {
      cart.items[productIndex].quantity += 1;
    } else {
      cart.items.push({ product: product._id, price: product.price })
    }
  }
  calcTotalPrice(cart)
  await cart.save();
  res.status(200).json({ length: cart.items.length, data: cart })
});

export const removeProductFromCart = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cart: any = await cartModel.findOneAndUpdate({ user: req.user?._id }, {
    $pull: { items: { _id: req.params.itemId } }
  }, { new: true });
  calcTotalPrice(cart);
  await cart.save();
  res.status(200).json({ length: cart.items.length, data: cart });
});

export const updateProductQuantity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cart: any = await cartModel.findOne({ user: req.user?._id });
  const productIndex: number = cart.items.findIndex((item: CartItems) => item._id!.toString() === req.params.itemId.toString());
  if (productIndex > -1) {
    cart.items[productIndex].quantity = req.body.quantity;
  } else {
    return next(new Error('product not exist in cart'))
  }
  calcTotalPrice(cart);
  cart.save();
  res.status(200).json({ length: cart.items.length, data: cart });
});

export const applyCoupon = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const coupon = await couponsModel.findOne({
    name: req.body.name,
    expireTime: { $gt: Date.now() }
  })
  if (!coupon) { return next(new Error('invalid or expired coupon')) };
  const cart: any = await cartModel.findOne({ user: req.user?._id });
  const totalPrice: number = cart.totalPrice;
  const totalPriceAfterDiscount = (totalPrice - (totalPrice * (coupon.discount / 100))).toFixed(2);
  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.save();
  res.status(200).json({ length: cart.items.length, data: cart });
});

export const calcTotalPrice = (cart: Carts): number => {
  let totalPrice: number = 0;
  cart.items.forEach((item: CartItems) => {
    totalPrice += item.price * item.quantity;
  });
  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};