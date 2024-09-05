import SubCategory from "../subcategory/subcategoryInterface";
import Categories from "../categories/categoriesInterface";

export default interface Product extends Document{
  populate: any;
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
  // couponID: Coupon;
};