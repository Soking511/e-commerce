import { RequestHandler } from 'express';
import { check } from 'express-validator';
import { Model } from 'mongoose';
import validatorMiddleware from '../../middlewares/validatorMiddleware';

export const deleteChildValidator = (childModel: Model<any>, parentField: string): RequestHandler[] => [
  check('id')
    .isMongoId()
    .withMessage('Invalid Mongo ID')
    .custom(async (val: string) => {
      const childDocs = await childModel.find({ [parentField]: val });
      if (childDocs.length > 0) {
        const bulkOption = childDocs.map((doc: any) => ({
          deleteOne: { filter: { _id: doc._id } }
        }));
        await childModel.bulkWrite(bulkOption);
      }
    }),
  validatorMiddleware
];

