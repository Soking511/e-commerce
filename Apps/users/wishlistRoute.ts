import { Router } from 'express';
import { addProductToWishList, getWishList, removeProductToWishList } from './wishlistController';
import { addProductToWishListValidator, removeProductToWishListValidator } from '../../utils/validators/wishlistValidator';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';

const wishlistRoute: Router = Router()
wishlistRoute.use(protectRoutes, isActive, isHaveAccess('user'))
wishlistRoute.route('/')
  .get(getWishList)
  .post(
    addProductToWishListValidator,
    addProductToWishList
  )

wishlistRoute.route('/:productId')
  .delete(
    removeProductToWishListValidator,
    removeProductToWishList
  );

export default wishlistRoute;