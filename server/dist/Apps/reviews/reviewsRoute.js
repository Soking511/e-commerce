"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../auth/authController");
const reviewsValidator_1 = require("../../utils/validators/reviewsValidator");
const reviewsController_1 = require("./reviewsController");
const reviewsRoute = (0, express_1.Router)({ mergeParams: true });
reviewsRoute.route('/')
    .get(reviewsController_1.filterReviews, reviewsController_1.getAllReviews)
    .post(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'), reviewsController_1.setProductAndUserId, reviewsValidator_1.createReviewValidator, reviewsController_1.createReview);
reviewsRoute.get('/me', authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'), reviewsController_1.filterReviews, reviewsController_1.getAllReviews);
// reviewsRoute.put('/me/:reviewID', protectRoutes, isActive, isHaveAccess('user'), updateReviewValidator, updateRevi)
reviewsRoute.route('/:id')
    .get(reviewsValidator_1.getReviewValidator, reviewsController_1.getReview)
    .put(authController_1.protectRoutes, authController_1.isActive, (0, authController_1.isHaveAccess)('user'), reviewsValidator_1.updateReviewValidator, reviewsController_1.updateReview)
    .delete(authController_1.protectRoutes, authController_1.isActive, reviewsValidator_1.deleteReviewValidator, reviewsController_1.deleteReview);
exports.default = reviewsRoute;
