import Categories from "../../categories/interfaces/categoriesInterface";

export default interface SubCategory extends Document{
  name: string;
  image: string;
  category: Categories;
};

