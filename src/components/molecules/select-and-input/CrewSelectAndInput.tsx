import React, { useEffect, useState } from 'react';
import { CrewSelect, CrewInputField } from '../../atoms';
import { Grid } from '@mui/material';

interface CrewSelectAndInputProps {
  selectLabel: string;
  inputLabel: string;
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
  menuItems: { value: string; label: string }[];
  selectError?: string;
  inputError?: string;
  inputFieldValue?: string;
  selectFieldValue?: string;
  onInputFieldValueChange: (value: string) => void;
  onSelectFieldValueChange: (value: string) => void;
}

const CrewSelectAndInput = ({
  labelVariant,
  selectLabel,
  inputLabel,
  menuItems,
  selectError,
  inputError,
  inputFieldValue,
  selectFieldValue,
  onInputFieldValueChange,
  onSelectFieldValueChange,
}: CrewSelectAndInputProps) => {
  const [inputValue, setInputValue] = useState<string>(inputFieldValue || '');
  const [selectedValue, setSelectedValue] = useState<string>(selectFieldValue || '');

  // Function to handle input field changes
  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputFieldValueChange(value);
  };

  // Function to handle select field changes
  const handleSelectChange = (value: string) => {
    setSelectedValue(value);
    onSelectFieldValueChange(value);
  };

  useEffect(() => {
    setInputValue(inputFieldValue || '');
    setSelectedValue(selectFieldValue || '');
  }, [inputFieldValue, selectFieldValue]);

  return (
    <>
      <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
        <CrewSelect
          labelVariant={labelVariant}
          label={selectLabel}
          value={selectedValue}
          menuItems={menuItems}
          onChange={handleSelectChange}
          error={!!selectError}
          errorMessage={selectError}
        />
      </Grid>
      <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
        <CrewInputField
          labelVariant={labelVariant}
          label={inputLabel}
          type="text"
          placeholder={`${inputLabel}`}
          value={inputValue}
          onValueChange={(value) => handleInputChange(value)}
          radius={8}
          fullWidth
          error={!!inputError}
          errorMessage={inputError}
        />
      </Grid>
    </>
  );
};

export default CrewSelectAndInput;
