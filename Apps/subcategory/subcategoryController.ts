import SubCategory from "./subcategoryInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import subcategoryModel from "./subcategoryModel";
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../moreInterfaces/filterData";

export const getAllSubcategories = getAll<SubCategory>( subcategoryModel, 'subcategory' );
export const getSubcategoryByID = getOne<SubCategory>( subcategoryModel );
export const createSubcategory = POST<SubCategory>( subcategoryModel );
export const deleteSubcategory = DELETE<SubCategory>( subcategoryModel  );
export const updateSubcategory = PUT<SubCategory>( subcategoryModel );

export const getSubcategoriesFromCategory = ( req:Request, res:Response, next: NextFunction ) => {
  let filterData: FilterData = { };
  if ( req.params.categoryId ){
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next( );
}