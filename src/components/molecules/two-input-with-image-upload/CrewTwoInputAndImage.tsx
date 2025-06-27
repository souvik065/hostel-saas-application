import { CrewInputField } from '../../atoms';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CrewImageUpload from '../image-file-upload/CrewImageUpload';
import { Image } from '../../../types/FileInputProps';

interface CrewTwoInputAndImageProps {
  inputLabel1: string;
  inputLabel2: string;
  imageUploadLabel: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  inputError1?: string;
  inputError2?: string;
  imageUploadError?: string;
  inputFieldValue1?: string;
  inputFieldValue2?: string;
  acceptMultiple: boolean;
  imageUploadFieldValue?: Image[];
  onInputFieldValueChange1: (value: string) => void;
  onInputFieldValueChange2: (value: string) => void;
  onImageUploadFieldValueChange: (value: Image[]) => void;
}

const CrewTwoInputAndImage = ({
  labelVariant,
  inputLabel1,
  inputLabel2,
  imageUploadLabel,
  inputError1,
  inputError2,
  imageUploadError,
  inputFieldValue1,
  inputFieldValue2,
  imageUploadFieldValue,
  acceptMultiple,
  onInputFieldValueChange1,
  onInputFieldValueChange2,
  onImageUploadFieldValueChange,
}: CrewTwoInputAndImageProps) => {
  const [inputValue1, setInputValue1] = useState<string>(inputFieldValue1 || '');
  const [inputValue2, setInputValue2] = useState<string>(inputFieldValue2 || '');
  const [uploadedImages, setUploadedImages] = useState<Image[]>(imageUploadFieldValue || []);

  // Function to handle input field 1 changes
  const handleInputChange1 = (value: string) => {
    setInputValue1(value);
    onInputFieldValueChange1(value);
  };

  // Function to handle input field 2 changes
  const handleInputChange2 = (value: string) => {
    setInputValue2(value);
    onInputFieldValueChange2(value);
  };

  // Function to handle image upload changes
  const handleImageUploadChange = (value: Image[]) => {
    setUploadedImages(value);
    onImageUploadFieldValueChange(value);
  };

  useEffect(() => {
    setInputValue1(inputFieldValue1 || '');
    setInputValue2(inputFieldValue2 || '');
    setUploadedImages(imageUploadFieldValue || []);
  }, [inputFieldValue1, inputFieldValue2, imageUploadFieldValue]);

  return (
    <>
      <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
        <CrewInputField
          labelVariant={labelVariant}
          label={inputLabel1}
          type="text"
          placeholder={`${inputLabel1}`}
          value={inputValue1}
          onValueChange={(value) => handleInputChange1(value)}
          radius={8}
          fullWidth
          error={!!inputError1}
          errorMessage={inputError1}
        />
      </Grid>
      <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
        <CrewInputField
          labelVariant={labelVariant}
          label={inputLabel2}
          type="text"
          placeholder={`${inputLabel2}`}
          value={inputValue2}
          onValueChange={(value) => handleInputChange2(value)}
          radius={8}
          fullWidth
          error={!!inputError2}
          errorMessage={inputError2}
        />
      </Grid>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={1}>
        <CrewImageUpload
          name={imageUploadLabel}
          label={imageUploadLabel || `Select ${imageUploadLabel}`}
          labelVariant={labelVariant}
          error={!!imageUploadError}
          errorMessage={imageUploadError}
          acceptMultiple={acceptMultiple}
          initialImages={uploadedImages}
          onImagesChange={(value) => handleImageUploadChange(value)}
        />
      </Grid>
    </>
  );
};

export default CrewTwoInputAndImage;
