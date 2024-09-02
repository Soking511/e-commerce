import { NextFunction, Request, Response } from "express";
import SubCategory from "../interfaces/subcategoryInterface";
import SubcategoriesModel from "../models/subcategoryModel";
import asyncHandler from 'express-async-handler';

export const getAllSubCategories = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const categories: SubCategory[] = await SubcategoriesModel.find();
  res.status(200).json( {data:categories} );
} )

export const getSubCategoryByID = asyncHandler( async ( req:Request, res: Response, next: NextFunction )  => {
  const category: SubCategory | null = await SubcategoriesModel.findById(req.params.id);
  res.status(200).json({data:category});
} )

export const createSubCategory = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
  const category:SubCategory = await SubcategoriesModel.create( req.body );
  res.status(201).json({data:category});
} );

export const deleteSubCategory = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
  const category:SubCategory | null = await SubcategoriesModel.findByIdAndDelete(req.params.id);
  res.status(204).json();
} );

export const updateSubCategory = asyncHandler( async( req: Request, res: Response, next: NextFunction ) => {
  const category:SubCategory | null = await SubcategoriesModel.findByIdAndUpdate(req.params.id, req.body, { new: true } );
  res.status(200).json({data:category});
} );
