import { Document, Types } from "mongoose";
import { Products } from "../products/productInterface";
import productModel from "../products/productModel";
import { Orders } from "../order/orderInterface";

export interface Items extends Document{
  // order: Order;
  product: Products;
  quantity: number;
  unitPrice: number; // rice per unit at the time of purchase
  Subtotal: number; // Quantity * unitPrice
  order: Orders;
  child: {
    productsModel: typeof productModel;
    type: Types.ObjectId[];
  };
};

