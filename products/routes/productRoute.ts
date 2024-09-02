import { Router } from 'express';
import { getAllProducts, createProduct, getProductByID, deleteProduct, updateProduct, getAllProductsFromSubcategory } from '../controllers/productController';
const productRoute: Router = Router( );

productRoute.route( '/' )
  .get( getAllProducts )
  .post( createProduct );

  productRoute.route( '/:id' )
  .get( getProductByID )
  .delete( deleteProduct )
  .put( updateProduct );

  productRoute.route( '/subcategory/:id' )
  .get( getAllProductsFromSubcategory )

  export default productRoute;