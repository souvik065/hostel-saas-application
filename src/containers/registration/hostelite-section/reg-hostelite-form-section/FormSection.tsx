import { getEmergencyContactRelationList, getGenderList, getNonBillableCategory } from '../../../../utils/mockData';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { HosteliteData, RegHostliteProps } from '../../../../types/CrewRegistration';
import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewRenderFormField } from '../../../../components/molecules';
import { CrewButton, CrewTypography } from '../../../../components/atoms';
import { getErrorClassName } from '../../../../utils/ComponentHelper';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewHostel';
import * as Yup from 'yup';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import { CreateHosteliteRegistration, getPlanTypesByHostelId } from '../../../../helpers/hostelite-registration';
import { getCookie } from 'cookies-next';
import { formatDateForBackend } from '../../../../utils/DateHelper';
import './FormSection.scss';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(errorMessage.inputField('First Name'))
    .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters and numbers'),
  lastName: Yup.string()
    .required(errorMessage.inputField('Last Name'))
    .matches(/^[a-zA-Z\s.-]+$/, 'Name should contain only letters and numbers'),
  address1: Yup.string()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, { message: 'Please enter the fields in your address form correctly' })
    .required(errorMessage.inputField('Address 1')),
  address2: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, {
      message: 'Should contain Alpha-numerics with special charecters like ., -, , ,/',
      excludeEmptyString: true,
    })
    .required(errorMessage.inputField('Address 2')),
  state: Yup.string()
    .required(errorMessage.inputField('State'))
    .matches(/^[a-zA-Z\s]+$/, 'State should contain only letters'),
  town: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, { message: 'Should contain Alpha-numerics with special charecters like ., -, , ,/' })
    .required(errorMessage.inputField('Town')),
  district: Yup.string()
    .required(errorMessage.inputField('District '))
    .matches(/^[a-zA-Z\s]+$/, 'District should contain only letters'),
  pincode: Yup.string()
    .max(6)
    .matches(/^[1-9][0-9]*$/, 'PIN should be a non-zero number')
    .required(errorMessage.inputField('Pincode')),
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
  dob: Yup.string().required(errorMessage.selectionDropdown('DOB')),
  institution: Yup.string()
    .required(errorMessage.inputField('Institution'))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters'),
  occupation: Yup.string()
    .required(errorMessage.inputField('Occupation'))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters'),
  mobile1: Yup.string().required(errorMessage.inputField('Contact 1')),
  gender: Yup.string().required(errorMessage.selectionDropdown('Gender')),
  nationality: Yup.string()
    .required(errorMessage.inputField('Nationality'))
    .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters and numbers'),
  emergencyContactName: Yup.string()
    .max(255, errorMessage.max('Emergency Contact', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters')
    .required(errorMessage.inputField('Emergency Contact')),
  emergencyContactNo: Yup.string()
    .matches(
      /^(?:(?:\+|0{0,2})[1-9]\d{0,2}(\s*[\-]\s*)?|[0]?)?[1-9]\d{6,14}$/,
      errorMessage.invalidNumberField('number'),
    )
    .required(errorMessage.inputField('Emergency Contact Number')),
  emergencyContactRelation: Yup.string().required(errorMessage.selectionDropdown('Emergency Contact Relation')),
  attendanceRegisterId: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, { message: 'Should contain Alpha-numerics' })
    .required(errorMessage.inputField('Attendance Register No')),
  images: Yup.array().min(1, errorMessage.selectionDropdown('At leaset 1 Image')),
});

