'use client';
import { CrewPaperProps } from '@/types/CrewPaperProps';
import Paper from '@mui/material/Paper';
import './CrewPaper.scss';
import { useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

const CrewPaper = ({ variant, className = '', ...props }: CrewPaperProps) => {
  const theme = useTheme();

  return (
    <Paper className={`crewPaper ${getThemeModeClass(theme.palette.mode)} $${className}`} {...props}>
      {props.children}
    </Paper>
  );
};
export default CrewPaper;
