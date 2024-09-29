import { Products } from "./products";
import { UserAddress, Users } from "./uesrs";

export interface CartItems {
  _id?: string;
  product?: Products;
  quantity?: number;
  price?: number;
}


export interface Order {
  items?: CartItems;
  totalPrice?: number;
  paymentMethod?: string;
  deliveredAt?: Date | number;
  isDelivered?: boolean;
  paidAt?: Date | number;
  isPaid?: boolean;
  taxPrice?: number;
  address?: UserAddress;
  user?: Users;
}

export interface Orders {
totalPrice: string|number;
price: string|number;
updatedAt: any;
_id: any;
  order: Order[];
}