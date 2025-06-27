'use client';
import React, { useEffect, useState } from 'react';
import './CrewCheckBox.scss';
import { FormControlLabel, Checkbox, useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface Props {
  onChange?: (checked: boolean) => void;
  checked: boolean;
  id?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  labelName: string;
  CheckboxSize?: 'small' | 'medium';
  CheckboxFontsize?: 'small' | 'medium' | 'extra-small';
}

const CrewCheckBox = ({ onChange, labelName, checked, id, name, onBlur, disabled, CheckboxSize }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);
  const theme = useTheme();

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const getSizeClassName = (CheckboxSize: string) => {
    switch (CheckboxSize) {
      case 'small':
        return 'font-size-small';
      case 'medium':
        return 'font-size-medium';
      case 'extra-small':
        return 'font-size-extrasmall';
      default:
        return '';
    }
  };

  let CheckboxSizeName = '';
  if (CheckboxSize) {
    CheckboxSizeName = getSizeClassName(CheckboxSize);
  }
  return (
    <FormControlLabel
      className={`checkbox-container checkbox-label ${CheckboxSizeName} ${getThemeModeClass(theme.palette.mode)}`}
      htmlFor={id || name}
      label={labelName}
      control={
        <Checkbox
          className={`checkbox`}
          onChange={onValueChange}
          id={id || name}
          checked={isChecked}
          disabled={disabled}
          size={CheckboxSize}
        />
      }
    />
  );
};

export default CrewCheckBox;
