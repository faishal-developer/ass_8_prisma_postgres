import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { bookSearchableFields } from './books.constant';
import { IBookFilterableFields, IOptions } from './books.interface';

const createBooks = async (data: Book) => {
  console.log({
    ...data,
    publicationDate: new Date(data.publicationDate),
  });
  const result = await prisma.book.create({
    data: {
      ...data,
      publicationDate: new Date(data.publicationDate),
    },
  });

  return result;
};

const getBooks = async (filters: IBookFilterableFields, options: IOptions) => {
  options.limit = options?.size || 10;
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (key === 'minPrice') {
          return {
            price: {
              gte: Number(filterData[key]),
            },
          };
        } else if (key === 'maxPrice') {
          return {
            price: {
              lte: Number(filterData[key]),
            },
          };
        } else {
          return {
            [key]: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });
  console.log(whereConditions['AND']);

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBooksByCategory = async (catId: string) => {
  const result = await prisma.book.findMany({
    where: {
      categoryId: catId,
    },
  });

  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleBook = async (
  id: string,
  data: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleBook = async (id: string) => {
  await prisma.book.delete({
    where: {
      id,
    },
  });

  return {};
};

export const bookService = {
  getBooks,
  createBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getBooksByCategory,
};
