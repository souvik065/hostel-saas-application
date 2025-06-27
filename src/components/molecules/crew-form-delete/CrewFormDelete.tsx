import { CrewButton, CrewTypography } from '../../atoms';
import { Stack, useTheme } from '@mui/material';
import React from 'react';
import './CrewFormDelete.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface Props {
  onDelete: () => void;
  onClose: () => void;
}

const CrewFormDelete = ({ onDelete, onClose }: Props) => {
  const theme = useTheme();
  return (
    <Stack className={`delete-section-container ${getThemeModeClass(theme.palette.mode)}`} spacing={2}>
      <CrewTypography variant="caption">Do you really want to delete this data</CrewTypography>
      <Stack direction={'row'} spacing={2} className="content">
        <CrewButton variant="contained" onClick={onDelete}>
          Yes
        </CrewButton>
        <CrewButton variant="contained" onClick={onClose}>
          No
        </CrewButton>
      </Stack>
    </Stack>
  );
};

export default CrewFormDelete;
