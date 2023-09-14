import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookController } from './books.controller';
import { BookZodSchema } from './books.zod';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookZodSchema.create),
  bookController.createbooks
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookZodSchema.update),
  bookController.updateSingleBook
);

router.get('/:catId/category', bookController.getBooksByCategory);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  bookController.deleteSingleBook
);
router.get('/:id', bookController.getSingleBook);
router.get('/', bookController.getbooks);

export const bookRoutes = router;