const FormSection = ({ ...props }: RegHostliteProps) => {
  const [_formData, setFormData] = useState(props.hosteliteData);
  const [errors, setErrors] = useState<HosteliteData>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [showNonBillableCategory, setShowNonBillableCategory] = useState(true);

  const nonBillableData = getNonBillableCategory();

  const genderListDataFromApi = getGenderList();
  const emergencyContactRelationListFromApi = getEmergencyContactRelationList();

  const inputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'firstName',
      id: 'first-name',
      label: 'First Name',
      details: {
        inputType: 'text',
        placeholder: 'First name',
        lableVariant: 'body1',
        value: _formData?.firstName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'lastName',
      id: 'last-name',
      label: 'Last Name',
      details: {
        inputType: 'text',
        placeholder: 'Last name',
        lableVariant: 'body1',
        value: _formData?.lastName,
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
      name: 'district',
      id: 'district',
      label: 'District',
      details: {
        inputType: 'text',
        placeholder: 'type district',
        lableVariant: 'body1',
        value: _formData?.district,
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
        placeholder: 'type state',
        lableVariant: 'body1',
        value: _formData?.state,
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
      type: 'date-picker',
      name: 'dob',
      id: 'dob',
      label: 'Date Of Birth',
      details: {
        placeholder: 'Date Of Birth',
        lableVariant: 'body1',
        initialDate: _formData?.dob ? new Date(_formData?.dob) : new Date(),
        maxDate: new Date(),
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
        placeholder: 'type institution',
        lableVariant: 'body1',
        value: _formData?.institution,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'occupation',
      id: 'occupation',
      label: 'Occupation',
      details: {
        inputType: 'text',
        placeholder: 'Type occupation',
        lableVariant: 'body1',
        value: _formData?.occupation,
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
        countryCodeValue: _formData?.mobile1CountryCode,
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
        phoneNumberValue: _formData?.mobile2,
        countryCodeValue: _formData?.mobile2CountryCode,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'gender',
      id: 'gender',
      label: 'Gender',
      details: {
        items: genderListDataFromApi,
        lableVariant: 'body1',
        value: _formData?.gender,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'nationality',
      id: 'nationality',
      label: 'Nationality',
      details: {
        inputType: 'text',
        placeholder: 'Nationality',
        lableVariant: 'body1',
        value: _formData?.nationality,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'emergencyContactName',
      id: 'emergency-contact-name',
      label: 'Emergency Name',
      details: {
        inputType: 'text',
        placeholder: 'Type emergency name',
        lableVariant: 'body1',
        value: _formData?.emergencyContactName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'mobile-number',
      name: 'emergencyContactNo',
      id: 'emergencyContactNo',
      label: 'Emergency Number',
      details: {
        inputType: 'number',
        placeholder: 'Type emergency number',
        lableVariant: 'body1',
        phoneNumberValue: _formData?.emergencyContactNo,
        countryCodeValue: _formData?.emergencyCountryCode,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'emergencyContactRelation',
      id: 'emergency-contact-relation',
      label: 'Emergency Contact Relation',
      details: {
        items: emergencyContactRelationListFromApi,
        lableVariant: 'body1',
        value: _formData?.emergencyContactRelation,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'attendanceRegisterId',
      id: 'attendanceRegisterId',
      label: 'Attendance RegisterNo',
      details: {
        inputType: 'text',
        placeholder: 'Attendance Register No',
        lableVariant: 'body1',
        value: _formData?.attendanceRegisterId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },

    {
      type: 'radio',
      name: 'isNonBillable',
      id: 'isNonBillable',
      label: 'Non Billable',
      details: {
        lableVariant: 'body1',
        direction: 'row',
        selectedValue: _formData?.isNonBillable,
        options: [
          {
            label: 'Yes',
            name: 'Non-billable-yes',
          },
          {
            label: 'No',
            name: 'Non-billable-no',
          },
        ],
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 5 },
    },
    {
      type: 'dropdown',
      name: 'nonBillableCategory',
      id: 'nonBillableCategory',
      label: 'Select Category',
      hideField: showNonBillableCategory,
      details: {
        items: nonBillableData,
        lableVariant: 'body1',
        value: _formData?.nonBillableCategory,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'imageUpload',
      name: 'image',
      id: 'image',
      label: 'Hostelite Image',
      details: {
        lableVariant: 'body1',
        initialImages: _formData?.image || [],
        acceptMultiple: false,
        maximumFileAllowed: 1,
        maxSizeInMb: 3,
      },
      gridValues: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12, px: 1 },
    },
  ];

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;

    if (name === 'mobile1' || name === 'mobile2' || name == 'emergencyContactNo') {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'countryCodeValue1';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'countryCodeValue2';
      } else {
        fieldvalue = 'countryCodeValue3';
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
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (name === 'isNonBillable') {
        if (value === 'Yes') {
          setShowNonBillableCategory(false);
        } else {
          setShowNonBillableCategory(true);
        }
      }
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        try {
          const dataToCreate = {
            userId: null,
            firstName: _formData?.firstName,
            lastName: _formData?.lastName,
            hosteliteImage: _formData?.image?.length === 0 ? null : _formData?.image?.[0]?.imageUrl,
            email: _formData?.email1,
            address1: _formData?.address1,
            town: _formData?.town,
            district: _formData?.district,
            state: _formData?.state,
            pincode: _formData?.pincode,
            email1: _formData?.email1,
            email2: _formData?.email2 === '' ? null : _formData?.email2,
            mobile1CountryCode: _formData?.mobile1CountryCode,
            mobile1: _formData?.mobile1,
            mobile2CountryCode: _formData?.mobile2CountryCode,
            mobile2: _formData?.mobile2,
            hostelId: _formData?.hostelId,
            gender: _formData?.gender,
            dateOfBirth: formatDateForBackend(_formData?.dob),
            nationality: _formData?.nationality,
            institution: _formData?.institution,
            occupation: _formData?.occupation,
            emergencyContactName: _formData?.emergencyContactName,
            emergencyContactCountryCode: _formData?.emergencyCountryCode,
            emergencyContactNo: _formData?.emergencyContactNo,
            emergencyContactRelation: _formData?.emergencyContactRelation,
            isNonBillable: _formData?.isNonBillable === 'No' ? false : true,
            nonBillableCategory: _formData?.nonBillableCategory === '' ? null : _formData?.nonBillableCategory,
            inactiveDate: null,
            isActive: true,
            isImageUpdate: false,
            planTypeId: null,
            attendanceRegisterId: _formData?.attendanceRegisterId === '' ? null : _formData?.attendanceRegisterId,
          };
          CreateHosteliteRegistration(dataToCreate)
            .then((result) => {
              if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                sessionStorage.setItem('hosteliteData', JSON.stringify(dataToCreate));
                sessionStorage.setItem('hosteliteId', result.data.id);
                setFormData({
                  hostelId: getCookie('HostelId'),
                  firstName: '',
                  lastName: '',
                  address1: '',
                  address2: '',
                  town: '',
                  city: '',
                  district: '',
                  state: '',
                  pincode: '',
                  mobile1: '',
                  mobile2: '',
                  email1: '',
                  email2: '',
                  dob: new Date(),
                  institution: '',
                  occupation: '',
                  gender: '',
                  isNonBillable: 'No',
                  planTypeId: '',
                  attendanceRegisterId: '',
                  nonBillableCategory: '',
                  nationality: '',
                  mobile1CountryCode: 'in',
                  mobile2CountryCode: 'in',
                  emergencyCountryCode: '',
                  emergencyContactName: '',
                  emergencyContactNo: '',
                  emergencyContactRelation: '',
                });
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
            .catch((err) => {
              setBtnLoading(false);
              console.log(err);
            });
        } catch (error) {
          setBtnLoading(false);
          console.error('Error Registration Hostelite:', error);
        }
      })
      .catch((err: Yup.ValidationError) => {
        console.log('err', err);
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  return (
    <Stack component={'section'}>
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
                  <CrewTypography className={getErrorClassName(apiErrors.title.toLowerCase())}>
                    {apiErrors?.title}:
                  </CrewTypography>
                  <ul>
                    {apiErrors?.errors.map((errorItem, index) => (
                      <li key={index} className={getErrorClassName(apiErrors.title.toLowerCase())}>
                        <CrewTypography className={getErrorClassName(apiErrors.title.toLowerCase())} variant="body2">
                          {`${errorItem.propertyName}: ${errorItem.errorMessage}`}
                        </CrewTypography>
                      </li>
                    ))}
                  </ul>
                </Stack>
              )}
            </Grid>
          </Grid>
          <Stack className={`footer-container`}>
            <CrewButton size="large" loading={btnLoading} type="submit" variant="contained" stylebutton>
              Submit
            </CrewButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormSection;
