export interface User extends Document{
  firstName:string;
  lastName: string;
  email:string;
  password: string;
  phoneNumber: string;
  image: string;
  verified: boolean;

}