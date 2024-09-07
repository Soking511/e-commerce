import { Schema, model } from "mongoose";
import { Subcategories } from "./subcategoryInterface";

const subcategoriesSchema = new Schema<Subcategories>( {
  name: {type:String, required:true, trim:true },
  images: [String],
  cover: String,
  category: { type: Schema.Types.ObjectId, ref: 'categories' }
}, { timestamps: true });

subcategoriesSchema.pre<Subcategories>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' });
  next();
});

export default model<Subcategories>('subcategories', subcategoriesSchema)