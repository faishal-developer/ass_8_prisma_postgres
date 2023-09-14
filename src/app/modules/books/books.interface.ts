export type IBookFilterableFields = {
  id?: string;
  title?: string;
  author?: string;
  genre?: string;
  searchTerm?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type IBookSearchableFields = {
  title?: string;
  author?: string;
  genre?: string;
};

export type IOptions = {
  page?: number;
  size?: number;
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
};
