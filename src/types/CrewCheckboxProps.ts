export interface CrewCheckboxProps {
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
  sx?: Record<string, any>;
  value?: any;
  label?: string;
}
