import { Subcategories } from "./subcategoryInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import subcategoryModel from "./subcategoryModel";
import { NextFunction, Request, Response } from "express";
import { FilterData } from "../moreInterfaces/filterData";

export const filterSubcategories = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterData = {};
  if (req.params.categoryId) {
    filterData.category = req.params.categoryId;
  }
  req.filterData = filterData;
  next();
}

export const getAllSubcategories = getAll<Subcategories>( subcategoryModel, 'subcategory' );
export const getSubcategoryByID = getOne<Subcategories>( subcategoryModel );
export const createSubcategory = POST<Subcategories>( subcategoryModel );
export const deleteSubcategory = DELETE<Subcategories>( subcategoryModel );
export const updateSubcategory = PUT<Subcategories>( subcategoryModel );