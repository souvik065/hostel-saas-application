import { CrewIcon, CrewTypography } from '../../atoms';
import { Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import './CrewModalHeader.scss';
import { CrewModalHeaderProps } from '../../../types/CrewModalProps';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

const CrewModalHeader = ({ title, labelVariant, onClose }: CrewModalHeaderProps) => {
  const theme = useTheme();
  return (
    <Stack
      direction={'row'}
      className={`modal-head-container ${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}
    >
      <div className="title-container">
        <div className="content ">
          <CrewTypography fontWeight="bold" variant={labelVariant}>
            {title}
          </CrewTypography>
          <Divider className="divider" />
        </div>
      </div>
      <div onClick={onClose}>
        <CrewIcon className="close-icon" icon={faXmarkCircle} />
      </div>
    </Stack>
  );
};

export default CrewModalHeader;
