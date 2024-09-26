import { RequestHandler } from "express";
import { check } from "express-validator";
import fs from 'fs';
import path from 'path';
import validatorMiddleware from "../../middlewares/validatorMiddleware";

export const addAddressValidator: RequestHandler[] = [
  check('address').notEmpty().withMessage('address required'),
  validatorMiddleware
];

export const removeAddressValidator: RequestHandler[] = [
  check('addressId').isMongoId().withMessage('invalid address id'),
  validatorMiddleware
];


export const updateAddressValidator: RequestHandler[] = [
  check('addressId').isMongoId().withMessage('invalid address id'),
  check('street').optional().isLength({ min: 2, max: 10 }),

  check('city').optional()
    .isLength({ min: 2, max: 10 }).withMessage('Invalid Length, must be between 2 & 10'),

  check('state').optional()
    .isLength({ min: 2, max: 10 }).withMessage('Invalid Length, must be between 2 & 10'),

  validatorMiddleware
];
