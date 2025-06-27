'use client';
import React, { useEffect, useState } from 'react';
import { CountryCode } from '../../../types/CountryCode';
import { useTheme } from '@mui/material';
import { CrewTypography } from '../../atoms';
import './CrewMobileNumber.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const CrewMobileNumber = ({
  labelVariant,
  label,
  errorMessage,
  countryCodeValue = 'in',
  phoneNumberValue,
  onPhoneNumberValueChange,
  error,
  readOnly = false,
  ...props
}: CountryCode) => {
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue);
  const [countryCode, setCountryCode] = useState(countryCodeValue);
  const [err, setError] = useState(error);
  const [errorValue, setErrorValue] = useState(errorMessage);
  const theme = useTheme();

  const handleInputChange = (updatedValue: string, countryCode?: any) => {
    setError(false);
    setErrorValue('');
    const sanitizedValue = updatedValue.replace(/[\D]/gi, '');
    if (!sanitizedValue) {
      setError(true);
      setErrorValue('Enter Valid Number');
    } else {
      setCountryCode(countryCode?.countryCode);
      setPhoneNumber(updatedValue);
      onPhoneNumberValueChange?.(`${countryCode?.countryCode} ${updatedValue}`);
    }
  };

  useEffect(() => {
    setPhoneNumber(phoneNumberValue);
  }, [phoneNumberValue]);

  useEffect(() => {
    setError(error);
    setErrorValue(errorMessage);
  }, [error, errorMessage]);

  return (
    <div className={`crew-mobile-number ${getThemeModeClass(theme.palette.mode)}`}>
      <CrewTypography variant={labelVariant}>{label}</CrewTypography>
      <PhoneInput country={countryCode} value={phoneNumber} onChange={handleInputChange} enableSearch />

      {err && <CrewTypography className="error">{errorValue}</CrewTypography>}
    </div>
  );
};
export default CrewMobileNumber;
