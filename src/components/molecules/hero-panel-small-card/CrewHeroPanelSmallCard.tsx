'use client';
import React from 'react';
import {useTheme, Stack} from '@mui/material';
import { CrewButton, CrewTypography } from '../../atoms';
import'./CrewHeroPanelSmallCard.scss';

interface CrewHeroPanelSmallCardProps {
  className?: string;
  titleText: string;
  buttonText: string;
  buttonAction?: () => void;
}

const CrewHeroPanelSmallCard: React.FC<CrewHeroPanelSmallCardProps> = ({
  className,
  titleText,
  buttonText,
  buttonAction,
}) => {
  return (
    <Stack className={`card ${className}`} >
    <CrewTypography className={`title`} >
      {titleText}
    </CrewTypography>
    <CrewButton
      className={`button`}
      variant="contained"
      
      onClick={buttonAction}
    >
      {buttonText}
    </CrewButton>
  </Stack>
  );
};

export default CrewHeroPanelSmallCard;



