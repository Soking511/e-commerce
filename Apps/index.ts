import { Application, NextFunction, Request, Response } from "express"
import categoriesRoute from "./categories/categoriesRoute"
import subcategoryRoute from "./subcategory/subcategoryRoute"
import productsRoute from "./products/productRoute"
import globalErrors from "../middlewares/globalErrors"
import APIErrors from '../utils/apiErrors';
import usersRoute from "./users/userRoute"
import authRoute from "./auth/authRoute"
import addressRoute from "./address/addressRoute"
import reviewsRoute from "./reviews/reviewsRoute"
import cartRoute from "./cart/cartRoute"
import ordersRoute from "./order/orderRoute"
import { Users } from "../Apps/users/userInterface";
import { FilterData } from "../Apps/moreInterfaces/filterData";
import express from 'express';
import wishlistRoute from "./users/wishlistRoute"
import couponsRoute from "./coupons/couponsRoute"

declare module 'express'{
  interface Request{
    filterData?: FilterData;
    files?:any;
    file?:any;
    user?:Users;
  }
}

const mountRoutes = (app: Application) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.cookie('cookies', req.csrfToken());
    next();
  });
  app.use('/api/v1/categories', categoriesRoute );
  app.use('/api/v1/subcategory', subcategoryRoute );
  app.use('/api/v1/products', productsRoute );
  app.use('/api/v1/users', usersRoute)
  app.use('/api/v1/auth', authRoute)
  app.use('/api/v1/address', addressRoute)
  app.use('/api/v1/reviews', reviewsRoute)
  app.use('/api/v1/carts', cartRoute)
  app.use('/api/v1/coupons', couponsRoute)
  app.use('/api/v1/wishlist', wishlistRoute);
  app.use('/api/v1/orders', ordersRoute)
  app.all( '*', (req:Request, res:Response, next:NextFunction) => {
    return next( new APIErrors( `This Route[${req.originalUrl}] not found !`, 400 ))
  } );

  app.use( globalErrors );

}


export default mountRoutes;