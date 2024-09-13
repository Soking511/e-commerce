import { Request, Response, NextFunction } from "express";
import asyncHandler from 'express-async-handler';
import userModel from "./userModel";

export const addProductToWishList= asyncHandler( async( req:Request, res:Response, next:NextFunction) => {
  const user = await userModel.findByIdAndUpdate( req.user?.productId, { $addToSet: { wishlist: req.body.product } } ,{ new:true } );
  res.status(200).json({length: user?.wishlist.length, data: user?.wishlist });
})


export const removeProductToWishList= asyncHandler( async( req:Request, res:Response, next:NextFunction) => {
  const user = await userModel.findByIdAndUpdate( req.user?.productId, { $pull: { wishlist: req.params.product } } ,{ new:true } );
  res.status(204);
})

export const getWishList = asyncHandler ( async( req:Request, res:Response, next:NextFunction) => {
  const user = await userModel.findByIdAndUpdate(req.user?._id, { $pull: { wishlist: req.params.productId } }, { new: true });
  res.status(200).json({length: user?.wishlist.length, data: user?.wishlist });
})
