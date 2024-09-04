import Categories from "./categoriesInterface";
import categoriesModel from "./categoriesModel";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";

export const getAllCategories = getAll<Categories>( categoriesModel, 'category' );
export const getCategoryByID = getOne<Categories>( categoriesModel );
export const createCategory = POST<Categories>( categoriesModel );
export const deleteCategory = DELETE<Categories>( categoriesModel  );
export const updateCategory = PUT<Categories>( categoriesModel );
