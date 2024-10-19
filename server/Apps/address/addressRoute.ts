import { Router } from 'express';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
import { getUserAddress, addAddress, deleteAddress, updateAddress } from './addressController';
import { addAddressValidator, removeAddressValidator, updateAddressValidator } from '../../utils/validators/addressValidator';

const addressRoute: Router = Router()
addressRoute.use(protectRoutes, isActive, isHaveAccess('user'))
addressRoute.route('/')
  .get(getUserAddress)
  .post(addAddressValidator, addAddress)

addressRoute.route('/:addressId')
  .delete(removeAddressValidator, deleteAddress)
  .put(
    updateAddressValidator,
    updateAddress
  );

export default addressRoute;