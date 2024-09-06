import {Subcategories} from "../subcategory/subcategoryInterface";
import {Categories} from "../categories/categoriesInterface";

export default interface Products extends Document{
  _id: any;
  populate(arg0: { path: string; select: string; }): unknown;
  name: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  stockQuantity: number;
  sold: number;
  subcategory: Subcategories;
  category: Categories;
  image: string[];
  cover: string;
  ratingAverage: number;
  ratingCount: number;
};