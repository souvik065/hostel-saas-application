'use client';
import React from 'react';
import { Grid, Stack, useTheme } from '@mui/material';
import { CrewPageHeadProps } from '@/types/CrewPageHeadProps';
import { CrewTypographyWithIcon } from '../../atoms';
import './CrewPageHeadWithIcon.scss';


const CrewPageHeadWithIcon = ({ text, variant, icon, iconPlacementPosition }: CrewPageHeadProps) => {
  const theme = useTheme();
  
  return (
    <div className={`page-head-container-with-icon ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Stack>
        <Grid container>
          <CrewTypographyWithIcon
            className="page-head-label"
            fontWeight="bold"
            variant={variant}
            icon={icon}
            iconPlacementPosition={iconPlacementPosition}
          >
            {text}
          </CrewTypographyWithIcon>
        </Grid>
        <Grid>
          <hr className="divider" />
        </Grid>
      </Stack>
    </div>
  );
};

export default CrewPageHeadWithIcon;
