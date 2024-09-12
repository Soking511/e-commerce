import { Items } from "./itemInterface";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import itemModel from "./itemModel";

export const getAllItems = getAll<Items>( itemModel, 'items' );
export const getItemByID = getOne<Items>( itemModel );
export const addItem = POST<Items>( itemModel );
export const deleteItem = DELETE<Items>( itemModel );
export const updateItem = PUT<Items>( itemModel );