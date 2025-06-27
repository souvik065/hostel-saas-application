import { AlertProps } from '@mui/material/Alert';

export interface CrewAlertProps extends AlertProps {
  message?: string;
  title?: string;
  type?: string;
  open?: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  onClose?: () => void;
  autoHideDuration?: number;
}
