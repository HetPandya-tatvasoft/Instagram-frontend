export interface PaginationResponse<T> {
    records : [];
    totalPage : number;
    currentPage : number;
    pageSize : number;
    columnNumber? : number;
    order? : string;
    totalRecords : number;
}