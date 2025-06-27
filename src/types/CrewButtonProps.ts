import { ButtonBaseProps } from '@mui/material';
import { ReactNode } from 'react';

export interface CrewButtonProps extends ButtonBaseProps {
  radius?: number;
  variant?: 'contained' | 'outlined' | 'text' | 'logoutContained' | 'switchContained' | 'primary' | 'transparent';
  size?: 'small' | 'medium' | 'large'|'fullwidth';
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  color?: string;
  sx?: Record<string, any>;
  loading?: boolean;
  stylebutton?:boolean;
}

