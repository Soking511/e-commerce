import { Schema, model } from "mongoose";
import { Categories } from "./categoriesInterface";
import Subcategory from "../subcategory/subcategoryModel";

const categoriesSchema = new Schema<Categories>( {
  name: {type:String, required:true, trim:true, unique: true },
  child:{ subcategoriesModel:Subcategory, type: Schema.Types.ObjectId }

}, { timestamps: true} );

export default model<Categories>( 'categories', categoriesSchema )