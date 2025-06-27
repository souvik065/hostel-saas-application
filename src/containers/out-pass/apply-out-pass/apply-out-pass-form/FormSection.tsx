import { errorMessage } from '../../../../constants/app-hostel-constants';
import { CrewButton, CrewTypography } from '../../../../components/atoms';
import { CrewRenderFormField } from '../../../../components/molecules';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewHostel';
import { Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { convertTimeToDateTimeString, formatDateForBackend, isTimeBefore } from '../../../../utils/DateHelper';
import { CreateOutPassFormError, OutPassFormProps } from '../../../../types/OutPassProps';
import './FormSection.scss';
import { createOutPassData, updateOutPassData } from '../../../../helpers/out-pass';
import { getCookie } from 'cookies-next';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  timeFrom: Yup.string().required(errorMessage.inputField('Time From')),
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  timeTo: Yup.string()
    .test('to_time_test', 'To time must be after From time', function (value) {
      const { timeFrom } = this.parent;
      return isTimeBefore(timeFrom, value || '');
    })
    .required(errorMessage.inputField('Time To')),
});

const FormSection = ({ ...props }: OutPassFormProps) => {
  const [_formData, setFormData] = useState(props.outPassData);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateOutPassFormError>();

  const inputs: InputFieldProps[] = [
    {
      type: 'date-picker',
      name: 'date',
      id: 'date',
      label: 'Date',
      details: {
        placeholder: 'Select Date',
        lableVariant: 'body1',
        initialDate: _formData?.date ? new Date(_formData?.date) : new Date(),
        minDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'time-picker',
      name: 'timeFrom',
      id: 'timeFrom',
      label: 'From Time',
      details: {
        placeholder: 'Select Time',
        lableVariant: 'body1',
        initialValue: _formData?.timeFrom,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'time-picker',
      name: 'timeTo',
      id: 'timeTo',
      label: 'To Time',
      details: {
        placeholder: 'Select Time',
        lableVariant: 'body1',
        initialValue: _formData?.timeTo,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
  ];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              hostelId: _formData?.hostelId,
              hosteliteId: null,
              date: formatDateForBackend(_formData?.date),
              timeFrom: convertTimeToDateTimeString(_formData.timeFrom || ''),
              timeTo: convertTimeToDateTimeString(_formData.timeTo || ''),
            };
            createOutPassData(dataToCreate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    hostelId: getCookie('HostelId'),
                    date: new Date(),
                    timeFrom: '',
                    timeTo: '',
                  });
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
                } else if ((result && result.status === 404) || result.status === 409) {
                  setApiErrors({
                    title: 'Not Found',
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                  });
                } else if (result && result.status === 409) {
                  setApiErrors({
                    title: result?.type,
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                  });
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
                setBtnLoading(false);
                props.getAllOutPassList?.();
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error Creating out Pass:', error);
          }
        } else {
          try {
            const dataToUpdate = {
              id: _formData?.id,
              hostelId: _formData?.hostelId,
              hosteliteId: null,
              date: formatDateForBackend(new Date(_formData?.date || '')),
              timeFrom: convertTimeToDateTimeString(_formData?.timeFrom || ''),
              timeTo: convertTimeToDateTimeString(_formData?.timeTo || ''),
            };
            updateOutPassData(dataToUpdate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    hostelId: getCookie('HostelId'),
                    date: new Date(),
                    timeFrom: '',
                    timeTo: '',
                  });
                  props.closeModal?.();
                } else if (result && result.status === 400) {
                  // Process validation errors
                  const formattedErrors: ApiErrorItem[] = result.data.errors.map((errorItem: any) => {
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
                props.getAllOutPassList?.();
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error Update out Pass:', error);
          }
        }
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
            setApiErrors({
              title: 'Error',
              errors: [{ propertyName: 'Error', errorMessage: error?.message }],
            });
          }    else {
              validationErrors[error.path || ''] = error.message;
          }
        });
        setErrors(validationErrors);
        setBtnLoading(false);
      });
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
                handleFieldChange={(value, input) => handleFieldChange(value, input)}
                errors={errors || {}}
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

export default FormSection;
