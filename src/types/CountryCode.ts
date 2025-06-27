export interface CountryCode {
  countryCodeValue?: string;
  phoneNumberValue?: string;
  onPhoneNumberValueChange?: (value: string) => void;
  value?: string;
  errorMessage?: string;
  error?: boolean;
  readOnly?: boolean;
  label?: string;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}

export interface Country {
  name: string;
  dial_code: string;
  code: string;
}
