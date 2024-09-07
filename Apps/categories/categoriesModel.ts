import { Schema, model } from "mongoose";
import { Categories } from "./categoriesInterface";

const categoriesSchema = new Schema<Categories>( {
  name: {type:String, required:true, trim:true, unique: true },
  images: [String],
  cover: String

}, { timestamps: true} );

export default model<Categories>( 'categories', categoriesSchema )