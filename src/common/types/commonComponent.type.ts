import { ButtonHTMLAttributes, ChangeEvent, FocusEvent } from "react";

export interface IHighlight {
  highlightId: number;
  title: string;
};

export interface IAddToHighlightsModalProps {
  open: boolean;
  onClose: () => void;
  storyId: number;
}

export interface IStoryOptionsMenuProps {
  isOwnProfile: boolean;
  onSave: () => void;
  onAddToHighlights: () => void;
  onDelete: () => void;
  fromHighligts: boolean;
  handleRemoveStoryFromHighlights? : () => void;
}

export interface ICreateStoryFields {
  caption?: string;
  isVisibleToClosedOnes: boolean;
}

export interface IFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  loaderColor?: string;
}

export interface IFormikInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  helperText?: string;
}

export interface FormikTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: boolean;
  helperText: string | false | undefined;
  shrinkLabel?: boolean;
}

export interface ISearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}