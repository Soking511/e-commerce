import { RequestHandler } from "express";
import { check } from "express-validator";

export const registerValidator: RequestHandler[] = [ // name, email, password, confirmPassword, phone
  check('name')
    .notEmpty().withMessage('Input Your Name')
    .isLength({min:2, max:15}).withMessage('Your Name Length Must Be Between 2 and 15 characters'),

  check('email')
    .notEmpty().withMessage('Email Address is Required')
    .isEmail().withMessage('Invalid Email Address'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:8, max:20}).withMessage('Password Length Must Be Between 8 & 20')
    .custom((inputPassword:string, {req}) => {
      if ( inputPassword !== req.body.confirmPassword )
        throw new Error(`Password Doesn't Match`);

      return true;
    }),

  check('confirmPassword')
    .notEmpty().withMessage('Confirm Password is Required')
    .isLength({min:8, max:20}).withMessage('Confirm Password Length Must Be Between 8 & 20'),

  check('phone').optional()
    .isMobilePhone(['ar-EG']).withMessage( 'Invalid Egyptian Phone Number')
]

export const loginValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage('Email Address is Required')
    .isEmail().withMessage('Invalid Email'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:8, max:20}).withMessage('Password Length Must Be Between 8 & 20')
]