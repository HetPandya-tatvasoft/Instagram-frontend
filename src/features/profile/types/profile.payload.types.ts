export interface ICreateHighlightForm {
  title: string;
}

export interface IHighlightUpsertPayload {
  highlightId: number;
  userId: number;
  title: string;
  storyId: number;
  isDeleted: boolean;
}

export interface IUpdateHighlightPayload {
  highlightId: number;
  title: string;
}

export interface IRemoveStoryFromHighlightPayload {
  userId?: number;
  highlightId: number;
  storyId: number;
}
