import { ContainerProps } from '@mui/material';

export interface CrewContainerProps extends ContainerProps {
  disableGutters?: boolean;
  fixed?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}
