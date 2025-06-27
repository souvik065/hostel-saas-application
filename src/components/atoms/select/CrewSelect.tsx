'use client';
import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './CrewSelect.scss';
import { useTheme } from '@mui/material';
import CrewTypography from '../typography/CrewTypography';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface SelectProps {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  menuItems: { value: string; label: string }[];
  onChange: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  readOnly?: boolean;
  labelVariant?:
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

const CrewSelect = ({
  label,
  value,
  menuItems,
  onChange,
  className,
  error,
  errorMessage,
  labelVariant = 'body1',
  readOnly = false,
  placeholder = 'Select',
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(value ? value : '');
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
    onChange(event.target.value as string);
  };
  useEffect(() => {
    setSelectedValue(value ? value : '');
  }, [value]);

  return (
    <div className="full-width">
      <CrewTypography variant={labelVariant}>{label}</CrewTypography>
      <Select
        className={`crew-select ${error ? 'error-' : ''}${getThemeModeClass(theme.palette.mode)} ${className || ''}`}
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        disabled={readOnly}
        inputProps={{
          MenuProps: {
            PaperProps: {
              className: `list-items ${getThemeModeClass(theme.palette.mode)}`,
            },
          },
        }}
      >
        <MenuItem value="" className={`${getThemeModeClass(theme.palette.mode)}`}>
          <CrewTypography className="select-none-option " variant="caption">
            {placeholder}
          </CrewTypography>
        </MenuItem>
        {menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            <CrewTypography variant="caption">{item.label}</CrewTypography>
          </MenuItem>
        ))}
      </Select>
      {error && (
        <CrewTypography className="select-field-error" variant={labelVariant}>
          {errorMessage}
        </CrewTypography>
      )}
    </div>
  );
};

export default CrewSelect;
