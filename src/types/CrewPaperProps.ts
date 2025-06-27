import { PaperProps } from '@mui/material';

export interface CrewPaperProps extends PaperProps {
  radius?: number;
  variant?: 'elevation' | 'outlined';
  sx?: Record<string, any>;
  className?: string;
}
