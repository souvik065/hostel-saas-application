
export interface CrewTextBoxProps {
    label: string;
    labelVariant:  | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
    error?:boolean;
    errorMessage?:string;
    rows?: number;
    placeholderText?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    className?: string; 
  }


