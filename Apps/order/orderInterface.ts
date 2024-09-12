import { Document, Types } from "mongoose";
import userModel from "../users/userModel";
import { Users } from "../users/userInterface";
import { Items } from "../orderItem/itemInterface";

export interface Orders extends Document{
  user:Users;
  orderDate:Date;
  totalPrice: number;
  orderStatus:string;
  items:Items;
  child: {
    usersModel: typeof userModel;
    type: Types.ObjectId[];
  };
  // shippingAddress: Address;
  // paymentStatus:string;
  // paymentMethod: Payments;
};

