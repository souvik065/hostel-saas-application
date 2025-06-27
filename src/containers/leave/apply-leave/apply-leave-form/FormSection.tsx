import { errorMessage } from '../../../../constants/app-hostel-constants';
import { CrewButton, CrewTypography } from '../../../../components/atoms';
import { CrewRenderFormField } from '../../../../components/molecules';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewHostel';
import { CreateLeaveFormError, leaveFormProps } from '../../../../types/Leave';
import { Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { compareDates, formatDateUTCForBackend } from '../../../../utils/DateHelper';
import { createLeaveData, updateLeaveData } from '../../../../helpers/leave';
import { getCookie } from 'cookies-next';
import './FormSection.scss';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required('Hostel must be selected'),
  leaveType: Yup.string().required(errorMessage.selectionDropdown('Leave Type')),
  reason: Yup.string()
    .max(255, errorMessage.max('Reason', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Reason')),
  fromDate: Yup.date().required(errorMessage.inputField('From Date')),
  toDate: Yup.date()
    .test('is-greater', 'To Date must be after From Date', function (value) {
      const { fromDate } = this.parent;
      if (value) {
        const toDate: Date = value instanceof Date ? value : new Date(value);
        const fromDateObj: Date = fromDate instanceof Date ? fromDate : new Date(fromDate);
        return compareDates(fromDateObj, toDate, 'after');
      }
      return false;
    })
    .required(errorMessage.inputField('To Date')),
});

const FormSection = ({ ...props }: leaveFormProps) => {
  const [_formData, setFormData] = useState(props.leaveData);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateLeaveFormError>();

  const inputs: InputFieldProps[] = [
    {
      type: 'dropdown',
      name: 'leaveType',
      id: 'leaveType',
      label: 'Leave Type',
      details: {
        placeholder: 'Select Leave Type',
        lableVariant: 'body1',
        items: props?.leaveTypes,
        value: _formData?.leaveType,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'reason',
      id: 'reason',
      label: 'reason',
      details: {
        inputType: 'text',
        placeholder: 'Type reason',
        lableVariant: 'body1',
        value: _formData?.reason,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'date-picker',
      name: 'fromDate',
      id: 'fromdate',
      label: 'From Date',
      details: {
        placeholder: 'From Date',
        lableVariant: 'body1',
        initialDate: _formData?.fromDate ? new Date(_formData?.fromDate) : new Date(),
        minDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'date-picker',
      name: 'toDate',
      id: 'todate',
      label: 'To Date',
      details: {
        placeholder: 'To Date',
        lableVariant: 'body1',
        initialDate: _formData?.toDate ? new Date(_formData?.toDate) : new Date(),
        minDate: new Date(),
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
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        //api call goes here
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              id: null,
              hostelId: _formData.hostelId,
              reason: _formData?.reason,
              fromDate: formatDateUTCForBackend(_formData?.fromDate as Date),
              toDate: formatDateUTCForBackend(_formData?.toDate as Date),
              leaveType: _formData.leaveType,
            };
            createLeaveData(dataToCreate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    hostelId: getCookie('HostelId'),
                    fromDate: new Date(),
                    toDate: new Date(),
                    reason: '',
                    leaveType: '',
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
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail?.detail }],
                  });
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }

                setBtnLoading(false);
                props.getAllleaves?.();
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
              hostelId: getCookie('HostelId'),
              reason: _formData?.reason,
              fromDate: formatDateUTCForBackend(new Date(_formData?.fromDate || '')),
              toDate: formatDateUTCForBackend(new Date(_formData?.toDate || '')),
              leaveType: _formData?.leaveType,
            };
            updateLeaveData(dataToUpdate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    hostelId: '',
                    fromDate: new Date(),
                    toDate: new Date(),
                    reason: '',
                    leaveType: '',
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
                props.getAllleaves?.();
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
          validationErrors[error.path || ''] = error.message;
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
            setApiErrors({
              title: 'Error',
              errors: [{ propertyName: 'Error', errorMessage: error?.message }],
            });
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
