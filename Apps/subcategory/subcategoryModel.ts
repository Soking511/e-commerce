import { Schema, model } from "mongoose";
import SubCategories from "./subcategoryInterface";
import categoriesModel from "../categories/categoriesModel";

const subcategoriesSchema = new Schema<SubCategories>( {
  name: {type:String, required:true, trim:true, unique: true },
  image: String,
  category: {type: Schema.Types.ObjectId, ref:'categories' },
}, { timestamps: true });

subcategoriesSchema.pre<SubCategories>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' });
  next();
});

export default model<SubCategories>( 'subcategory', subcategoriesSchema )
