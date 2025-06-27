import React from 'react';
import { Box, useTheme } from '@mui/material';
import './CrewBox.scss'; 
import { CrewBoxProps } from '@/types/CrewBoxProps';

const CrewBox = ({...props }: CrewBoxProps) => {
  const theme = useTheme();
  return (
    <div className={`crew-box-container`}>
      <Box {...props} className = {`crew-box-control ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`} >{props.children}</Box>
    </div>
  );
};

export default CrewBox;
