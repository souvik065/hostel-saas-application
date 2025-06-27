import { CrewButton, CrewIcon, CrewTypography } from '../../../../components/atoms';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './FormSection.scss';
import * as Yup from 'yup';
import { getErrorClassName, getThemeModeClass } from '../../../../utils/ComponentHelper';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { ParentOrGuardianData, RegParentProps } from '../../../..//types/CrewRegistration';
import { CrewRenderFormField } from '../../../../components/molecules';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewBuilding';
import { getAddressTypelist, getGenderList } from '../../../../utils/mockData';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import { formatDateForBackend } from '../../../../utils/DateHelper';
import { CreateParentRegistration, getAllRelationTypeDetails } from '../../../../helpers/parent-registration';

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
  profession: Yup.string()
    .required(errorMessage.inputField('Profession'))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only letters'),
  mobile1: Yup.string().required(errorMessage.inputField('Contact 1')),
  gender: Yup.string().required(errorMessage.selectionDropdown('Gender')),
  relationTypeId: Yup.string().required(errorMessage.selectionDropdown('Relation Type')),
});

const FormSection = ({ ...props }: RegParentProps) => {
  const [_fatherFormData, setFatherFormData] = useState(props.formData);
  const [_motherFormData, setMotherFormData] = useState(props.formData);
  const [_guardianFormData, setGuardianFormData] = useState(props.formData);

  const [fathererrors, setFatherErrors] = useState<ParentOrGuardianData>({});
  const [mothererrors, setMotherErrors] = useState<ParentOrGuardianData>({});
  const [guardianerrors, setGuardianErrors] = useState<ParentOrGuardianData>({});
  const [btnFatherLoading, setBtnFatherLoading] = useState<boolean>(false);
  const [btnMotherLoading, setBtnMotherLoading] = useState<boolean>(false);
  const [btnGuardianLoading, setBtnGuardianLoading] = useState<boolean>(false);
  const [fatherApiErrors, setFatherApiErrors] = useState<ApiErrorResponse>();
  const [motherApiErrors, setMotherApiErrors] = useState<ApiErrorResponse>();
  const [guardianApiErrors, setGuardianApiErrors] = useState<ApiErrorResponse>();
  const [relationTypeData, setRelationTypeData] = useState<{ label: string; value: string }[]>([]);

  const theme = useTheme();
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const genderListDataFromApi = getGenderList();
  const addressTypeListDataFromApi = getAddressTypelist();

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFatherFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    if (name === 'mobile1' || name === 'mobile2') {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'mobile1CountryCode';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'mobile2CountryCode';
      }
      setFatherFormData((prevData) => ({
        ...prevData,
        [name]: splitedValue[1],
      }));
      setFatherFormData((prevData) => ({
        ...prevData,
        [fieldvalue]: splitedValue[0],
      }));
      setFatherErrors((prevErrors) => ({
        ...prevErrors,
        [fieldvalue]: '',
      }));
    } else {
      setFatherFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setFatherErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleMotherFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;

    if (name === 'mobile1' || name === 'mobile2') {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'mobile1CountryCode';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'mobile2CountryCode';
      }
      setMotherFormData((prevData) => ({
        ...prevData,
        [name]: splitedValue[1],
      }));
      setMotherFormData((prevData) => ({
        ...prevData,
        [fieldvalue]: splitedValue[0],
      }));
      setMotherErrors((prevErrors) => ({
        ...prevErrors,
        [fieldvalue]: '',
      }));
    } else {
      setMotherFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setMotherErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleGuardianFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;

    if (name === 'mobile1' || name === 'mobile2') {
      const splitedValue = value.toString().split(' ');
      let fieldvalue = '';
      if (input.name === 'mobile1') {
        fieldvalue = 'mobile1CountryCode';
      } else if (input.name === 'mobile2') {
        fieldvalue = 'mobile2CountryCode';
      }
      setGuardianFormData((prevData) => ({
        ...prevData,
        [name]: splitedValue[1],
      }));
      setGuardianFormData((prevData) => ({
        ...prevData,
        [fieldvalue]: splitedValue[0],
      }));
      setGuardianErrors((prevErrors) => ({
        ...prevErrors,
        [fieldvalue]: '',
      }));
    } else {
      setGuardianFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setGuardianErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const fatherInputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'firstName',
      id: 'first-name',
      label: 'First Name',
      details: {
        inputType: 'text',
        placeholder: 'First name',
        lableVariant: 'body1',
        value: _fatherFormData?.firstName,
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
        value: _fatherFormData?.lastName,
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
        value: _fatherFormData?.addressTypeId,
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
        value: _fatherFormData?.address1,
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
        value: _fatherFormData?.address2,
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
        value: _fatherFormData?.town,
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
        value: _fatherFormData?.district,
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
        value: _fatherFormData?.state,
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
        value: _fatherFormData?.pincode,
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
        value: _fatherFormData?.email1,
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
        value: _fatherFormData?.email2,
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
        initialDate: _fatherFormData?.dob ? new Date(_fatherFormData?.dob) : new Date(),
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
        phoneNumberValue: _fatherFormData?.mobile1,
        countryCodeValue: _fatherFormData?.mobile1CountryCode,
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
        phoneNumberValue: _fatherFormData?.mobile2,
        countryCodeValue: _fatherFormData?.mobile2CountryCode,
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
        value: _fatherFormData?.gender,
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
        value: _fatherFormData?.profession,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'relationTypeId',
      id: 'relationTypeId',
      label: 'Relation Type',
      details: {
        items: relationTypeData,
        lableVariant: 'body1',
        value: _fatherFormData?.relationTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'imageUpload',
      name: 'parentImage',
      id: 'parentImage',
      label: 'Upload Image',
      details: {
        lableVariant: 'body1',
        initialImages: _fatherFormData?.parentImage || [],
        acceptMultiple: false,
        maximumFileAllowed: 1,
        maxSizeInMb: 3,
      },
      gridValues: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12, px: 1 },
    },
  ];

  const motherInputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'firstName',
      id: 'first-name',
      label: 'First Name',
      details: {
        inputType: 'text',
        placeholder: 'First name',
        lableVariant: 'body1',
        value: _motherFormData?.firstName,
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
        value: _motherFormData?.lastName,
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
        value: _motherFormData?.addressTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        value: _motherFormData?.address1,
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
        value: _motherFormData?.address2,
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
        value: _motherFormData?.town,
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
        value: _motherFormData?.district,
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
        value: _motherFormData?.state,
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
        value: _motherFormData?.pincode,
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
        value: _motherFormData?.email1,
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
        value: _motherFormData?.email2,
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
        initialDate: _motherFormData?.dob ? new Date(_motherFormData?.dob) : new Date(),
        maxDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        phoneNumberValue: _motherFormData?.mobile1,
        countryCodeValue: _motherFormData?.mobile1CountryCode,
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
        phoneNumberValue: _motherFormData?.mobile2,
        countryCodeValue: _motherFormData?.mobile2CountryCode,
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
        value: _motherFormData?.gender,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        value: _motherFormData?.profession,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'relationTypeId',
      id: 'relationTypeId',
      label: 'Relation Type',
      details: {
        items: relationTypeData,
        lableVariant: 'body1',
        value: _motherFormData?.relationTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'imageUpload',
      name: 'parentImage',
      id: 'parentImage',
      label: 'Upload Image',
      details: {
        lableVariant: 'body1',
        initialImages: _motherFormData?.parentImage || [],
        acceptMultiple: false,
        maximumFileAllowed: 1,
        maxSizeInMb: 3,
      },
      gridValues: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12, px: 1 },
    },
  ];

  const guardianInputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'firstName',
      id: 'first-name',
      label: 'First Name',
      details: {
        inputType: 'text',
        placeholder: 'First name',
        lableVariant: 'body1',
        value: _guardianFormData?.firstName,
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
        value: _guardianFormData?.lastName,
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
        value: _guardianFormData?.addressTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        value: _guardianFormData?.address1,
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
        value: _guardianFormData?.address2,
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
        value: _guardianFormData?.town,
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
        value: _guardianFormData?.district,
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
        value: _guardianFormData?.state,
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
        value: _guardianFormData?.pincode,
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
        value: _guardianFormData?.email1,
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
        value: _guardianFormData?.email2,
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
        initialDate: _guardianFormData?.dob ? new Date(_guardianFormData?.dob) : new Date(),
        maxDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        phoneNumberValue: _guardianFormData?.mobile1,
        countryCodeValue: _guardianFormData?.mobile1CountryCode,
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
        phoneNumberValue: _guardianFormData?.mobile2,
        countryCodeValue: _guardianFormData?.mobile2CountryCode,
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
        value: _guardianFormData?.gender,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
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
        value: _guardianFormData?.profession,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'relationTypeId',
      id: 'relationTypeId',
      label: 'Relation Type',
      details: {
        items: relationTypeData,
        lableVariant: 'body1',
        value: _guardianFormData?.relationTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'imageUpload',
      name: 'parentImage',
      id: 'parentImage',
      label: 'Upload Image',
      details: {
        lableVariant: 'body1',
        initialImages: _guardianFormData?.parentImage || [],
        acceptMultiple: false,
        maximumFileAllowed: 1,
        maxSizeInMb: 3,
      },
      gridValues: { xs: 12, md: 6, lg: 6, xl: 6, sm: 12, px: 1 },
    },
  ];

  const handleFather = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnFatherLoading(true);
    setFatherApiErrors({ title: '', errors: [] });
    hadleSubmit('father');
  };

  const handleMother = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnMotherLoading(true);
    setMotherApiErrors({ title: '', errors: [] });
    hadleSubmit('mother');
  };

  const handleGuardian = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnGuardianLoading(true);
    setGuardianApiErrors({ title: '', errors: [] });
    hadleSubmit('guardian');
  };

  const handleSet400APIError = (formattedErrors: ApiErrorItem[], from: string) => {
    if (from === 'father') {
      setFatherApiErrors({
        title: 'Warning',
        errors: formattedErrors,
      });
    } else if (from === 'mother') {
      setMotherApiErrors({
        title: 'Warning',
        errors: formattedErrors,
      });
    } else {
      setGuardianApiErrors({
        title: 'Warning',
        errors: formattedErrors,
      });
    }
  };
  const handleSet404APIError = (data: string, from: string) => {
    if (from === 'father') {
      setFatherApiErrors({
        title: 'Not Found',
        errors: [{ propertyName: 'Error', errorMessage: data }],
      });
    } else if (from === 'mother') {
      setMotherApiErrors({
        title: 'Not Found',
        errors: [{ propertyName: 'Error', errorMessage: data }],
      });
    } else {
      setGuardianApiErrors({
        title: 'Not Found',
        errors: [{ propertyName: 'Error', errorMessage: data }],
      });
    }
  };

  const handleSet500APIError = (from: string) => {
    if (from === 'father') {
      setFatherApiErrors({
        title: 'Error',
        errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
      });
    } else if (from === 'mother') {
      setMotherApiErrors({
        title: 'Error',
        errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
      });
    } else {
      setGuardianApiErrors({
        title: 'Error',
        errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
      });
    }
  };

  const hadleSubmit = async (from: string) => {
    let _formData: ParentOrGuardianData | undefined;

    if (from === 'father') {
      _formData = _fatherFormData;
    } else if (from === 'mother') {
      _formData = _motherFormData;
    } else {
      _formData = _guardianFormData;
    }
    console.log('_formData', _formData);
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        try {
          const dataToCreate = {
            userId: null,
            firstName: _formData?.firstName,
            lastName: _formData?.lastName,
            parentImage: _formData?.parentImage?.length === 0 ? null : _formData?.parentImage?.[0]?.imageUrl,
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
            mobile2: _formData?.mobile2 === '' ? null : _formData?.mobile2,
            hosteliteId: sessionStorage.getItem('hosteliteId'),
            gender: _formData?.gender,
            dateOfBirth: formatDateForBackend(_formData?.dob),
            profession: _formData?.profession,
            isActive: true,
            isImageUpdate: false,
            relationTypeId: _formData?.relationTypeId,
          };
          console.log('dataToCreate', dataToCreate);
          CreateParentRegistration(dataToCreate)
            .then((result) => {
              if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                setFatherFormData({});
                setMotherFormData({});
                setGuardianFormData({});
              } else if (result && result.status === 400) {
                const formattedErrors: ApiErrorItem[] = result?.detail?.errors.map((errorItem: any) => {
                  return {
                    propertyName: errorItem.propertyName,
                    errorMessage: errorItem.errorMessage,
                  };
                });
                handleSet400APIError(formattedErrors, from);
              } else if (result && result.status === 404) {
                handleSet404APIError(result?.detail, from);
              } else {
                handleSet500APIError(from);
              }
              if (from === 'father') {
                setBtnFatherLoading(false);
              } else if (from === 'mother') {
                setBtnMotherLoading(false);
              } else {
                setBtnGuardianLoading(false);
              }
            })
            .catch((err) => {
              if (from === 'father') {
                _formData = _fatherFormData;
                setBtnFatherLoading(false);
              } else if (from === 'mother') {
                setBtnMotherLoading(false);
              } else {
                setBtnGuardianLoading(false);
              }
              console.log(err);
            });
        } catch (error) {
          if (from === 'father') {
            setBtnFatherLoading(false);
          } else if (from === 'mother') {
            setBtnMotherLoading(false);
          } else {
            setBtnGuardianLoading(false);
          }
          console.error('Error Registration Parent:', error);
        }
      })
      .catch((err: Yup.ValidationError) => {
        console.log('err', err);
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        if (from === 'father') {
          setFatherErrors(validationErrors);
          setBtnFatherLoading(false);
        } else if (from === 'mother') {
          setMotherErrors(validationErrors);
          setBtnMotherLoading(false);
        } else {
          setGuardianErrors(validationErrors);
          setBtnGuardianLoading(false);
        }
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

  useEffect(() => {
    getRelationTypes();
  }, []);

  return (
    <Stack component={'section'} className={`parent-wraper ${getThemeModeClass(theme.palette.mode)}`}>
      <Accordion className="accordion-item" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<CrewIcon icon={faCaretDown} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CrewTypography variant={expanded === 'panel1' ? 'h5' : 'subtitle1'}>Father Detail</CrewTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack component={'section'}>
            <form onSubmit={handleFather}>
              <Stack spacing={6} className="form-section">
                <Grid container rowSpacing={2}>
                  {fatherInputs.map((item, index) => (
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
                        handleFieldChange={(value, input) => handleFatherFieldChange(value, input)}
                        errors={fathererrors}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item>
                    {fatherApiErrors && fatherApiErrors.errors.length > 0 && (
                      <Stack>
                        <CrewTypography className={getErrorClassName(fatherApiErrors.title.toLowerCase())}>
                          {fatherApiErrors?.title}:
                        </CrewTypography>
                        <ul>
                          {fatherApiErrors?.errors.map((errorItem, index) => (
                            <li key={index} className={getErrorClassName(fatherApiErrors.title.toLowerCase())}>
                              <CrewTypography
                                className={getErrorClassName(fatherApiErrors.title.toLowerCase())}
                                variant="body2"
                              >
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
                  <CrewButton size="large" loading={btnFatherLoading} type="submit" variant="contained" stylebutton>
                    Submit
                  </CrewButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion-item" expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<CrewIcon icon={faCaretDown} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CrewTypography variant={expanded === 'panel2' ? 'h5' : 'subtitle1'}>Mother Detail</CrewTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack component={'section'}>
            <form onSubmit={handleMother}>
              <Stack spacing={6} className="form-section">
                <Grid container rowSpacing={2}>
                  {motherInputs.map((item, index) => (
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
                        handleFieldChange={(value, input) => handleMotherFieldChange(value, input)}
                        errors={mothererrors}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item>
                    {motherApiErrors && motherApiErrors.errors.length > 0 && (
                      <Stack>
                        <CrewTypography className={getErrorClassName(motherApiErrors.title.toLowerCase())}>
                          {motherApiErrors?.title}:
                        </CrewTypography>
                        <ul>
                          {motherApiErrors?.errors.map((errorItem, index) => (
                            <li key={index} className={getErrorClassName(motherApiErrors.title.toLowerCase())}>
                              <CrewTypography
                                className={getErrorClassName(motherApiErrors.title.toLowerCase())}
                                variant="body2"
                              >
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
                  <CrewButton size="large" loading={btnMotherLoading} type="submit" variant="contained" stylebutton>
                    Submit
                  </CrewButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion className="accordion-item" expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<CrewIcon icon={faCaretDown} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CrewTypography variant={expanded === 'panel3' ? 'h5' : 'subtitle1'}>Guardian Detail</CrewTypography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack component={'section'}>
            <form onSubmit={handleGuardian}>
              <Stack spacing={6} className="form-section">
                <Grid container rowSpacing={2}>
                  {guardianInputs.map((item, index) => (
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
                        handleFieldChange={(value, input) => handleGuardianFieldChange(value, input)}
                        errors={guardianerrors}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item>
                    {guardianApiErrors && guardianApiErrors.errors.length > 0 && (
                      <Stack>
                        <CrewTypography className={getErrorClassName(guardianApiErrors.title.toLowerCase())}>
                          {guardianApiErrors?.title}:
                        </CrewTypography>
                        <ul>
                          {guardianApiErrors?.errors.map((errorItem, index) => (
                            <li key={index} className={getErrorClassName(guardianApiErrors.title.toLowerCase())}>
                              <CrewTypography
                                className={getErrorClassName(guardianApiErrors.title.toLowerCase())}
                                variant="body2"
                              >
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
                  <CrewButton size="large" loading={btnGuardianLoading} type="submit" variant="contained" stylebutton>
                    Submit
                  </CrewButton>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default FormSection;
