'use client';
import './CrewIcon.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CrewIconProps } from '../../../types/CrewIconProps';
import { useTheme } from '@mui/material';

const CrewIcon = ({ icon, hasInheritedStyles, className, size }: CrewIconProps) => {
  const theme = useTheme();
  const getBackgroundColorClass = () => {
    return theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode';
  };

  const getSizeClassName = (size: string) => {
    switch (size) {
      case 'small':
        return 'size-small';
      case 'regular':
        return 'size-regular';
      case 'medium':
        return 'size-medium';
      case 'large':
        return 'size-large';
      default:
        return '';
    }
  };

  let sizeClassName = '';
  if (size) {
    sizeClassName = getSizeClassName(size);
  }

  const iconClassName = hasInheritedStyles ? 'crew-icon' : `crew-icon ${getBackgroundColorClass()}`;
  return <FontAwesomeIcon icon={icon} className={`${iconClassName} ${sizeClassName} ${className}`} />;
};

export default CrewIcon;
