export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: number;
};

export type QueryParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type PaginationResponse<T> = {
  items: T | null;
  extras: {
    current: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
};
