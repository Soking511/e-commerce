import { Router } from 'express';
import { addProductToWishlist, getUserWishlist, deleteProductFromWishlist } from './wishlistController';
import { addProductToWishListValidator, removeProductToWishListValidator } from '../../utils/validators/wishlistValidator';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';

const wishlistRoute: Router = Router()
wishlistRoute.use(protectRoutes, isActive, isHaveAccess('user'))
wishlistRoute.route('/')
  .get(getUserWishlist)
  .post(
    addProductToWishListValidator,
    addProductToWishlist
  )

wishlistRoute.route('/:productId')
  .delete(
    removeProductToWishListValidator,
    deleteProductFromWishlist
  );

export default wishlistRoute;