import { Schema, model } from "mongoose";
import { Items } from "./cartInterface";
import Products from "../products/productModel"

const itemsSchema = new Schema<Items>( {
  product:Products,
  quantity: Number,
  unitPrice: Number,
  Subtotal: Number,
  order: { type: Schema.Types.ObjectId, ref: 'orders' },
  child:{ productsModel:Products, type: Schema.Types.ObjectId }

}, { timestamps: true });

itemsSchema.pre<Items>(/^find/, function (next) {
  this.populate({ path: 'orders', select: 'name' })
  next();
})



export default model<Items>('items', itemsSchema)