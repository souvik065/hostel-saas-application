import { CrewButton, CrewTypography } from '../../../components/atoms';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getErrorClassName } from '../../../utils/ComponentHelper';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import { ParentOrGuardianData } from '../../..//types/CrewRegistration';
import { CrewRenderFormField } from '../../../components/molecules';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { getAddressTypelist, getGenderList } from '../../../utils/mockData';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { formatDateForBackend } from '../../../utils/DateHelper';
import { getAllRelationTypeDetails } from '../../../helpers/parent-registration';
import { ProfileProps } from '../../../types/CrewProfile';
import { getParentProfileDetailById, updateParentData } from '../../../helpers/profile';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(errorMessage.inputField('First Name'))
    .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters and numbers'),
  lastName: Yup.string()
    .required(errorMessage.inputField('Last Name'))
    .matches(/^[a-zA-Z\s.-]+$/, 'Name should contain only letters and numbers'),
  parentImage: Yup.array().min(1, errorMessage.selectionDropdown('At leaset 1 Image')),
  addressTypeId: Yup.string().required(errorMessage.selectionDropdown('Address Type')),
  address1: Yup.string()
    .matches(/^[a-zA-Z0-9\s]+$/, { message: 'Please enter the fields in your address form correctly' })
    .required(errorMessage.inputField('Address 1')),
  address2: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z0-9\s]+$/, {
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
    .matches(/^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: errorMessage.invalidEmailField('email1'),
    })
    .required(errorMessage.inputField('Email')),
  email2: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: errorMessage.invalidEmailField('email2'),
      excludeEmptyString: true,
    }),
  dob: Yup.string().required(errorMessage.selectionDropdown('DOB')),
  profession: Yup.string()
    .required(errorMessage.inputField('Profession'))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters'),
  mobile1: Yup.string().required(errorMessage.inputField('Contact 1')),
  gender: Yup.string().required(errorMessage.selectionDropdown('Gender')),
  // relationTypeId: Yup.string().required(errorMessage.selectionDropdown('Relation Type')),
});

const ParentProfileSection = ({ ...props }: ProfileProps) => {
  const [_formData, setFormData] = useState(props.profileData);
  const [errors, setErrors] = useState<ParentOrGuardianData>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [relationTypeData, setRelationTypeData] = useState<{ label: string; value: string }[]>([]);

  const genderListDataFromApi = getGenderList();
  const addressTypeListDataFromApi = getAddressTypelist();

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    if (name === 'mobile1' || name === 'mobile2') {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'mobile1CountryCode';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'mobile2CountryCode';
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

  const Inputs: InputFieldProps[] = [
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
      type: 'dropdown',
      name: 'addressTypeId',
      id: 'addressTypeId',
      label: 'Address Type',
      details: {
        items: addressTypeListDataFromApi,
        lableVariant: 'body1',
        value: _formData?.addressTypeId,
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
        disabled:true,
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
        disabled:true,
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
      name: 'profession',
      id: 'profession',
      label: 'Profession',
      details: {
        inputType: 'text',
        placeholder: 'Profession',
        lableVariant: 'body1',
        value: _formData?.profession,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        try {
          const dataToUpdate = {
            userId: _formData?.id,
            address1: _formData?.address1,
            address2: _formData?.address2,
            addressTypeId: _formData?.addressTypeId,
            town: _formData?.town,
            district: _formData?.district,
            state: _formData?.state,
            pincode: _formData?.pincode,
            email2: _formData?.email2 === '' ? null : _formData?.email2,
            mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
            gender: _formData?.gender,
            dateOfBirth: formatDateForBackend(_formData?.dob),
            relationTypeId: _formData?.relationTypeId,
            profession: _formData?.profession,
            mobile2CountryCode: _formData?.countryCodeValue2 === '' ? null : _formData?.countryCodeValue2,
          };
          updateParentData(dataToUpdate)
            .then((result) => {
              if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
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
          console.error('Error Update Hostelite:', error);
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

  const getRelationTypes = async () => {
    try {
      const res = await getAllRelationTypeDetails();
      const data = res.data.map((item: any) => ({
        label: item.relationname,
        value: item.id,
      }));
      setRelationTypeData(data);
    } catch (error) {
      console.error('Error fetching relation Type:', error);
    }
  };

  const getParentData = async () => {
    try {
      const parentData = await getParentProfileDetailById();
      if (parentData !== null) {
        console.log('data', parentData.data);
        setFormData({
          ...parentData.data,
          id: parentData.data.userId,
          dob: new Date(parentData.data.dob),
          mobile2: parentData.data.mobile2 === null ? '' : parentData.data.mobile2,
          countryCodeValue1: parentData.data.mobile1CountryCode === null ? 'in' : parentData.data.mobile1CountryCode,
          countryCodeValue2: parentData.data.mobile2CountryCode === null ? 'in' : parentData.data.mobile2CountryCode,
          countryCodeValue3:
            parentData.data.emergencyContactCountryCode === null ? 'in' : parentData.data.emergencyContactCountryCode,
        });
      }
    } catch (error) {
      console.error('Error fetching Invoice:', error);
    }
  };

  useEffect(() => {
    getRelationTypes();
    getParentData();
  }, []);

  return (
    <Stack component={'section'}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} className="form-section">
          <Grid container rowSpacing={2}>
            {Inputs.map((item, index) => (
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

export default ParentProfileSection;
