'use client';
import * as Yup from 'yup';
import { Grid, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { CrewRenderFormField } from '../../../components/molecules';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import { AgreementProps, AgreementFormError } from '../../../types/CrewAgreement';
import { ApiErrorResponse } from '../../../types/CrewHostel';
import { CrewButton, CrewTypography, CrewInputField } from '../../../components/atoms';
import { getAllHostelIdAndName } from '../../../helpers/hostel';

const validationSchema = Yup.object().shape({
  hostel: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  agreement: Yup.string().required(errorMessage.selectionDropdown('Agreement')),
  text: Yup.string()
    .max(255, errorMessage.max('Text', 255))
    .matches(/^[a-zA-Z\s]+$/, 'Should contain only ')
    .required(errorMessage.inputField('Text')),
});

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const AgreementFormSection = ({ ...props }: AgreementProps) => {
  const [_formData, setFormData] = useState(props.agreementData);
  const [errors, setErrors] = useState<AgreementFormError>({});
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [hostelId, setHostelId] = useState<string>('');
  const [hostelData, setHostelData] = useState<{ label: string; value: string }[]>([]);

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
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
    const hostelId = getCookie('HostelId');
    if (hostelId !== null || hostelId !== '') {
      setHostelId(hostelId as string);
    }
  }, []);

  const inputs: InputFieldProps[] = [
    {
      type: 'dropdown',
      name: 'hostel',
      id: 'agreement-hostelite',
      label: 'Hostel',
      details: {
        items: hostelData,
        lableVariant: 'body1',
        value: String(_formData?.hostel),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'agreement',
      id: 'agreement',
      label: 'Agreement',
      details: {
        placeholder: 'Select Agreement',
        lableVariant: 'body1',
        value: String(_formData?.agreement),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        console.log('Validated');
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

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="form-secttion">
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
          <Grid item xl={12} lg={12} md={4} sm={6} xs={12} px={1}>
            <CrewInputField
              className="complaint-text-area"
              labelVariant={'body1'}
              label={'Text'}
              type={'input'}
              placeholder={'Enter the Text'}
              value={_formData?.text}
              onValueChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['text']: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ['text']: '',
                }));
              }}
              radius={8}
              error={!!errors?.text}
              errorMessage={errors?.text}
              fullWidth
              minRows={4}
              multiline
              rows={5}
            />
          </Grid>
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
      </Stack>
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
    </form>
  );
};

export default AgreementFormSection;
