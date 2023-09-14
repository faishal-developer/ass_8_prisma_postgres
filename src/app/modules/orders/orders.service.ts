import { Order } from '@prisma/client';
// import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { order_N_OrderedBooks } from './orders.interface';

const createOrder = async (data: order_N_OrderedBooks) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any;
  await prisma.$transaction(async tx => {
    result = await tx.order.create({
      data: {
        userId: data.userId,
        status: 'pending',
      },
    });
    const books = [];

    for (let index = 0; index < data.orderedBooks.length; index++) {
      const res = await tx.orderedBooks.create({
        data: {
          orderId: result.id,
          bookId: data.orderedBooks[index].bookId,
          quantity: data.orderedBooks[index].quantity,
        },
      });
      books.push(res);
    }
    // console.log(books);
    result.orderedBooks = books;
  });

  return result;
};

const getorders = async () => {
  const result = await prisma.order.findMany({
    include: {
      OrderedBooks: true,
    },
  });
  // if(result.order.userId!==userId || )

  return result;
};

const getSingleorder = async (id: string) => {
  const result: Order | null = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      OrderedBooks: true,
    },
  });

  return result;
};

export const orderService = {
  createOrder,
  getorders,
  getSingleorder,
};
