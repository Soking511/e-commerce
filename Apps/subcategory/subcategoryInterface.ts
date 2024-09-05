import Categories from "../categories/categoriesInterface";;

export default interface SubCategory extends Document{
  populate: any;
  name: string;
  image: string;
  category: Categories;
  // childOF:any;
};

