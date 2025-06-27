'use client';
import {
  CrewButton,
  CrewImage,
  CrewInputField,
  CrewIcon,
  CrewCheckBox,
  CrewTypography,
  CrewLink,
} from '@/components/atoms';
import React, { useState } from 'react';
import { Stack, useTheme, Grid } from '@mui/material';
import Dark from '../../../assets/images/logos/dark.png';
import Light from '../../../assets/images/logos/light.png';
import { getThemeModeClass } from '@/utils/ComponentHelper';
import './LoginFormSection.scss';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { signIn } from 'next-auth/react';

const LoginFormSection = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const forgotPasswordLinkText = () => {
    return {
      children: 'Forgot Password?',
      variant: 'caption',
    };
  };
  const privacyPolicyLinkText = () => {
    return {
      children: 'Privacy Policy',
    };
  };
  return (
    <section className={`login-main-container ${getThemeModeClass(theme.palette.mode)}`}>
      <section className={`container ${getThemeModeClass(theme.palette.mode)}`}>
        {/*Logo Section Start*/}
        <Stack component={'span'} alignItems={'center'}>
          <CrewImage
            className="krewbee-logo"
            source={theme.palette.mode === 'dark' ? Dark : Light}
            description="krewbee-logo"
          />
          <CrewTypography textAlign="center" fontWeight="normal" variant={'h3'} mt={1}>
            LOGIN
          </CrewTypography>
        </Stack>
        {/*Logog Section Start*/}

        <form onSubmit={(e) => handleSubmit(e)}>
          {/* Login-Form Section Start*/}
          <Stack spacing={3} className="form-container">
            <Stack spacing={2}>
              <CrewInputField
                type="text"
                labelVariant="caption"
                value={formData.email}
                onValueChange={(value: string) => setFormData({ ...formData, email: value })}
                placeholder="Enter your Email ID"
                disabled={false}
                increasedHeight={true}
              />
              <CrewInputField
                type={showPassword ? 'text' : 'password'}
                labelVariant="caption"
                value={formData.password}
                onValueChange={(value: string) => setFormData({ ...formData, password: value })}
                endIcon={
                  <Stack className="icon" component={'span'} onClick={() => setShowPassword(!showPassword)}>
                    <CrewIcon hasInheritedStyles icon={showPassword ? faEye : faEyeSlash} />
                  </Stack>
                }
                placeholder="Enter your Password"
                disabled={false}
                increasedHeight={true}
              />
            </Stack>

            {/* Forgot Section Start*/}
            <Grid className="forgot-section">
              <Grid item>
                <CrewCheckBox
                  id="rememberme"
                  checked={formData.rememberMe}
                  onChange={(value) => {
                    const updatedFormData = { ...formData, rememberMe: value };
                    setFormData(updatedFormData);
                  }}
                  labelName="Remember Me"
                  disabled={false}
                  CheckboxSize="small"
                  CheckboxFontsize="small"
                />
              </Grid>

              <Grid item m={'auto'}>
                <CrewLink href={'#'} variant={'caption'} className={`forgot-password`}>
                  {`Forgot Password ?`}
                </CrewLink>
              </Grid>
            </Grid>
            {/* Forgot Section End*/}
            <section>
              <CrewButton type="submit" variant="primary" size="fullwidth" disabled={true}>
                Sign In
              </CrewButton>
            </section>
          </Stack>
          {/* Login-Form Section End*/}
        </form>
        <Stack alignItems={'center'}>
          <CrewTypography textAlign="center" variant={'caption'}>
            Or
          </CrewTypography>
        </Stack>
        {/* Sociallink & other Section Start*/}
        <Grid alignItems={'center'} className="sociallink-section">
          <Grid item spacing={3}>
            <CrewButton
              variant="transparent"
              type="button"
              size="fullwidth"
              disabled={false}
              startIcon={<CrewIcon size="medium" hasInheritedStyles icon={faGoogle as IconProp} />}
              onClick={() => signIn('google')}
            >
              Google Account
            </CrewButton>
          </Grid>
          <Grid item spacing={3} mt={5}>
            <Stack alignItems={'center'}>
              <CrewLink href={'#'} variant={'caption'} className={`privacy-policy`}>
                {`Privacy Policy`}
              </CrewLink>
              <CrewTypography textAlign="center" variant={'caption'} mt={1} className={`copyright-text`}>
                &#169; Copyright 2023 hostelmanagement
              </CrewTypography>
            </Stack>
          </Grid>
        </Grid>
        {/* Sociallink & other Section End*/}
      </section>
    </section>
  );
};

export default LoginFormSection;
