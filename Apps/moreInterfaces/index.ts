import { Users } from "../users/userInterface";
import { FilterData } from "./filterData";

declare module 'express'{
  interface Request{
    filterData?: FilterData;
    files?:any;
    user?:Users;
  }
}