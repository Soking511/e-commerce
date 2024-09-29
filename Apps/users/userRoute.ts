import { Router } from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, changeUserPassword, resizeUserImage, uploadUserImage, getUserByID, changeLoggedUserPassword, setUserId, updateLoggedUser } from './userController';
import { createUserValidator, updateUserValidator, deleteUserValidator, changeUserPasswordValidator, getUserByIDValidator, changeLoggedUserPasswordValidator } from '../../utils/validators/usersValidator';
import {  isActive, isHaveAccess, protectRoutes } from '../auth/authController';

const usersRoute: Router = Router()

usersRoute.use(protectRoutes, isActive);
usersRoute.get('/me', setUserId, getUserByID)
usersRoute.put('/updateMe', updateLoggedUser, updateLoggedUser)
usersRoute.put('/changeMyPassword', changeLoggedUserPasswordValidator, changeLoggedUserPassword)
usersRoute.delete('/deleteMe', isHaveAccess('user'), deleteUserValidator, setUserId, deleteUser)

// usersRoute.use(isHaveAccess('manager'));
usersRoute.route('/')
  .get(getAllUsers)
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser);

usersRoute.route('/:id')
  .get(getUserByIDValidator, getUserByID)
  .put(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, isHaveAccess('user'), deleteUser);

usersRoute.put('/:id/changePassword', changeUserPasswordValidator, changeUserPassword)

export default usersRoute;