import { z } from 'zod';

const orderBookSchema = z.object({
  bookId: z.string({
    required_error: 'book Id is required',
  }),
  quantity: z.number({
    required_error: 'quantity is required',
  }),
});

const create = z.object({
  body: z.object({
    orderedBooks: z.array(orderBookSchema),
  }),
});

export const ordersZodSchema = {
  create,
};
