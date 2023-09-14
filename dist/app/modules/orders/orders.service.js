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
exports.orderService = void 0;
// import ApiError from '../../../errors/ApiError';
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result;
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        result = yield tx.order.create({
            data: {
                userId: data.userId,
                status: 'pending',
            },
        });
        const books = [];
        for (let index = 0; index < data.orderedBooks.length; index++) {
            const res = yield tx.orderedBooks.create({
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
    }));
    return result;
});
const getorders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findMany({
        include: {
            OrderedBooks: true,
        },
    });
    // if(result.order.userId!==userId || )
    return result;
});
const getSingleorder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({
        where: {
            id,
        },
        include: {
            OrderedBooks: true,
        },
    });
    return result;
});
exports.orderService = {
    createOrder,
    getorders,
    getSingleorder,
};
