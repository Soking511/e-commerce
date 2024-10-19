import { Document, Schema } from "mongoose";
import { Products } from "../products/productInterface";
import { Users } from "../users/userInterface";


export interface Reviews extends Document {
  comment: string;
  rate: number;
  product: Products;
  user: Users;
  calcRatingAndQuantity(productId: Schema.Types.ObjectId): Promise<void>;
}

