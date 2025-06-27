export interface EntriesPerPageSelectorProps {
  onChange: (value: number) => void;
  pageSize: number;
  spacing?: number;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  labelVariant?:
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
}
