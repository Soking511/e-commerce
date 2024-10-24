"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoupon = exports.updateCoupon = exports.getCoupon = exports.createCoupon = exports.getAllCoupons = void 0;
const couponsModel_1 = __importDefault(require("./couponsModel"));
const httpMethods_1 = require("../httpMethods");
exports.getAllCoupons = (0, httpMethods_1.getAll)(couponsModel_1.default, 'coupons');
exports.createCoupon = (0, httpMethods_1.POST)(couponsModel_1.default);
exports.getCoupon = (0, httpMethods_1.getOne)(couponsModel_1.default);
exports.updateCoupon = (0, httpMethods_1.PUT)(couponsModel_1.default);
exports.deleteCoupon = (0, httpMethods_1.DELETE)(couponsModel_1.default);
