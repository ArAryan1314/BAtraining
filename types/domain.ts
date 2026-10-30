export type EntityStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
