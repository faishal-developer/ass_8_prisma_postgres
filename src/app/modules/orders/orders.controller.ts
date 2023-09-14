import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { orderService } from './orders.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.createOrder({
    userId: req?.user?.id,
    ...req.body,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getorders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.getorders();
  if (
    result[0].userId !== req?.user?.id &&
    req?.user?.role != ENUM_USER_ROLE.ADMIN
  ) {
    throw new ApiError(404, 'Forbidden');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

const getSingleOrders = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await orderService.getSingleorder(id);
  if (
    result?.userId !== req?.user?.id &&
    req?.user?.role != ENUM_USER_ROLE.ADMIN
  ) {
    throw new ApiError(404, 'Forbidden');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OK',
    data: result,
  });
});

// const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const data = req.body;
//   const result = await categoryService.updateSingleCategory(id, data);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'OK',
//     data: result,
//   });
// });

// const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id;
//   await categoryService.deleteSingleCategory(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Uers deleted successfully',
//     data: {},
//   });
// });

export const ordersController = {
  createOrder,
  getorders,
  getSingleOrders,
};
