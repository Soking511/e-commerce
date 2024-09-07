import { Router } from 'express';
import { getAllProducts, createProduct, getProductByID, deleteProduct, updateProduct, resizeProductImages, uploadProductImages } from './productController';
import { deleteProductValidator, updateProductValidator, createProductValidator, getProductsByIDValidator } from '../../utils/validators/productsValidator';

const productRoute: Router = Router( );

productRoute.route( '/' )
  .get( getAllProducts )
  .post( uploadProductImages, resizeProductImages, createProductValidator, createProduct );

productRoute.route( '/:id' )
  .get( getProductsByIDValidator, getProductByID )
  .delete( deleteProductValidator, deleteProduct )
  .put( uploadProductImages, resizeProductImages, updateProductValidator, updateProduct );

  export default productRoute;