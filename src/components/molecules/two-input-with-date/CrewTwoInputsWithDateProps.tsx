import React, { useEffect, useState } from 'react';
import { CrewInputField } from '../../atoms';
import { Grid } from '@mui/material';
import CrewDatePicker from '../date-picker/CrewDatePicker';

interface CrewTwoInputWithDateProps {
  dateLable: string;
  inputLabel1: string;
  inputLabel2: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  minDate?: Date;
  maxDate?: Date;
  dateError?: string;
  inputError1?: string;
  inputError2?: string;
  inputFieldValue1?: string;
  inputFieldValue2?: string;
  dateFieldValue: Date;
  onInputField1ValueChange: (value: string) => void;
  onInputField2ValueChange: (value: string) => void;
  onDateFieldValueChange: (value: Date) => void;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

const CrewTwoInputWithDate = ({
  labelVariant,
  inputLabel1,
  inputLabel2,
  dateLable,
  minDate,
  maxDate,
  inputError1,
  inputError2,
  dateError,
  inputFieldValue1,
  inputFieldValue2,
  dateFieldValue,
  onInputField1ValueChange,
  onInputField2ValueChange,
  onDateFieldValueChange,
  xl = 3,
  lg = 4,
  md = 4,
  sm = 6,
  xs = 12,
}: CrewTwoInputWithDateProps) => {
  const [inputValue1, setInputValue1] = useState<string>(inputFieldValue1 || '');
  const [inputValue2, setInputValue2] = useState<string>(inputFieldValue2 || '');
  const [selectedDate, setSelectedDate] = useState<Date>(dateFieldValue || new Date());

  // Function to handle input 1 field changes
  const handleInput1Change = (value: string) => {
    setInputValue1(value);
    onInputField1ValueChange(value);
  };

  // Function to handle input 2 field changes
  const handleInput2Change = (value: string) => {
    setInputValue2(value);
    onInputField2ValueChange(value);
  };
  // Function to handle Date field changes
  const handleDateFieldChange = (value: Date) => {
    setSelectedDate(value);
    onDateFieldValueChange(value);
  };

  useEffect(() => {
    setInputValue1(inputFieldValue1 || '');
    setInputValue2(inputFieldValue2 || '');
    setSelectedDate(dateFieldValue || '');
  }, [inputFieldValue1, inputFieldValue2, dateFieldValue]);

  return (
    <>
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
        <CrewInputField
          labelVariant={labelVariant}
          label={inputLabel1}
          type="text"
          placeholder={`${inputLabel1}`}
          value={inputValue1}
          onValueChange={(value) => handleInput1Change(value)}
          radius={8}
          fullWidth
          error={!!inputError1}
          errorMessage={inputError1}
        />
      </Grid>
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
        <CrewDatePicker
          initialDate={selectedDate}
          onDateChange={(value) => handleDateFieldChange(value)}
          error={!!dateError}
          errorMessage={dateError}
          label={dateLable}
          labelVariant={labelVariant}
          placeholder={`Select ${dateLable}`}
          minDate={minDate}
          maxDate={maxDate}
        />
      </Grid>
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
        <CrewInputField
          labelVariant={labelVariant}
          label={inputLabel2}
          type="text"
          placeholder={`${inputLabel2}`}
          value={inputValue2}
          onValueChange={(value) => handleInput2Change(value)}
          radius={8}
          fullWidth
          error={!!inputError2}
          errorMessage={inputError2}
        />
      </Grid>
    </>
  );
};

export default CrewTwoInputWithDate;
