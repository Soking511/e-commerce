
import couponsModel from "./couponsModel";
import {POST, getOne, PUT, DELETE, getAll } from "../httpMethods";
import { Coupons } from "./couponsInterface";

export const getAllCoupons = getAll<Coupons>(couponsModel, 'coupons');
export const createCoupon = POST<Coupons>(couponsModel);
export const getCoupon = getOne<Coupons>(couponsModel);
export const updateCoupon = PUT<Coupons>(couponsModel)
export const deleteCoupon = DELETE<Coupons>(couponsModel)
