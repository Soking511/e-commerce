import { Document } from "mongoose";
import { CartItems } from "../cart/cartInterface";
import { UserAddress, Users }  from "../users/userInterface";

export interface Orders extends Document {
  items: CartItems;
  totalPrice: number;
  paymentMethod: Payment;
  deliveredAt: Date | number;
  isDelivered: boolean;
  paidAt: Date | number;
  isPaid: boolean;
  taxPrice: number;
  address: UserAddress;
  user: Users;
}

type Payment = 'cash' | 'card'