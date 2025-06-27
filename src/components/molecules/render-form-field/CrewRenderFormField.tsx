import CrewMobileNumber from '../mobile-number/CrewMobileNumber';
import { CrewCheckBox, CrewInputField, CrewSelect } from '../../atoms';
import {
  CheckboxField,
  MobileNumber,
  DatePickerFieldProps,
  DropdownField,
  HandleFieldChange,
  InputFieldProps,
  TextField,
  TimePickerProps,
  ImageUploadField,
  RadioGroupProps,
  FileUploadProps,
} from '../../../types/CrewForm';
import CrewDatePicker from '../date-picker/CrewDatePicker';
import { CrewFileUpload, CrewImageUpload, CrewTimePicker } from '..';
import CrewRadioButtonGroup from '../radiobutton/CrewRadioButtonGroup';

interface Props {
  input: InputFieldProps;
  index: number;
  handleFieldChange: HandleFieldChange;
  errors: { [key: string]: any };
}

const CrewRenderFormField = ({ input, index, handleFieldChange, errors }: Props) => {
  const { details } = input;

  const shouldHideInput = input.hideField;
  if (shouldHideInput) {
    return null;
  }
  switch (input.type) {
    case 'input':
      const textFieldDetails = details as TextField;
      return (
        <CrewInputField
          key={index}
          type={textFieldDetails?.inputType || 'text'}
          placeholder={textFieldDetails?.placeholder || `Enter ${input.name}`}
          value={textFieldDetails?.value || ''}
          onValueChange={(value) => handleFieldChange(value, input)}
          fullWidth
          name={input.name}
          id={input.id}
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          label={input.label}
          labelVariant={textFieldDetails?.lableVariant}
          readOnly={textFieldDetails?.readonly}
          minRows={textFieldDetails?.minRows}
          maxRows={textFieldDetails?.maxRows}
          multiline={textFieldDetails?.multiline}
          rows={textFieldDetails?.rows}
          disabled={textFieldDetails?.disabled}
        />
      );
    case 'dropdown':
      const dropdownDetails = details as DropdownField;
      return (
        <CrewSelect
          label={input.label}
          key={index}
          className="dropdown"
          placeholder={dropdownDetails?.placeholder}
          value={dropdownDetails?.value}
          menuItems={dropdownDetails?.items || []}
          onChange={(e) => handleFieldChange(e as string, input)}
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          labelVariant={dropdownDetails?.lableVariant}
          readOnly={dropdownDetails?.readonly}
        />
      );
    case 'checkbox':
      const checkboxDetails = details as CheckboxField;
      return (
        <CrewCheckBox
          labelName={input.label || 'Checkbox'}
          checked={checkboxDetails?.isCheckBoxCheck ?? false}
          onChange={(value) => handleFieldChange(value, input)}
          id={input.id || input.name}
          name={checkboxDetails?.name}
        />
      );
    case 'date-picker':
      const datePickerDetails = details as DatePickerFieldProps;
      return (
        <CrewDatePicker
          initialDate={datePickerDetails.initialDate}
          onDateChange={(value) => handleFieldChange(value, input)}
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          label={input.label || `Enter ${input.name}`}
          labelVariant={datePickerDetails?.labelVariant || 'body1'}
          placeholder={datePickerDetails?.placeholder || `Enter ${input.name}`}
          minDate={datePickerDetails?.minDate}
          maxDate={datePickerDetails?.maxDate}
        />
      );
    case 'mobile-number':
      const mobileNumberDetails = details as MobileNumber;
      return (
        <CrewMobileNumber
          countryCodeValue={mobileNumberDetails.countryCodeValue}
          label={input.label || `Enter ${input.name}`}
          labelVariant={mobileNumberDetails?.labelVariant || 'body1'}
          phoneNumberValue={mobileNumberDetails.phoneNumberValue}
          onPhoneNumberValueChange={(value) => handleFieldChange(value, input)}
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
        />
      );
    case 'time-picker':
      const timePickerDetail = details as TimePickerProps;
      return (
        <CrewTimePicker
          initialValue={timePickerDetail.initialValue}
          onTimeChange={(value) => handleFieldChange(value, input)}
          name={input.name}
          id={input.id}
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          label={input.label || `Enter ${input.name}`}
          labelVariant={timePickerDetail?.labelVariant || 'body1'}
          placeholder={timePickerDetail?.placeholder || `Enter ${input.name}`}
        />
      );
    case 'imageUpload':
      const imageUploaderDetail = details as ImageUploadField;
      return (
        <CrewImageUpload
          name={input.name}
          label={input.label || `Select ${input.name}`}
          labelVariant="body1"
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          acceptMultiple={imageUploaderDetail?.acceptMultiple}
          maxSizeInMb={imageUploaderDetail?.maxSizeInMb}
          maximumFileAllowed={imageUploaderDetail?.maximumFileAllowed}
          initialImages={imageUploaderDetail?.initialImages || []}
          onImagesChange={(value) => handleFieldChange(value, input)}
        />
      );
    case 'fileUpload':
      const fileUploaderDetail = details as FileUploadProps;
      return (
        <CrewFileUpload
          label={input.label || `Select ${input.name}`}
          labelVariant="body1"
          error={!!errors[input.name]}
          errorMessage={errors[input.name]}
          acceptMultiple={fileUploaderDetail?.acceptMultiple}
          placeholder={fileUploaderDetail?.placeholder}
          maxSizeInMb={fileUploaderDetail?.maxSizeInMb}
          maximumFileAllowed={fileUploaderDetail?.maximumFileAllowed}
          initialFiles={fileUploaderDetail?.initialFiles || []}
          onFilesChange={(value) => handleFieldChange(value, input)}
        />
      );
    case 'radio':
      const radioButtonsDetail = details as RadioGroupProps;
      return (
        <CrewRadioButtonGroup
          direction={radioButtonsDetail.direction}
          label={input.label || 'Select'}
          labelVariant={radioButtonsDetail.labelVariant}
          onChange={(event) => {
            handleFieldChange(event.target.value, input);
          }}
          selectedValue={radioButtonsDetail.selectedValue}
          options={radioButtonsDetail.options}
          errorMessage={errors[input.name]}
          error={!!errors[input.name]}
        />
      );
    default:
      return null;
  }
};

export default CrewRenderFormField;
