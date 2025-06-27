'use client';
import { Grid, Stack, useTheme } from '@mui/material';
import React from 'react';
import { CrewTableNameprops } from '@/types/CrewTableNameprops';
import './CrewTableName.scss';
import { CrewTypographyWithIcon } from '../../atoms';
import { CrewIconProps } from '@/types/CrewIconProps';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const icon: CrewIconProps = {
  icon: faEnvelope,
};

const CrewTableName = ({ tableName, fontWeight = 'bold', labelVariant = 'h6', ...props }: CrewTableNameprops) => {
  const theme = useTheme();
  return (
    <Stack className={`table-name-container ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <Grid container>
          <CrewTypographyWithIcon
            className={`table-name ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
            fontWeight={fontWeight}
            variant={labelVariant}
            icon={props.icon}
            iconPlacementPosition={props.iconPlacementPosition}
          >
            {tableName ?? ""}
          </CrewTypographyWithIcon>
        </Grid>
        <Grid>
          <hr className="divider" />
        </Grid>
    </Stack>
  );
};

export default CrewTableName;
