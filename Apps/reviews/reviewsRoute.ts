import { Router } from 'express';
import { isActive, isHaveAccess, protectRoutes } from '../auth/authController';
import { createReviewValidator, getReviewValidator, updateReviewValidator, deleteReviewValidator } from '../../utils/validators/reviewsValidator';
import { filterReviews, getAllReviews, setProductAndUserId, createReview, getReview, updateReview, deleteReview } from './reviewsController';

const reviewsRoute: Router = Router({ mergeParams: true })
reviewsRoute.route('/')
  .get(filterReviews , getAllReviews)
  .post(protectRoutes, isActive, isHaveAccess('user'), setProductAndUserId, createReviewValidator, createReview);

reviewsRoute.get('/me', protectRoutes, isActive, isHaveAccess('user'), filterReviews, getAllReviews)
// reviewsRoute.put('/me/:reviewID', protectRoutes, isActive, isHaveAccess('user'), updateReviewValidator, updateRevi)

reviewsRoute.route('/:id')
  .get(getReviewValidator, getReview)
  .put(protectRoutes, isActive, isHaveAccess('user'), updateReviewValidator, updateReview)
  .delete(protectRoutes, isActive, deleteReviewValidator, deleteReview)

export default reviewsRoute;