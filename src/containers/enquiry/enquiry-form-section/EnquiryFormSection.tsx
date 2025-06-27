import { CrewButton, CrewSelect, CrewTypography } from '../../../components/atoms';
import { CrewRenderFormField } from '../../../components/molecules';
import { Stack, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { CreateEnquiryFormError, EnquiryData, EnquiryProps } from '../../../types/CrewEnquiry';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import { createEnquiry, updateEnquiry } from '../../../helpers/enquiry';
import { getAllHostelIdAndName } from '../../../helpers/hostel';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewHostel';
import './EnquiryFormSection.scss';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  studentFirstName: Yup.string()
    .max(255, errorMessage.max('Student First name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters')
    .required(errorMessage.inputField('Student First Name')),
  studentLastName: Yup.string()
    .max(255, errorMessage.max('Student Last name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only ')
    .required(errorMessage.inputField('Student Last Name')),
  parentFirstName: Yup.string()
    .max(255, errorMessage.max('Parent First name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters')
    .required(errorMessage.inputField('Parent First Name')),
  parentLastName: Yup.string()
    .max(255, errorMessage.max('Parent Last name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters')
    .required(errorMessage.inputField('Parent Last Name')),
  mobile1: Yup.string().required(errorMessage.inputField('Contact number1')),
  mobile2: Yup.string().nullable(),
  email1: Yup.string()
    .matches(/^[a-z0-9_+\-.]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: errorMessage.invalidEmailField('email1'),
    })
    .required(errorMessage.inputField('Email')),
  email2: Yup.string()
    .nullable()
    .matches(/^[a-z0-9_+\-.]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: errorMessage.invalidEmailField('email2'),
      excludeEmptyString: true,
    }),
  address1: Yup.string()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Address1')),
  town: Yup.string()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Town')),
  district: Yup.string().required(errorMessage.selectionDropdown('District')),
  state: Yup.string().required(errorMessage.selectionDropdown('State')),
  pincode: Yup.string()
    .max(6)
    .matches(/^[1-9][0-9]*$/, 'PIN should be a non-zero number')
    .required(errorMessage.inputField('Pincode')),
  institution: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('institution')),
});

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const EnquiryFormSection = ({ ...props }: EnquiryProps) => {
  const [_formData, setFormData] = useState(props.enquiryData);
  const [hostelData, setHostelData] = useState<{ label: string; value: string }[]>([]);
  const [errors, setErrors] = useState<CreateEnquiryFormError>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [hostelId, setHostelId] = useState<string>('');
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    if (name !== 'mobile1' && name !== 'mobile2') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    } else {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'countryCodeValue1';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'countryCodeValue2';
      }
      setFormData((prevData) => ({
        ...prevData,
        [name]: splitedValue[1],
      }));
      setFormData((prevData) => ({
        ...prevData,
        [fieldvalue]: splitedValue[0],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldvalue]: '',
      }));
    }
  };

  const getAllHostelIdsAndNames = async () => {
    try {
      const hostelNameAndIds = await getAllHostelIdAndName();

      if (hostelNameAndIds && hostelNameAndIds?.data?.length > 0) {
        const transformedHostelData = hostelNameAndIds?.data.map((item: any) => ({
          label: item.hostelName,
          value: item.hostelId.toString(),
        }));
        setHostelData(transformedHostelData);
      }
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  useEffect(() => {
    getAllHostelIdsAndNames();
    props.getAllEnquiries?.();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setBtnLoading(true);
    e.preventDefault();
    setFormData({ ..._formData, hostelId: hostelId });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        if (props.isModal === false && (_formData?.id === undefined || _formData?.id === '')) {
          try {
            const dataToCreate: EnquiryData = {
              ..._formData,
              id: null,
              mobile1: _formData?.mobile1,
              mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
              email1: _formData?.email1,
              email2: _formData?.email2 === '' ? null : _formData?.email2,
              mobile1CountryCode: _formData?.countryCodeValue1,
              mobile2CountryCode: _formData?.countryCodeValue2,
            };
            createEnquiry(dataToCreate)
              .then((result) => {
                console.log('result from form', result);
                if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                  setFormData({} as EnquiryData);
                  props.getAllEnquiries?.();
                } else if (result && result.status === 400) {
                  const formattedErrors: ApiErrorItem[] = result?.detail?.errors.map((errorItem: any) => {
                    return {
                      propertyName: errorItem.propertyName,
                      errorMessage: errorItem.errorMessage,
                    };
                  });
                  setApiErrors({
                    title: 'Warning',
                    errors: formattedErrors,
                  });
                } else if (result && result.status === 404) {
                  setApiErrors({
                    title: 'Not Found',
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                  });
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
                setBtnLoading(false);
              })
              .catch((error) => {
                setBtnLoading(false);
                console.log(error);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error creating enquiry:', error);
          }
        } else {
          try {
            const dataToUpdate: EnquiryData = {
              ..._formData,
              mobile1: _formData?.mobile1,
              mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
              email1: _formData?.email1,
              email2: _formData?.email2 === '' ? null : _formData?.email2,
              mobile1CountryCode: _formData?.countryCodeValue1,
              mobile2CountryCode: _formData?.countryCodeValue2,
            };
            updateEnquiry(dataToUpdate)
              .then((result) => {
                if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                  setBtnLoading(false);
                  props.closeModal?.();
                  props.getAllEnquiries?.();
                } else if (result && result.status === 400) {
                  const formattedErrors: ApiErrorItem[] = result.detail?.errors.map((errorItem: any) => {
                    return {
                      propertyName: errorItem.propertyName,
                      errorMessage: errorItem.errorMessage,
                    };
                  });
                  setApiErrors({
                    title: 'Warning',
                    errors: formattedErrors,
                  });
                } else if (result && result.status === 404) {
                  setApiErrors({
                    title: 'Not Found',
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                  });
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
              })
              .catch((error) => {
                setBtnLoading(false);
                console.log(error);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error updating enquiry:', error);
          }
        }
      })
      .catch((err: Yup.ValidationError) => {
        setBtnLoading(false);
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        setErrors(validationErrors);
      });
  };
  const inputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'studentFirstName',
      id: 'student-first-name',
      label: 'Student First Name',
      details: {
        inputType: 'text',
        placeholder: 'first name',
        lableVariant: 'body1',
        value: _formData?.studentFirstName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'studentLastName',
      id: 'student-last-name',
      label: 'Student Last Name',
      details: {
        inputType: 'text',
        placeholder: 'last name',
        lableVariant: 'body1',
        value: _formData?.studentLastName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'parentFirstName',
      id: 'parent-first-name',
      label: 'Parent First Name',
      details: {
        inputType: 'text',
        placeholder: 'first name',
        lableVariant: 'body1',
        value: _formData?.parentFirstName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'parentLastName',
      id: 'parent-last-name',
      label: 'Parent Last Name',
      details: {
        inputType: 'text',
        placeholder: 'first name',
        lableVariant: 'body1',
        value: _formData?.parentLastName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'address1',
      id: 'address-1',
      label: 'Address 1',
      details: {
        inputType: 'text',
        placeholder: 'type address 1',
        lableVariant: 'body1',
        value: _formData?.address1,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'address2',
      id: 'address-2',
      label: 'Address 2',
      details: {
        inputType: 'text',
        placeholder: 'type address 1',
        lableVariant: 'body1',
        value: _formData?.address2,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'mobile-number',
      name: 'mobile1',
      id: 'contact-1',
      label: 'Contact 1',
      details: {
        inputType: 'number',
        placeholder: 'Type contact 1',
        lableVariant: 'body1',
        phoneNumberValue: _formData?.mobile1,
        countryCodeValue: _formData?.countryCodeValue1,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'mobile-number',
      name: 'mobile2',
      id: 'contact-2',
      label: 'Contact 2',
      details: {
        inputType: 'number',
        placeholder: 'Type contact 2',
        lableVariant: 'body1',
        phoneNumberValue: _formData?.mobile2 || '',
        countryCodeValue: _formData?.countryCodeValue2,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'email1',
      id: 'email-1',
      label: 'Email 1',
      details: {
        inputType: 'text',
        placeholder: 'type mail 1',
        lableVariant: 'body1',
        value: _formData?.email1,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'email2',
      id: 'email-2',
      label: 'Email 2',
      details: {
        inputType: 'text',
        placeholder: 'type mail 2',
        lableVariant: 'body1',
        value: _formData?.email2,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'town',
      id: 'town',
      label: 'Town',
      details: {
        inputType: 'text',
        placeholder: 'type town',
        lableVariant: 'body1',
        value: _formData?.town,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'pincode',
      id: 'pincode',
      label: 'Pincode',
      details: {
        inputType: 'number',
        placeholder: 'type pin',
        lableVariant: 'body1',
        value: _formData?.pincode,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'institution',
      id: 'institution',
      label: 'Institution',
      details: {
        inputType: 'text',
        placeholder: 'Institution',
        lableVariant: 'body1',
        value: _formData?.institution,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'state',
      id: 'state',
      label: 'State',
      details: {
        inputType: 'text',
        placeholder: 'Type State',
        lableVariant: 'body1',
        value: _formData?.state,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'district',
      id: 'district',
      label: 'District',
      details: {
        inputType: 'text',
        placeholder: 'Type District',
        lableVariant: 'body1',
        value: _formData?.district,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} className="form-section">
          <Grid container rowSpacing={2}>
            {inputs.map((item, index) => (
              <Grid
                item
                xl={item?.gridValues?.xl}
                lg={item?.gridValues?.lg}
                md={item?.gridValues?.md}
                sm={item?.gridValues?.sm}
                xs={item?.gridValues?.xs}
                px={item?.gridValues?.px}
                key={index}
              >
                <CrewRenderFormField
                  index={index}
                  input={item}
                  handleFieldChange={(value, input) => handleFieldChange(value, input)}
                  errors={errors}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container>
            <Grid item>
              {apiErrors && apiErrors.errors.length > 0 && (
                <Stack>
                  <CrewTypography className={getErrorClass(apiErrors.title.toLowerCase())}>
                    {apiErrors?.title}:
                  </CrewTypography>
                  <ul>
                    {apiErrors?.errors.map((errorItem, index) => (
                      <li key={index} className={getErrorClass(apiErrors.title.toLowerCase())}>
                        <CrewTypography className={getErrorClass(apiErrors.title.toLowerCase())} variant="body2">
                          {`${errorItem.propertyName}: ${errorItem.errorMessage}`}
                        </CrewTypography>
                      </li>
                    ))}
                  </ul>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Stack className={`modal-footer-container`}>
            {!props.isModal && (
              <CrewButton size="large" loading={btnLoading} type="submit" variant="contained" stylebutton>
                Submit
              </CrewButton>
            )}
            {props.isModal && (
              <Stack direction={'row'} spacing={2} className="content">
                <CrewButton fullWidth variant="contained" onClick={props.closeModal}>
                  Cancel
                </CrewButton>
                <CrewButton loading={btnLoading} type="submit" fullWidth variant="contained">
                  Save
                </CrewButton>
              </Stack>
            )}
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default EnquiryFormSection;
