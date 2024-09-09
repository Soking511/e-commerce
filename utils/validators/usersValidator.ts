import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import usersModel from "../../Apps/users/userModel";

export const createUserValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('User Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
    .custom(async(valueName) => {
      const User = await usersModel.findOne( {name:valueName} );
      if (User) throw new Error( 'User is Already exist.' );
      return true;
    })
  , validatorMiddleware
]

export const getUserByIDValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const updateUserValidator:RequestHandler[] = [
  check( 'id' ).isMongoId().withMessage('Invalid Mongo ID'),
  check( 'name' ).optional().isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20')
  , validatorMiddleware
]

export const deleteUserValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const changeUserPasswordValidator:RequestHandler[] = [
  // 
]