import { Request, Response, NextFunction } from 'express';
import { CustomErrors } from '../Apps/moreInterfaces/customErrors';

const globalErrors = (err:CustomErrors, req:Request, res:Response, next:NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Server Error!!!";
    res.status( err.statusCode ).json({
      err,
      message:err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export default globalErrors;