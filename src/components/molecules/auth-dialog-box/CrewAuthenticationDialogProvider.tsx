'use client';
import { Dialog, DialogActions, DialogTitle, useTheme } from '@mui/material';
import React from 'react';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import './CrewAuthenticationDialogProvider.scss';
import { CrewButton, CrewLink, CrewTypography } from '../../../components/atoms';

interface Prop {
  open: boolean;
  msg: string;
}

const CrewAuthenticationDialogProvider = ({ open, msg }: Prop) => {
  const theme = useTheme();

  return (
    <Dialog
      PaperProps={{ className: `${getThemeModeClass(theme.palette.mode)} dialog-wrap` }}
      fullWidth
      maxWidth={'xs'}
      open={open}
      onClose={() => {}}
      disableEscapeKeyDown={true}
    >
      <DialogTitle className="dialog-title">
        <CrewTypography variant="body1">{msg}</CrewTypography>
      </DialogTitle>
      <DialogActions className="dialog-content">
        <CrewButton variant={'contained'}>
          <CrewLink href="/login">
            <CrewTypography className={`link-${getThemeModeClass(theme.palette.mode)}`} variant="body1">
              Continue with login
            </CrewTypography>
          </CrewLink>
        </CrewButton>
      </DialogActions>
    </Dialog>
  );
};

export default CrewAuthenticationDialogProvider;
