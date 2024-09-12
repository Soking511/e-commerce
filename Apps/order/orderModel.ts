import { Schema, model } from "mongoose";
import { Orders } from "./orderInterface";
import userModel from "../users/userModel";
import itemsModel from "../orderItem/itemModel";

const ordersSchema = new Schema<Orders>( {
  user:userModel,
  orderDate:Date,
  totalPrice: Number,
  orderStatus: String,
  items: itemsModel,
  child:{ usersModel:userModel, type: Schema.Types.ObjectId }

}, { timestamps: true });

ordersSchema.pre<Orders>(/^find/, function (next) {
  this.populate({ path: 'items', select: 'name' })
  next();
})

export default model<Orders>('orders', ordersSchema)