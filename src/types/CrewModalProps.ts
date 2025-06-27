export interface CrewModalProps {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  title?: string;
}
export interface CrewModalFooterProps {
  onClose?: () => void;
  onSave?: () => void;
}
export interface CrewModalHeaderProps {
  title?: string;
  labelVariant:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
  onClose?: () => void;
}
