import { Router } from "express";
import { isActive, isHaveAccess, protectRoutes } from "../auth/authController";
import { createOrderValidator, getOrderValidator } from "../../utils/validators/orderValidator";
import { filterOrders, getAllOrders, createCashOrder, getOrder, payOrder, deliverOrder } from "./orderController";

const ordersRoute: Router = Router();
ordersRoute.use(protectRoutes, isActive)

ordersRoute.route('/')
  .get(filterOrders, getAllOrders)
  .post(isHaveAccess('user'), createOrderValidator, createCashOrder);

ordersRoute.route('/:id').get(getOrderValidator, getOrder)

ordersRoute.use(isHaveAccess('manager', 'admin'))
ordersRoute.route('/:id/paid').put(getOrderValidator, payOrder)
ordersRoute.route('/:id/delivered').put(getOrderValidator, deliverOrder)

export default ordersRoute;