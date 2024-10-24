"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getReview = exports.createReview = exports.getAllReviews = exports.setProductAndUserId = exports.filterReviews = void 0;
const httpMethods_1 = require("../httpMethods");
const reviewsModel_1 = __importDefault(require("./reviewsModel"));
const filterReviews = (req, res, next) => {
    var _a;
    let filterData = {};
    if (req.params.productId) {
        filterData.product = req.params.productId;
    }
    ;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === 'user' && !req.params.productId) {
        filterData.user = req.user._id;
    }
    ;
    req.filterData = filterData;
    next();
};
exports.filterReviews = filterReviews;
const setProductAndUserId = (req, res, next) => {
    var _a;
    if (!req.body.user) {
        req.body.user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    }
    ;
    if (!req.body.product) {
        req.body.product = req.params.productId;
    }
    ;
    next();
};
exports.setProductAndUserId = setProductAndUserId;
exports.getAllReviews = (0, httpMethods_1.getAll)(reviewsModel_1.default, 'reviews');
exports.createReview = (0, httpMethods_1.POST)(reviewsModel_1.default);
exports.getReview = (0, httpMethods_1.getOne)(reviewsModel_1.default);
exports.updateReview = (0, httpMethods_1.PUT)(reviewsModel_1.default);
exports.deleteReview = (0, httpMethods_1.DELETE)(reviewsModel_1.default);
