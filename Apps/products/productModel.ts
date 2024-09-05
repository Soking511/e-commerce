import { Schema, model } from "mongoose";
import Products from "./productInterface";
import categoriesModel from "../categories/categoriesModel";

const productSchema = new Schema<Products>( {
  name: {type:String, required:true, trim:true, unique: true },
  price: {type:Number, required:true, min: 1 },
  priceAfterDiscount: {type:Number, required:true, min: 1 },
  stockQuantity: {type:Number, default:0, min:0},
  sold: {type:Number, default:0, min:0},
  category: { type:Schema.Types.ObjectId, ref:'category'},
  subcategory: { type:Schema.Types.ObjectId, ref:'subcategories'},
  image: [String],
  cover: String,
  ratingAverage: Number,
  ratingCount: Number
}, { timestamps: true });

productSchema.pre<Products>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' });
  this.populate({ path: 'subcategory', select: 'name' });
  next();
});

export default model<Products>( 'subcategory', productSchema )
