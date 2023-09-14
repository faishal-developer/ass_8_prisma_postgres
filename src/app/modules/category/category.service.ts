import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategories = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({ data });

  return result;
};

const getCategories = async () => {
  const result = await prisma.category.findMany({});

  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = prisma.category.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateSingleCategory = async (
  id: string,
  data: Partial<Category>
): Promise<Category | null> => {
  const result = prisma.category.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  const result = prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryService = {
  getCategories,
  createCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
