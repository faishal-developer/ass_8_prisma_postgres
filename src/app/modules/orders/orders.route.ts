import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ordersController } from './orders.controller';
import { ordersZodSchema } from './orders.zod';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.Customer),
  validateRequest(ordersZodSchema.create),
  ordersController.createOrder
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.Customer),
  ordersController.getSingleOrders
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.Customer),
  ordersController.getorders
);

export const orderRoutes = router;
