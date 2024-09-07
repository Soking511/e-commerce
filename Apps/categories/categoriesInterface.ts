import { Document } from "mongoose";
export interface Categories extends Document{
  // _id: any;
  name: string;
  images: string[];
  cover:string;
  // category: Categories;
};