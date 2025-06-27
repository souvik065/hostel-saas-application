import { Stack } from '@mui/material';
import React from 'react';
import CrewTypography from '../typography/CrewTypography';
import { CrewImage } from '..';
import google from '../../../assets/images/google.svg';
import './GoogleSingInContent.scss';
import { signIn } from 'next-auth/react';

interface Props {
  labelVariant:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
}

const GoogleSingInContent = ({ labelVariant }: Props) => {
  return (
    <Stack className='google-section' component={'section'} direction={'row'} spacing={1}>
      <CrewTypography variant={labelVariant}>Sign in to your</CrewTypography>
      <Stack component={'span'} onClick={() => signIn('google')}>
        <CrewImage className="google-image" source={google} description="google-logo" />
      </Stack>
      <CrewTypography variant={labelVariant}>Google Account</CrewTypography>
    </Stack>
  );
};

export default GoogleSingInContent;
