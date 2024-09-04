import Categories from "../Apps/categories/categoriesInterface";

export default interface SubCategory extends Document{
  name: string;
  image: string;
  category: Categories;
};

