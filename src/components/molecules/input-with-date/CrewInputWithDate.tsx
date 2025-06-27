import React, { useEffect, useState } from 'react';
import { CrewInputField } from '../../atoms';
import { Grid } from '@mui/material';
import CrewDatePicker from '../date-picker/CrewDatePicker';

interface CrewInputWithDateProps {
  dateLable: string;
  inputLabel: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  minDate?: Date;
  maxDate?: Date;
  dateError?: string;
  inputError?: string;
  inputFieldValue?: string;
  dateFieldValue: Date;
  onInputFieldValueChange: (value: string) => void;
  onDateFieldValueChange: (value: Date) => void;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

const CrewInputWithDate = ({
  labelVariant,
  inputLabel,
  dateLable,
  minDate,
  maxDate,
  inputError,
  dateError,
  inputFieldValue,
  dateFieldValue,
  onInputFieldValueChange,
  onDateFieldValueChange,
  xl = 3,
  lg = 4,
  md = 4,
  sm = 6,
  xs = 12,
}: CrewInputWithDateProps) => {
  const [inputValue, setInputValue] = useState<string>(inputFieldValue || '');
  const [selectedDate, setSelectedDate] = useState<Date>(dateFieldValue || new Date());

  // Function to handle input field changes
  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputFieldValueChange(value);
  };

  // Function to handle Date field changes
  const handleDateFieldChange = (value: Date) => {
    setSelectedDate(value);
    onDateFieldValueChange(value);
  };

  useEffect(() => {
    setInputValue(inputFieldValue || '');
    setSelectedDate(dateFieldValue || '');
  }, [inputFieldValue, dateFieldValue]);

  return (
    <>
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
        <CrewDatePicker
          initialDate={selectedDate}
          onDateChange={(value) => handleDateFieldChange(value)}
          error={!!dateError}
          errorMessage={dateError}
          label={dateLable}
          labelVariant={labelVariant}
          placeholder={`Select ${inputLabel}`}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Grid>
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
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

export default CrewInputWithDate;
