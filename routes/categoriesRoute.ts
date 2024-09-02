import { Router } from 'express';
import { getAllCategories } from '../controllers/categories';
const categoriesRoute:Router = Router( );

// categoriesRoute.get( '/', getAllCategories);

categoriesRoute.route( '/' )
  .get( getAllCategories );

export default categoriesRoute;