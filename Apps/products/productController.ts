import { NextFunction, Request, Response } from "express";
import Product from "./productInterface";
import ProductsModel from "./productModel";
import asyncHandler from 'express-async-handler';
import productModel from "./productModel";
import mongoose from "mongoose";
import { getAll, getOne, POST, DELETE, PUT } from "../httpMethods";


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

export const getAllProducts = getAll<Product>( productModel, 'subcategory' );
export const getProductByID = getOne<Product>( productModel );
export const createProduct = POST<Product>( productModel );
export const deleteProduct = DELETE<Product>( productModel  );
export const updateProduct  = PUT<Product>( productModel );