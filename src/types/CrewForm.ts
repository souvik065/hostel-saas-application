import * as Yup from 'yup';
import { CrewFile, Image } from './FileInputProps';
import { RadioOption } from './CrewRadioButtonProps';
export interface InputFieldProps {
  type:
    | 'input'
    | 'dropdown'
    | 'checkbox'
    | 'imageUpload'
    | 'dynamicFields'
    | 'date-picker'
    | 'mobile-number'
    | 'time-picker'
    | 'fileUpload'
    | 'radio';
  name: string;
  id: string;
  label?: string;
  details:
    | TextField
    | DropdownField
    | CheckboxField
    | ImageUploadField
    | DatePickerFieldProps
    | MobileNumber
    | TimePickerProps
    | RadioGroupProps;
  hideField?: boolean;
  gridValues?: {
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
    px?: number;
    py?: number;
  };
  rows?:number;
}

export interface TextField {
  inputType?: 'text' | 'password' | 'number';
  placeholder?: string;
  lableVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  value?: string | null;
  readonly?: boolean;
  minRows?: number;
  maxRows?: number;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
}

export interface DropdownField {
  items: { value: string; label: string }[];
  placeholder?: string;
  value?: string | '';
  autoWidth?: boolean;
  multiple?: boolean;
  native?: boolean;
  lableVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  readonly?: boolean;
}

export interface CheckboxField {
  type: 'checkbox';
  name: string;
  isCheckBoxCheck?: boolean;
  isCheckBoxDisabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  readonly?: boolean;
}

export interface ImageUploadField {
  type: 'imageUpload';
  name: string;
  error?: boolean;
  errorMessage?: string;
  initialImages: Image[];
  acceptMultiple: boolean;
  onImagesChange: (updatedImages: Image[]) => void;
  maximumFileAllowed?: number;
  maxSizeInMb?: number;
}

export interface FileUploadProps {
  error?: boolean;
  errorMessage?: string;
  label: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  placeholder: string;
  initialFiles: CrewFile[];
  acceptMultiple: boolean;
  onFilesChange: (updatedFile: CrewFile[]) => void;
  maximumFileAllowed: number;
  maxSizeInMb: number;
  acceptedFileTypes?: string;
}

export interface DatePickerFieldProps {
  initialDate: Date;
  onDateChange?: (date: Date) => void;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export interface MobileNumber {
  countryCodeValue?: string;
  phoneNumberValue?: string;
  onCountryCodeValueChange?: (value: string) => void;
  onPhoneNumberValueChange?: (value: string) => void;
  errorMessage?: string;
  error?: boolean;
  readOnly?: boolean;
  label?: string;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}

export interface TimePickerProps {
  name: string;
  id: string;
  error?: boolean;
  errorMessage?: string;
  initialValue?: string;
  label: string;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  placeholder: string;
  onTimeChange: (value: string) => void;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  direction?: 'column-reverse' | 'column' | 'row-reverse' | 'row';
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}

export interface FormProps {
  inputs: InputFieldProps[];
  buttonName: string;
  buttonLabelVariant: 'text' | 'contained' | 'outlined' | 'logoutContained';
  validationSchema?: Yup.Schema<any>;
  initialValues: Record<string, string | boolean>;
}

export type HandleFieldChange = (
  newValue: string | boolean | number | Date | Image[] | CrewFile[],
  input: InputFieldProps,
  option?: string,
) => void;
