import { CrewTypography } from '../../atoms';
import { CrewTableModalProps } from '../../../types/CrewTable';
import { MenuItem, Popover, useTheme } from '@mui/material';
import React from 'react';
import './CrewTableModal.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

const CrewTableModal = ({
  open,
  onClose,
  onActionSelect,
  actions,
  anchorEl,
  labelVariant = 'subtitle2',
}: CrewTableModalProps) => {
  const handleActionClick = (action: string) => {
    onActionSelect?.(action);
    onClose();
  };
  const theme = useTheme();

  return (
    <Popover
      open={Boolean(open)}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        className: `crew-table-modal-paper ${getThemeModeClass(theme.palette.mode)}`,
      }}
      anchorEl={anchorEl}
    >
      {actions.map((action, index) => (
        <MenuItem key={index} onClick={() => handleActionClick(action.label)} className="table-modal-menu-item">
          <CrewTypography variant={labelVariant}>{action.label}</CrewTypography>
        </MenuItem>
      ))}
    </Popover>
  );
};

export default CrewTableModal;
