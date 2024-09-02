import Categories from "../categories/categoriesInterface";

export default interface SubCategory extends Document{
  name: string;
  image: string;
  category: Categories;
};

