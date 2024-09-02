import SubCategory from "../../subcategory/interfaces/subcategoryInterface";

export default interface Product extends Document{
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  subcategoryID: SubCategory;
  imageURL: string;
  // couponID: Coupon;
};