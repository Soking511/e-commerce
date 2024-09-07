import { Document, Types } from "mongoose";
import { Categories } from "../categories/categoriesInterface";;
import Products from "../products/productModel"

export interface Subcategories extends Document{
  name: string;
  images: string[];
  cover:string;
  category: Categories;
  child: {
    productsModel: typeof Products;  
    type: Types.ObjectId[];          // Array of product ObjectIds
  };
};

