import { Router } from 'express';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
import { createCouponValidator, getCouponValidator, updateCouponValidator, deleteCouponValidator } from '../../utils/validators/couponsValidator';
import { getAllCoupons, createCoupon, getCoupon, updateCoupon, deleteCoupon } from './couponsController';

const couponsRoute: Router = Router()
couponsRoute.use(protectRoutes, isActive, isHaveAccess('manager', 'admin'))
couponsRoute.route('/')
  .get(getAllCoupons)
  .post(createCouponValidator, createCoupon);

couponsRoute.route('/:id')
  .get(getCouponValidator, getCoupon)
  .put(updateCouponValidator, updateCoupon)
  .delete(deleteCouponValidator, deleteCoupon);

export default couponsRoute;