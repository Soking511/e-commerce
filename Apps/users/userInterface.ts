import { Document } from "mongodb";
export interface Users extends Document{
  name:string;
  email:string;
  password: string;
  phoneNumber: string;
  image: string;
  verified: boolean;
  role: UserRoles;
  passwordChangedAt: Date|number;
  resetCode: string | number;
  resetCodeExpireTime: Date | number | undefined;
  resetCodeVerify: boolean | undefined;
  // address[];
}



type UserAddress = {
  street: string;
  state: string;
  city: string;
  postalCode: string;
}

type UserRoles = 'manager' | 'admin' | 'user'