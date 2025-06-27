import { InputHTMLAttributes } from 'react';
import { Stack } from '@mui/material';

export interface CrewRadioButtonProps {
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  classes?: Record<string, string>;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string;
  defaultChecked?: boolean;
  disabled?: boolean;
  disableRipple?: boolean;
  icon?: React.ReactNode;
  id?: string;
  indeterminate?: boolean;
  indeterminateIcon?: React.ReactNode;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  size?: 'medium' | 'small' | string;
  value?: any;
  label?: string;
  defaultvalue?: string;
}

export interface RadioElementProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  disabled?: boolean;
}

export interface RadioOption {
  label: string;
  name?: string;
  disabled?: boolean;
}

export interface RadioOptionGroup {
  label: string;
  options: RadioOption[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
  error?: boolean;
  errorMessage?: string;
  selectedValue: string;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}
