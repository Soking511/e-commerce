import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, changeUserPassword, resizeUserImage, uploadUserImage, getUserByID } from './userController';
import { createUserValidator, updateUserValidator, deleteUserValidator, changeUserPasswordValidator, getUserByIDValidator } from '../../utils/validators/usersValidator';
// import { } from '../controllers/userController'

const usersRoute: Router = Router()
usersRoute.route('/')
  .get(getAllUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRoute.route('/:id')
  .get(getUserByIDValidator, getUserByID)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

usersRoute.put('/:id/changePassword', changeUserPasswordValidator, changeUserPassword)

export default usersRoute;