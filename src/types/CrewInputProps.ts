import { InputBaseProps } from '@mui/material';

export interface CrewInputProps extends InputBaseProps {
  radius?: number;
  sx?: Record<string, any>;
  autoComplete?: string;
  autoFocus?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  id?: string;
  label?: string;
  inputProps?: Record<string, any>;
  inputRef?: React.Ref<any>;
  maxRows?: number | string;
  minRows?: number | string;
  multiline?: boolean;
  name?: string;
  className?: string;
  /**
   * Optional onChange handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: any;
  height?: number; // Custom height
  width?: number; // Custom width,
  startIcon?: React.ReactNode; // Icon element for the start adornment
  endIcon?: React.ReactNode; // Icon element for the end adornment
  onEndIconClick?: () => void;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
  /**
   * Label variant to be used.
   */
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
  increasedHeight?: boolean;
}
