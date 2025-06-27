'use client';
import { ColorModeContext } from '../../../providers/appThemeProvider';
import { Stack, Tooltip, useTheme } from '@mui/material';
import { Switch } from '@mui/material';
import React, { useContext } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import CrewTypography from '../../../components/atoms/typography/CrewTypography';
import './CrewThemeSwitch.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface Props {
  lableVariant:
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

const CrewThemeSwitch = ({ lableVariant = 'caption' }: Props) => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const {
    palette: { mode },
  } = useTheme();
  const theme = useTheme();
  const handleToggle = () => {
    toggleColorMode();
  };

  const icon = mode === 'dark' ? faSun : faMoon;

  return (
    <>
      <Tooltip title={`Theme color`}>
        <Stack className="crew-theme-switch">
          <CrewTypography
            hasInherited
            variant={lableVariant}
            textTransform={'capitalize'}
            className={`${getThemeModeClass(theme.palette.mode)}`}
          >
            {mode} mode
          </CrewTypography>
          <Switch
            className={`${getThemeModeClass(theme.palette.mode)} crew-theme-switch-content`}
            onChange={handleToggle}
          />
        </Stack>
      </Tooltip>
    </>
  );
};

export default CrewThemeSwitch;
