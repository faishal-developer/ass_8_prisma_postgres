import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { categoryController } from './category.controller';
import { categoryZodSchema } from './category.zod';

const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(categoryZodSchema.create),
  categoryController.createCategories
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(categoryZodSchema.update),
  categoryController.updateSingleCategory
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteSingleCategory
);
router.get('/:id', categoryController.getSingleCategory);
router.get('/', categoryController.getCategories);

export const categoryRoutes = router;
