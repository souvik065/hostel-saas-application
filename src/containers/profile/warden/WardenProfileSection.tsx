'use client';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewHostel';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getEmergencyContactRelationList, getGenderList } from '../../../utils/mockData';
import { CreateWardenFormError } from '../../../types/CrewWarden';
import { ProfileProps } from '../../../types/CrewProfile';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { getWardenProfileDetailById, updateWardenData } from '../../../helpers/profile';
import { CrewRenderFormField } from '../../../components/molecules';
import { CrewButton, CrewTypography } from '../../../components/atoms';
import { getErrorClassName } from '../../../utils/ComponentHelper';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(255, errorMessage.max('First name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('First Name ')),
  lastName: Yup.string()
    .max(255, errorMessage.max('Last name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Last Name ')),
  mobile1: Yup.string().required(errorMessage.inputField('Phone')),
  email1: Yup.string()
    .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: errorMessage.invalidEmailField('email1'),
    })
    .required(errorMessage.inputField('Email')),
  email2: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: errorMessage.invalidEmailField('email2'),
      excludeEmptyString: true,
    }),
  gender: Yup.string().required(errorMessage.selectionDropdown('Gender')),
  address1: Yup.string()
    .max(255, errorMessage.max('Address 1', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Address1')),
  address2: Yup.string()
    .nullable()
    .max(255, errorMessage.max('Address 2', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, {
      message: 'Should contain Alpha-numerics with special charecters like ., -, , ,/',
      excludeEmptyString: true,
    }),
  town: Yup.string()
    .max(255, errorMessage.max('Town', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Town')),
  district: Yup.string().required(errorMessage.selectionDropdown('District')),
  state: Yup.string().required(errorMessage.selectionDropdown('State')),
  pincode: Yup.string()
    .max(6)
    .matches(/^[1-9][0-9]*$/, 'PIN should be a non-zero number')
    .required(errorMessage.inputField('Pincode')),
  emergencyContactName: Yup.string()
    .max(255, errorMessage.max('Emergency contact name', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Emergency contact name')),
  emergencyContactNo: Yup.string().required(errorMessage.inputField('Emergency number')),
  emergencyContactRelation: Yup.string().required(errorMessage.selectionDropdown('Emergency contact relation')),
});

const WardenProfileSection = ({ ...props }: ProfileProps) => {
  const [_formData, setFormData] = useState(props.profileData);
  const [errors, setErrors] = useState<CreateWardenFormError>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const emergencyContactRelationListFromApi = getEmergencyContactRelationList();
  const genderListDataFromApi = getGenderList();

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
        disabled: true,
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
        disabled: true,
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
        disabled: true,
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
        placeholder: 'Type address 1',
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
        placeholder: 'Type address 2',
        lableVariant: 'body1',
        value: _formData?.address2,
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
        disabled: true,
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
        placeholder: 'Email',
        lableVariant: 'body1',
        value: _formData?.email1,
        disabled: true,
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
        placeholder: 'Email',
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
        placeholder: 'Type town',
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
        placeholder: 'Type pin',
        lableVariant: 'body1',
        value: _formData?.pincode,
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
    {
      type: 'input',
      name: 'emergencyContactName',
      id: 'emergency-contact-name',
      label: 'Emergency Contact Name',
      details: {
        inputType: 'text',
        placeholder: 'Type emergency contact name',
        lableVariant: 'body1',
        value: _formData?.emergencyContactName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'mobile-number',
      name: 'emergencyContactNo',
      id: 'emergency-contact-number',
      label: 'Emergency Number',
      details: {
        inputType: 'number',
        placeholder: 'Type emergency number',
        lableVariant: 'body1',
        phoneNumberValue: _formData?.emergencyContactNo,
        countryCodeValue: _formData?.countryCodeValue3,
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
  ];

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    if (name !== 'mobile1' && name !== 'mobile2' && name !== 'emergencyContactNo') {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        if (_formData?.id !== null || _formData?.id !== '') {
          try {
            const dataToUpdate = {
              userId: _formData?.id,
              address1: _formData?.address1,
              gender: _formData?.gender,
              address2: _formData?.address2 === '' ? null : _formData?.address2,
              town: _formData?.town,
              district: _formData?.district,
              state: _formData?.state,
              pincode: _formData?.pincode,
              mobile1: _formData?.mobile1 === '' ? null : _formData?.mobile1,
              mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
              email2: _formData?.email2 === '' ? null : _formData?.email2,
              emergencyContactName: _formData?.emergencyContactName,
              emergencyContactNo: _formData?.emergencyContactNo,
              emergencyContactRelation: _formData?.emergencyContactRelation,
              mobile1CountryCode: _formData?.countryCodeValue1 === '' ? null : _formData?.countryCodeValue1,
              mobile2CountryCode: _formData?.countryCodeValue2 === '' ? null : _formData?.countryCodeValue2,
              emergencyContactCountryCode: _formData?.countryCodeValue3 === '' ? null : _formData?.countryCodeValue3,
            };
            updateWardenData(dataToUpdate)
              .then((result) => {
                if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                  getWardenData();
                } else if (result && result.status === 400) {
                  const formattedErrors: ApiErrorItem[] = result.errors.map((errorItem: any) => {
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
                } else if (result && result.status === 409) {
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
            console.error('Error updating warden:', error);
          }
        }
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  const getWardenData = async () => {
    try {
      const wardenData = await getWardenProfileDetailById();
      if (wardenData !== null) {
        setFormData({
          ...wardenData.data[0],
          id: wardenData.data[0].userId,
          mobile2: wardenData.data[0].mobile2 === null ? '' : wardenData.data[0].mobile2,
          countryCodeValue1:
            wardenData.data[0].mobile1CountryCode === null ? 'in' : wardenData.data[0].mobile1CountryCode,
          countryCodeValue2:
            wardenData.data[0].mobile2CountryCode === null ? 'in' : wardenData.data[0].mobile2CountryCode,
          countryCodeValue3:
            wardenData.data[0].emergencyContactCountryCode === null
              ? 'in'
              : wardenData.data[0].emergencyContactCountryCode,
        });
      }
    } catch (error) {
      console.error('Error fetching Invoice:', error);
    }
  };

  useEffect(() => {
    getWardenData();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="table-container">
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
        <Stack className={`modal-footer-container`}>
          <CrewButton size="large" loading={btnLoading} type="submit" variant="contained" stylebutton>
            Submit
          </CrewButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default WardenProfileSection;
