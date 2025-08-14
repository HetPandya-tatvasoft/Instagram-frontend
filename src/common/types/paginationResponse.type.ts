export interface IPaginationResponse<T> {
    records : T[];
    totalPage : number;
    currentPage : number;
    pageSize : number;
    columnNumber? : number;
    order? : string;
    totalRecords : number;
}