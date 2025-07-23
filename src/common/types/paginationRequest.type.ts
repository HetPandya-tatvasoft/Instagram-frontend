export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  columnNumber?: number;
  order?: string;
}
export interface PaginationRequestGeneric<T> {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  columnNumber?: number;
  order?: string;
  requestModel: T;
}

export const defaultPaginationRequest: PaginationRequest = {
  pageNumber: 1,
  pageSize: 2147483647,
};

export const defaultPageNumberInfinite = 1;

export const defaultPageSizeInfinite = 2147483647;
