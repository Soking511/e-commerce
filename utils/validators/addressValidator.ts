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

const filePath = path.resolve(__dirname, '../egyptCities.json');
const fileContent = fs.readFileSync(filePath, 'utf-8');
const jsonData = JSON.parse(fileContent);
const cities = jsonData.find((item: any) => item.type === 'table' && item.name === 'cities')?.data;

export const updateAddressValidator:RequestHandler[] = [
  check('addressId').isMongoId().withMessage('invalid address id'),
  check('street').optional()
    .isLength( {min:2, max:10} ),

  check('city').optional()
    .custom((cityName: string) => {
      const resultSearch = cities.find((city: any) => {
        return city.city_name_en === cityName || city.city_name_ar === cityName;
      });

      if (!resultSearch) {
        throw new Error(`${cityName} Not Found, try anthor city please!`);
      }

      return true;
    })
    .isLength( {min:2, max:10} ).withMessage('Invalid Length, must be between 2 & 10'),

  check('state').optional()
    .isLength( {min:2, max:10 } ).withMessage('Invalid Length, must be between 2 & 10')

  , validatorMiddleware
]