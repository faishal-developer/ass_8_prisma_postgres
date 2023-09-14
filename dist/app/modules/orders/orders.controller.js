"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const orders_service_1 = require("./orders.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield orders_service_1.orderService.createOrder(Object.assign({ userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id }, req.body));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'OK',
        data: result,
    });
}));
const getorders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const result = yield orders_service_1.orderService.getorders();
    if (result[0].userId !== ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id) &&
        ((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role) != user_1.ENUM_USER_ROLE.ADMIN) {
        throw new ApiError_1.default(404, 'Forbidden');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'OK',
        data: result,
    });
}));
const getSingleOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const id = req.params.id;
    const result = yield orders_service_1.orderService.getSingleorder(id);
    if ((result === null || result === void 0 ? void 0 : result.userId) !== ((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.id) &&
        ((_e = req === null || req === void 0 ? void 0 : req.user) === null || _e === void 0 ? void 0 : _e.role) != user_1.ENUM_USER_ROLE.ADMIN) {
        throw new ApiError_1.default(404, 'Forbidden');
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'OK',
        data: result,
    });
}));
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
exports.ordersController = {
    createOrder,
    getorders,
    getSingleOrders,
};
