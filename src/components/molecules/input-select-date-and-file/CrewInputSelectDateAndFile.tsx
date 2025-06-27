import { CrewInputField, CrewSelect } from '../../../components/atoms';
import { CrewFile } from '../../../types/FileInputProps';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CrewFileUpload from '../file-upload/CrewFileUpload';
import CrewDatePicker from '../date-picker/CrewDatePicker';

interface InputSelectDateAnfFileProps {
  selectLabel: string;
  inputLabel: string;
  dateLable: string;
  fileUploadLabel: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  menuItems: { value: string; label: string }[];
  minDate?: Date;
  maxDate?: Date;
  selectError?: string;
  inputError?: string;
  dateError?: string;
  fileUploadError?: string;
  inputFieldValue?: string;
  selectFieldValue?: string;
  dateFieldValue: Date;
  fileUploadValue: CrewFile[];
  acceptMultiple: boolean;
  maximumFileAllowed?: number;
  maxSizeInMb?: number;
  acceptedFileTypes?: string;
  onInputFieldValueChange: (value: string) => void;
  onSelectFieldValueChange: (value: string) => void;
  onDateFieldValueChange: (value: Date) => void;
  onFileUploadFieldValueChange: (value: CrewFile[]) => void;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

const CrewInputSelectDateAndFile = ({
  labelVariant,
  selectLabel,
  inputLabel,
  dateLable,
  fileUploadLabel,
  menuItems,
  minDate,
  maxDate,
  selectError,
  inputError,
  fileUploadError,
  dateError,
  inputFieldValue,
  selectFieldValue,
  dateFieldValue,
  fileUploadValue,
  acceptMultiple,
  maxSizeInMb = 1,
  maximumFileAllowed = 1,
  acceptedFileTypes,
  onInputFieldValueChange,
  onSelectFieldValueChange,
  onDateFieldValueChange,
  onFileUploadFieldValueChange,
  xl = 3,
  lg = 4,
  md = 4,
  sm = 6,
  xs = 12,
}: InputSelectDateAnfFileProps) => {
  const [inputValue, setInputValue] = useState<string>(inputFieldValue || '');
  const [selectedValue, setSelectedValue] = useState<string>(selectFieldValue || '');
  const [selectedDate, setSelectedDate] = useState<Date>(dateFieldValue || new Date());
  const [selectedFiles, setSelectedFile] = useState<CrewFile[]>(fileUploadValue || []);

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

  // Function to handle date field changes
  const handleDateFieldChange = (value: Date) => {
    setSelectedDate(value);
    onDateFieldValueChange(value);
  };

  // Function to handle fileUpload field changes
  const handleFileUploadFieldChange = (value: CrewFile[]) => {
    setSelectedFile(value);
    onFileUploadFieldValueChange(value);
  };

  useEffect(() => {
    setInputValue(inputFieldValue || '');
    setSelectedValue(selectFieldValue || '');
    setSelectedDate(dateFieldValue || new Date());
    setSelectedFile(fileUploadValue || []);
  }, [inputFieldValue, selectFieldValue, dateFieldValue, fileUploadValue]);

  return (
    <>
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
      <Grid item xl={xl} lg={lg} md={md} sm={sm} xs={xs} px={1}>
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
        <CrewFileUpload
          label={fileUploadLabel || `Select ${fileUploadLabel}`}
          placeholder={`${fileUploadLabel}`}
          labelVariant={labelVariant}
          error={!!fileUploadError}
          errorMessage={fileUploadError}
          acceptMultiple={acceptMultiple}
          maxSizeInMb={maxSizeInMb}
          maximumFileAllowed={maximumFileAllowed}
          initialFiles={selectedFiles}
          onFilesChange={(value) => handleFileUploadFieldChange(value)}
          acceptedFileTypes={acceptedFileTypes}
        />
      </Grid>
    </>
  );
};

export default CrewInputSelectDateAndFile;
