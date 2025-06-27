import { Alert, AlertTitle, Box, IconButton, Snackbar } from '@mui/material';
import React from 'react';
import './CrewAlert.scss';
import { CrewAlertProps } from '@/types/CrewAlertProps';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CrewIcon from '../icon/CrewIcon';

const CrewAlert = ({
  message,
  open,
  title,
  onClose,
  vertical,
  horizontal,
  severity,
  autoHideDuration,
}: CrewAlertProps) => {
  return (
    <Box className="crew-alert-box">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        onClose={onClose}
        autoHideDuration={autoHideDuration}
      >
        <Alert
          severity={severity}
          action={
            <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
              <CrewIcon icon={faClose} />
            </IconButton>
          }
          className="crew-alert-snackbar-alert"
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CrewAlert;
