import {Schema, model} from "mongoose";
import Product from "./productInterface";

const productSchema = new Schema<Product>( {
  name: {type:String, required:true, trim:true, unique: true },
  description: String,
  price: Number,
  stockQuantity: Number,
  subcategoryID: { type: Schema.Types.ObjectId, ref:'subcategory'},
  imageURL: String,
  // couponID:
}, { timestamps: true })

export default model<Product>( 'product', productSchema );