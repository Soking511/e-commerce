import { Router } from 'express';
import { getAllProducts, createProduct, getProductByID, deleteProduct, updateProduct, getAllProductsFromSubcategory, resizeProductImages, uploadProductImages } from './productController';
import { deleteProductValidator, updateProductValidator, createProductValidator, getProductsByIDValidator } from '../../utils/validators/productsValidator';

const productRoute: Router = Router( );

productRoute.route( '/' )
  .get( getAllProducts )
  .post( uploadProductImages, resizeProductImages, createProductValidator, createProduct );

  productRoute.route( '/:id' )
  .get( getProductsByIDValidator, getProductByID )
  .delete( deleteProductValidator, deleteProduct )
  .put( updateProductValidator, updateProduct );

  productRoute.route( '/product/:id' )
  .get( getAllProductsFromSubcategory )

  export default productRoute;