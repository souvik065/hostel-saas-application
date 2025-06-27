'use client';
import React from 'react';
import { useTheme } from '@mui/material';
import { CrewPageHeadProps } from '@/types/CrewPageHeadProps';
import './CrewPageHead.scss';
import CrewTypography from '../typography/CrewTypography';

const CrewPageHead = ({ text, variant }: CrewPageHeadProps) => {
  const theme = useTheme();

  return (
    <div className={`page-head-container ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <CrewTypography className="page-head-label" fontWeight="bold" variant={variant}>
        {text}
      </CrewTypography>
    </div>
  );
};

export default CrewPageHead;
