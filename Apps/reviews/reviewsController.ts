import { NextFunction, Request, Response } from "express";
import { DELETE, getAll, getOne, POST, PUT } from "../httpMethods";
import { FilterData } from "../moreInterfaces/filterData";
import { Reviews } from "./reviewsInterface";
import reviewsModel from "./reviewsModel";


export const filterReviews = (typeSearch:string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.productId && typeSearch == 'reviews') { filterData.product = req.params.productId };
    if (req.user?.role==='user' && !req.params.productId ) { filterData.user = req.user._id };
    next();
  };
}

export const setProductAndUserId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.user) { req.body.user = req.user?._id };
  if (!req.body.product) { req.body.product = req.params.productId };
  next();
}

export const getAllReviews = getAll<Reviews>(reviewsModel, 'reviews');
export const createReview = POST<Reviews>(reviewsModel);
export const getReview = getOne<Reviews>(reviewsModel);
export const updateReview = PUT<Reviews>(reviewsModel)
export const deleteReview = DELETE<Reviews>(reviewsModel)