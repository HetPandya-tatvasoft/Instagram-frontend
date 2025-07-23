import type { PaginationRequestGeneric } from "../../../common/types/paginationRequest.type";

export interface addCommentPayload {
    commentId : number,
    postId : number,
    commentedByUserId : number,
    content : string,
}

export interface PostRequestPayload {
    userId : number;
}

