import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import usersModel from "../../Apps/users/userModel";

const passwordValidator = (field: string = 'password') => {
  return check(field)
    .notEmpty().withMessage(`${field} is required`)
    .isLength({ min: 6, max: 20 }).withMessage(`${field} length must be between 6 and 20 characters`)
    .matches('[0-9]').withMessage(`${field} must contain a number`)
    .matches('[A-Z]').withMessage(`${field} must contain an uppercase letter`)
    .matches('[a-z]').withMessage(`${field} must contain a lowercase letter`);
};

const confirmPasswordValidator = (passwordField: string, confirmField: string) => {
  return passwordValidator(passwordField), check(confirmField)
    .notEmpty().withMessage(`${confirmField} is required`)
    .custom((confirmVal: string, { req }) => {
      if (confirmVal !== req.body[passwordField]) {
        throw new Error(`${confirmField} does not match ${passwordField}`);
      }
      return true;
    });
};

export const registerValidator: RequestHandler[] = [
  check('name')
    .notEmpty().withMessage('User name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50 characters'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .normalizeEmail().isEmail().withMessage('Invalid email format')
    .custom(async (val: string) => {
      const user = await usersModel.findOne({ email: val });
      if (user) throw new Error('Email already exists');
      return true;
    }),

  check('role').optional().custom((val: string, { req }) => {
    req.body.role = 'user'; // Default role
    return true;
  }),

  passwordValidator('password'),
  confirmPasswordValidator('password', 'confirmPassword'),

  validatorMiddleware
];

// Login Validator
export const loginValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  passwordValidator('password'),
  validatorMiddleware
];

// Forget Password Validator
export const forgetPasswordValidator: RequestHandler[] = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .normalizeEmail().isEmail().withMessage('Invalid email format'),
  validatorMiddleware
];

// Reset Password Validator
export const resetPasswordValidator: RequestHandler[] = [
  passwordValidator('password'),
  confirmPasswordValidator('password', 'confirmPassword'),
  validatorMiddleware
];
