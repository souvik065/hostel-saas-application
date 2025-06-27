'use client';
import { CrewButton, CrewTypography } from '../../../../components/atoms';
import { CrewRenderFormField } from '../../../../components/molecules';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import './HostelFormSection.scss';
import {
  ApiErrorItem,
  ApiErrorResponse,
  CreateHostelFormError,
  HostelImages,
  HostelProps,
} from '../../../../types/CrewHostel';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import * as Yup from 'yup';
import { createHostelData, updateHostelData } from '../../../../helpers/hostel';

export interface Image {
  id: string | null;
  imageUrl: string;
  filename: string;
  isActive: boolean;
}

const validationSchema = Yup.object().shape({
  hostelName: Yup.string()
    .required(errorMessage.inputField('Hostel Name'))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
  email1: Yup.string()
    .matches(/^[a-z0-9_.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: errorMessage.invalidEmailField('email1'),
    })
    .required(errorMessage.inputField('Email')),
  email2: Yup.string()
    .nullable()
    .matches(/^[a-z0-9_.+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, {
      message: errorMessage.invalidEmailField('email2'),
      excludeEmptyString: true,
    }),
  mobile1: Yup.string().required(errorMessage.inputField('Phone')),

  address1: Yup.string()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, { message: 'Please enter the fields in your address form correctly' })
    .required(errorMessage.inputField('Address 1')),
  address2: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z0-9\s,\/-]+$/, {
      message: 'Should contain Alpha-numerics with special charecters like ., -, , ,/',
      excludeEmptyString: true,
    }),
  town: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, { message: 'Should contain Alpha-numerics with special charecters like ., -, , ,/' })
    .required(errorMessage.inputField('Town')),
  district: Yup.string()
    .required(errorMessage.inputField('District '))
    .matches(/^[a-zA-Z\s]+$/, 'District should contain only letters'),
  state: Yup.string()
    .required(errorMessage.inputField('State'))
    .matches(/^[a-zA-Z\s]+$/, 'State should contain only letters'),
  pincode: Yup.string()
    .max(6)
    .matches(/^[1-9][0-9]*$/, 'PIN should be a non-zero number')
    .required(errorMessage.inputField('Pincode')),
  images: Yup.array().min(1, errorMessage.selectionDropdown('At leaset 1 Image')),
});

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const HostelFormSection = ({ ...props }: HostelProps) => {
  const [_formData, setFormData] = useState(props.hostelData);
  const [errors, setErrors] = useState<CreateHostelFormError>({});
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [convertedImages, setConvertedImages] = useState<HostelImages[]>([]);

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    if (name === 'images') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value as Image[],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      const data = convertImagesToHostelImages(value as Image[]);
      setConvertedImages(data);
    } else if (name === 'mobile1' || name === 'mobile2') {
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
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const inputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'hostelName',
      id: 'hostelName',
      label: 'Hostel Name',
      details: {
        inputType: 'text',
        placeholder: 'Hostel name',
        lableVariant: 'body1',
        value: _formData?.hostelName,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'email1',
      id: 'email-1',
      label: 'Email ID 1',
      details: {
        inputType: 'text',
        placeholder: 'Type mail 1',
        lableVariant: 'body1',
        value: _formData?.email1,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'email2',
      id: 'email-2',
      label: 'Email ID 2',
      details: {
        inputType: 'text',
        placeholder: 'Type mail 2',
        lableVariant: 'body1',
        value: _formData?.email2,
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
        phoneNumberValue: _formData?.mobile2,
        countryCodeValue: _formData?.countryCodeValue2,
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
        placeholder: 'Type address 1',
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
        placeholder: 'Type town',
        lableVariant: 'body1',
        value: _formData?.town,
      },

      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'state',
      id: 'state',
      label: 'state',
      details: {
        inputType: 'text',
        placeholder: 'Type state',
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
        placeholder: 'Type district',
        lableVariant: 'body1',
        value: _formData?.district,
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
      type: 'imageUpload',
      name: 'images',
      id: 'images',
      label: 'Hostel',
      details: {
        lableVariant: 'body1',
        initialImages: _formData?.images || [],
        acceptMultiple: true,
        maximumFileAllowed: 4,
        maxSizeInMb: 1,
      },
      gridValues: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12, px: 1 },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        //api call goes here
        //Create Hostel if Id is null or empty
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              id: null,
              hostelName: _formData?.hostelName,
              hostelLogo: null,
              images: convertedImages,
              email1: _formData?.email1,
              email2: _formData?.email2 === '' ? null : _formData?.email2,
              mobile1: _formData?.mobile1,
              mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
              address1: _formData?.address1,
              address2: _formData?.address2 === '' ? null : _formData?.address2,
              town: _formData?.town,
              district: _formData?.district,
              state: _formData?.state,
              pincode: _formData?.pincode,
              isLogoUpdate: false,
              mobile1CountryCode: _formData?.countryCodeValue1,
              mobile2CountryCode: _formData?.countryCodeValue2 === '' ? null : _formData?.countryCodeValue2,
            };
            createHostelData(dataToCreate)
              .then((result) => {
                if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                  setFormData({
                    id: '',
                    hostelName: '',
                    email1: '',
                    email2: '',
                    mobile1: '',
                    mobile2: '',
                    address1: '',
                    address2: '',
                    town: '',
                    district: '',
                    state: '',
                    pincode: '',
                    countryCodeValue1: '',
                    countryCodeValue2: '',
                    images: null,
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
                props.getAllHostel?.();
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error fetching Hostels:', error);
          }
        } else {
          try {
            const dataToUpdate = {
              id: _formData?.id,
              hostelName: _formData?.hostelName,
              images: convertedImages,
              hostelLogo: null,
              email1: _formData?.email1,
              email2: _formData?.email2 === '' ? null : _formData?.email2,
              mobile1: _formData?.mobile1,
              mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
              address1: _formData?.address1,
              address2: _formData?.address2 === '' ? null : _formData?.address2,
              town: _formData?.town,
              district: _formData?.district,
              state: _formData?.state,
              pincode: _formData?.pincode,
              isLogoUpdate: false,
              mobile1CountryCode: _formData?.countryCodeValue1,
              mobile2CountryCode: _formData?.countryCodeValue2,
            };
            updateHostelData(dataToUpdate)
              .then((result) => {
                if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                  setFormData({
                    id: '',
                    hostelName: '',
                    email1: '',
                    email2: '',
                    mobile1: '',
                    mobile2: '',
                    address1: '',
                    address2: '',
                    town: '',
                    district: '',
                    state: '',
                    pincode: '',
                    countryCodeValue1: '',
                    countryCodeValue2: '',
                    images: [],
                  });
                  props.closeModal?.();
                } else if (result && result.status === 400) {
                  // Process validation errors
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
                props.getAllHostel?.();
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error fetching facilities:', error);
          }
        }
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path === 'mobile1') {
            validationErrors.mobile1 = error.message;
          }
          validationErrors[error.path || ''] = error.message;
        });

        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  const convertImagesToHostelImages = (images: Image[]): HostelImages[] => {
    return images.map((image) => ({
      id: image.id || null,
      hostelImage: image.imageUrl,
      isActive: image.isActive,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="form-container">
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
                handleFieldChange={(value, input, option) => handleFieldChange(value, input, option)}
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
  );
};

export default HostelFormSection;
