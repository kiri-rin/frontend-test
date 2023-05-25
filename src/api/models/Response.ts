export type PaginatedResponse<T> = {
  total: number;
  per_page: number;
  page: number;
  limit: number;
  offset: number;
  items: T[];
};
