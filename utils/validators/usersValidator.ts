import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import usersModel from "../../Apps/users/userModel";

export const createUserValidator:RequestHandler[] = [
  check( 'name' )
    .notEmpty( ).withMessage('User Name Required')
    .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20'),

  check( 'email' )
    .notEmpty().withMessage('Email Address is Required')
    .isEmail().withMessage('Invalid Email Address')
    .custom(async(valueName:string) => {
      const User = await usersModel.findOne( {email:valueName} );
      if (User) throw new Error( 'Email Address is Already Exist' );
      return true;
    }),

  check( 'password' )
    .notEmpty().withMessage('Password is Required')
    .isLength({min:6, max:20}).withMessage('Password Length Must Be Between 8 & 20')
    .custom(async (inputPassword:string, {req}) => {
      if ( inputPassword !== req.body.confirmPassword )
        throw new Error(`Password Doesn't Match!`);

      return true;
    }),

  check( 'confirmPassword')
    .notEmpty().withMessage('Confirm Password is Required')
    .isLength({min:6, max:20}).withMessage('Password Length Must Be Between 8 & 20'),

  check('phone').optional()
    .isMobilePhone(['ar-EG']).withMessage('Phone Number Must Be Egyptian Number')

  , validatorMiddleware
]

export const getUserByIDValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const updateUserValidator:RequestHandler[] = [
  check( 'id' ).isMongoId().withMessage('Invalid Mongo ID'),
  check( 'name' )
  .notEmpty( ).withMessage('User Name Required')
  .isLength({min:2, max:20}).withMessage('Name Length Must Be Between 2 > 20'),

  check('phone').optional()
    .isMobilePhone(['ar-EG']).withMessage('Phone Number Must Be Egyptian Number'),

  check('active').optional()
    .isBoolean().withMessage('Active Must Be Boolean ( true or false )')

  , validatorMiddleware
]

export const deleteUserValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID')
  , validatorMiddleware
]

export const changeUserPasswordValidator:RequestHandler[] = [
  check( 'id' )
    .isMongoId().withMessage('Invalid Mongo ID'),

  check( 'password' )
    .notEmpty().withMessage('Password is Required')
    .isLength({min:8, max:20}).withMessage('Password Length Must Be Between 8 & 20')
    .custom(async (inputPassword:string, {req}) => {
      if ( inputPassword !== req.body.confirmPassword )
        throw new Error(`Password Doesn't Match!`);

      return true;
    }),

  check( 'confirmPassword')
    .notEmpty().withMessage('Confirm Password is Required')
    .isLength({min:6, max:20}).withMessage('Password Length Must Be Between 8 & 20')
  , validatorMiddleware

]