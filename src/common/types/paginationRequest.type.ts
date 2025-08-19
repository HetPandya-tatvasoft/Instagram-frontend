export interface IPaginationRequest {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  columnNumber?: number;
  order?: string;
}
export interface IPaginationRequestGeneric<T> {
  pageNumber: number;
  pageSize: number;
  searchText?: string;
  columnNumber?: number;
  order?: string;
  requestModel: T;
}

export const defaultPaginationRequest: IPaginationRequest = {
  pageNumber: 1,
  pageSize: 2147483647,
};

export const defaultPageNumberInfinite = 1;

export const defaultPageSizeInfinite = 2147483647;