// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
    isSuccess: boolean;
    statusCode: number;
    message: string;
    data: T;
    errorCode?: string;
}