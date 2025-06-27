import React from 'react';
import { Stack, useTheme, Modal, Box } from '@mui/material';
import { CrewModalHeader } from '../../molecules';
import './CrewModal.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { CrewModalProps } from '../../../types/CrewModalProps';

const CrewModal = ({ open, onClose, children, title }: CrewModalProps) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className={`modal-box ${getThemeModeClass(theme.palette.mode)}`}>
        <Stack direction={'column'} spacing={3}>
          <CrewModalHeader title={title} labelVariant="h4" onClose={onClose} />
          {children}
        </Stack>
      </Box>
    </Modal>
  );
};

export default CrewModal;
