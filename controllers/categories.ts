import { NextFunction, Request, Response } from "express";
import categoriesModel from "../models/categoriesModel";
import { Categories } from "../interfaces/categories";
import asyncHandler from 'express-async-handler';

export const getAllCategories = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const categories: Categories[] = await categoriesModel.find();
  res.status(200).json( {data:categories} );
} )

export const createCateggory = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
  const category:Categories = await categoriesModel.create( {req.body} );
  res.status(201).json({data:category});
} );