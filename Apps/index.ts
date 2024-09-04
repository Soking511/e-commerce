import { Application, NextFunction, Request, Response } from "express"
import categoriesRoute from "./categories/categoriesRoute"
import subcategoryRoute from "./subcategory/subcategoryRoute"
import productsRoute from "./products/productRoute"
import globalErrors from "../middlewares/globalErrors"
import APIErrors from '../utils/apiErrors';

const mountRoutes = (app:Application) => {
  app.use('/api/v1/categories', categoriesRoute );
  app.use('/api/v1/subcategory', subcategoryRoute );
  app.use('/api/v1/products', productsRoute );
  app.all( '*', (req:Request, res:Response, next:NextFunction) => {
    return next( new APIErrors( `This Route[${req.originalUrl}] not found !`, 400 ))
  } );

  app.use( globalErrors );

}


export default mountRoutes;