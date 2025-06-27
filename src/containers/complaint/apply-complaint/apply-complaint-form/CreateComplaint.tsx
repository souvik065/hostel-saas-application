import { Grid, Stack } from '@mui/material';
import { CrewButton, CrewInputField, CrewSelect, CrewTypography } from '../../../../components/atoms';
import { ApiErrorItem, ApiErrorResponse, ComplaintFormError, ComplaintFormProps } from '../../../../types/Complaint';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import { getComplaintTypeList } from '../../../../utils/mockData';
import { getErrorClassName } from '../../../../utils/ComponentHelper';
import { createComplaintData, updateComplaintData } from '../../../../helpers/complaint';
import { getCookie } from 'cookies-next';

const validationSchema = Yup.object().shape({
  notes: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Note should contain only letters')
    .required('Note is required')
    .max(500, errorMessage.max('Note', 500)),
  hostelId: Yup.string().required('Hostel Must be selected'),
  type: Yup.string().required('Type Must be selected'),
});

const CreateComplaint = ({ ...props }: ComplaintFormProps) => {
  const [_formData, setFormData] = useState(props?.complaintData);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ComplaintFormError>({});
  const complaintTypeList = getComplaintTypeList();
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              id: null,
              hostelId: _formData.hostelId,
              type: _formData?.type,
              notes: _formData?.notes,
            };
            createComplaintData(dataToCreate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    complaintNo: '',
                    hostelId: getCookie('HostelId'),
                    notes: '',
                    type: '',
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
                props.getAllcomplaint?.();
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
              hostelId: _formData?.hostelId,
              type: _formData?.type,
              notes: _formData?.notes,
            };
            updateComplaintData(dataToUpdate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  setFormData({
                    id: '',
                    complaintNo: '',
                    hostelId: getCookie('HostelId'),
                    notes: '',
                    type: '',
                  });
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
                props.getAllcomplaint?.();
                props.closeModal?.();
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
          <Grid item xl={3} lg={4} md={4} sm={12} xs={12} px={1}>
            <CrewSelect
              labelVariant={'body1'}
              label={'Complaint Type'}
              placeholder={'Select complaint type'}
              value={_formData?.type}
              menuItems={complaintTypeList}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['type']: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ['type']: '',
                }));
              }}
              error={!!errors.type}
              errorMessage={errors.type}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={1}>
            <CrewInputField
              className="complaint-text-area"
              labelVariant={'body1'}
              label={'Note'}
              type={'input'}
              placeholder={'Type note'}
              value={_formData?.notes}
              onValueChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['notes']: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ['notes']: '',
                }));
              }}
              radius={8}
              fullWidth
              multiline
              rows={5}
              error={!!errors.notes}
              errorMessage={errors.notes}
            />
          </Grid>
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

export default CreateComplaint;
