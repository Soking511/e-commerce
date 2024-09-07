import { Document } from "mongoose";
import { Categories } from "../categories/categoriesInterface";;

export interface Subcategories extends Document{
  name: string;
  images: string[];
  cover:string;
  category: Categories;
};

