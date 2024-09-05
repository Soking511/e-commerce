import SubCategory from "../subcategory/subcategoryInterface";
import Categories from "../categories/categoriesInterface";

export default interface Products extends Document{
  name: string;
  description: string;
  price: number;
  priceAfterDiscount: number;
  stockQuantity: number;
  sold: number;
  subcategory: SubCategory;
  category: Categories;
  image: string[];
  cover: string;
  ratingAverage: number;
  ratingCount: number;
};