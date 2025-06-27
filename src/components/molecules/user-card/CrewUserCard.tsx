'use client';
import React from 'react';
import { Avatar, Stack, useTheme } from '@mui/material';
import { textTrim } from '../../../utils/getFontValue';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import './CrewUserCard.scss';
import { CrewLogoutButton, CrewTypography } from '../../../components/atoms/index';

const CrewUserCard = ({
  email,
  image,
  name,
  displayEmail = false,
  onClick,
  labelVariant = 'caption',
  loading,
}: UserProps) => {
  const theme = useTheme();
  let userEmail: string = '';
  if (email) {
    userEmail = textTrim(email, 20);
  }

  return (
    <Stack className={`user-card ${getThemeModeClass(theme.palette.mode)}`}>
      <div className="card">
        <Stack className="user-detail" direction={'row'} spacing={1}>
          <Avatar src={image || ''} alt="userImage" />
          <Stack spacing={2} direction={'column'}>
            <CrewTypography variant={labelVariant}>{name}</CrewTypography>
            {displayEmail && <CrewTypography variant={labelVariant}>{userEmail}</CrewTypography>}
          </Stack>
        </Stack>
        <Stack className="user-card-button">
          {/* <CrewLogoutButton buttonVariant="logoutContained" loading={loading} handleLogoutClick={onClick} /> */}
        </Stack>
      </div>
    </Stack>
  );
};

export default CrewUserCard;
