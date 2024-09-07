import {Subcategories} from "../subcategory/subcategoryInterface";
import {Categories} from "../categories/categoriesInterface";

import { Document } from "mongoose";
export interface Products extends Document {
  name: string;
  description: string;
  category: Categories;
  subcategory: Subcategories;
  quantity: number;
  sold: number;
  price: number;
  priceAfterDiscount: number;
  cover: string;
  images: string[];
  ratingAverage: number;
  ratingCount: number;
};