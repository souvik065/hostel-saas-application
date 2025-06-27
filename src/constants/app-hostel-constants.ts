export const displayTexts = {
  BUILDING_NAME: 'Building Name',
  FLOOR_NAME: 'Floor Name',
  SELECT_HOSTEL: 'Select Hostel',
  SELECT_BUILDING: 'Select Building',
  SUBMIT: 'Submit',
  HOSTEL_NAME: 'Hostel Name',
  SELECT_WARDEN: 'Warden',
  WARDEN_DESCRIPTION: 'Description',
};

export const errorMessage = {
  inputField: (inputFieldName: string) => `${inputFieldName} cannot be empty`,
  selectionDropdown: (selectionFieldName: string) => `${selectionFieldName} must be selected`,
  invalidNumberField: (inputFieldName: string) => `Please enter a valid ${inputFieldName} `,
  invalidEmailField: (inputFieldName: string) => `Please enter a valid ${inputFieldName} `,
  max: (fieldName: string, maxLength: number) => `${fieldName} should not exceed ${maxLength} characters`,
};
