import { NextFunction, Request, Response } from "express";
import Product from "./productInterface";
import ProductsModel from "./productModel";
import asyncHandler from 'express-async-handler';
import productModel from "./productModel";
import mongoose from "mongoose";

export const getAllProducts = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const products: Product[] = await ProductsModel.find();
  res.status(200).json( {data:products} );
} )

export const getAllProductsFromSubcategory = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  let subcategoryID = req.params.id;

  if (!subcategoryID || !mongoose.Types.ObjectId.isValid(subcategoryID)){
    res.status(204).json();
    return;
  }

  const filter = { subcategoryID };
  const SubcategoryProducts: Product[] | null  = await ProductsModel.find(filter);
  res.status(200).json( {data:SubcategoryProducts} );

} )

export const createProduct = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const product: Product = await ProductsModel.create( req.body );
  res.status(201).json( {data:product} );
} )

export const getProductByID = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const product: Product | null = await ProductsModel.findById( req.params.id );
  res.status(200).json( {data:product} );
} )

export const deleteProduct = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const product: Product | null = await ProductsModel.findByIdAndDelete( req.params.id );
  res.status(204).json( );
} )

export const updateProduct = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const product: Product | null = await ProductsModel.findByIdAndUpdate( req.params.id, req.body, { new: true } );
  res.status(200).json( {data:product} );
} )

