import { Router } from 'express';
import { getAllProducts, createProduct, getProductByID, deleteProduct, updateProduct, resizeProductImages, uploadProductImages } from './productController';
import { deleteProductValidator, updateProductValidator, createProductValidator, getProductsByIDValidator } from '../../utils/validators/productsValidator';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
import reviewsRoute from '../reviews/reviewsRoute';

const productRoute: Router = Router( );

productRoute.use( '/:productId/reviews', reviewsRoute )

productRoute.route( '/' )
  .get( getAllProducts )
  .post(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );

productRoute.route( '/:id' )
  .get(
    getProductsByIDValidator,
    getProductByID
  )
  .delete(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    deleteProductValidator,
    deleteProduct
  )
  .put(
    isActive,
    isHaveAccess('admin', 'manager'),
    protectRoutes,
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  );

  export default productRoute;