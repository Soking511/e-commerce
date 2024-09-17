
import { Router } from 'express';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from '../../utils/validators/cartValidator';
import { getUserCart, addProductToCart, deleteUserCart, applyCoupon, updateProductQuantity, removeProductFromCart } from './cartController';

const cartRoute: Router = Router()
cartRoute.use(protectRoutes, isActive, isHaveAccess('user'))
cartRoute.route('/')
  .get(getUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(deleteUserCart);
  
cartRoute.put('/applyCoupon', applyCoupon)
cartRoute.route('/:itemId')
  .put(updateProductQuantityValidator, updateProductQuantity)
  .delete(removeProductFromCartValidator, removeProductFromCart);

export default cartRoute;
