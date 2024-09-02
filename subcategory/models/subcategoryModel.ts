import { Schema, model } from "mongoose";
import SubCategories from "../interfaces/subcategoryInterface";

const subcategoriesSchema = new Schema<SubCategories>( {
  name: {type:String, required:true, trim:true, unique: true },
  image: String,
  category: { type: Schema.Types.ObjectId, ref:'categories' }
}, { timestamps: true });

export default model<SubCategories>( 'subcategory', subcategoriesSchema )