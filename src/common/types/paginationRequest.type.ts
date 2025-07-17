export interface PaginationRequest {
    pageNumber : number;
    pageSize : number;
    searchText? : string;
    columnNumber? : number;
    order? : string;
}

export const defaultPaginationRequest : PaginationRequest = {
    pageNumber : 1,
    pageSize : 2147483647,
};