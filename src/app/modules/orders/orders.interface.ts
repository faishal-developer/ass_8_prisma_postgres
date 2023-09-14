export type order_N_OrderedBooks = {
  status: string;
  userId: string;
  orderedBooks: {
    quantity: number;
    bookId: string;
  }[];
};
