export interface IHighlight {
  highlightId: number;
  title: string;
};

export interface AddToHighlightsModalProps {
  open: boolean;
  onClose: () => void;
  storyId: number;
}
