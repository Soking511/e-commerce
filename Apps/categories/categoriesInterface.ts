import { Document, Types } from "mongoose";
import Subcategories from "../subcategory/subcategoryModel"
export interface Categories extends Document{
  _id: any;
  name: string;
  images: string[];
  cover:string;
  child: {
    subcategoriesModel: typeof Subcategories;
    type: Types.ObjectId[];
  };
};