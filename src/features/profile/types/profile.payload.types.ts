export interface ICreateHighlightForm {
    title : string;
}

export interface IHighlightUpsertPayload {
    highlightId : number;
    userId : number;
    title : string;
    storyId : number;
    isDeleted : boolean;
}