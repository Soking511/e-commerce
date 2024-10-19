import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import userModel from "./userModel";

export const getUserWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await userModel.findById(req.user?._id).populate('wishlist');
  res.status(200).json({ length: user?.wishlist.length, data: user?.wishlist })
});

export const addProductToWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await userModel.findByIdAndUpdate(req.user?._id,
    { $addToSet: { wishlist: req.body.product } }, { new: true });
  res.status(200).json({ length: user?.wishlist.length, data: user?.wishlist })
});

export const deleteProductFromWishlist = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await userModel.findByIdAndUpdate(req.user?._id,
    { $pull: { wishlist: req.params.productId } }, { new: true });
  res.status(204).json()
});