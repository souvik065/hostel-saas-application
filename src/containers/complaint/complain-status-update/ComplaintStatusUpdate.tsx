import { getAllStatusIdAndName, updateComplaintStatus } from '../../../helpers/complaint';
import { CrewButton, CrewInputField, CrewSelect, CrewTypography } from '../../../components/atoms';
import { errorMessage } from '../../../constants/app-hostel-constants';
import {
  ApiErrorItem,
  ApiErrorResponse,
  ComplainStatusFormError,
  ComplaintStatusFormProps,
} from '../../../types/Complaint';
import { getErrorClassName } from '../../../utils/ComponentHelper';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  reason: Yup.string()
    .max(255, errorMessage.max('Reason', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Reason')),
  statusId: Yup.string().required(errorMessage.selectionDropdown('Status')),
});

const ComplaintStatusUpdate = ({ ...props }: ComplaintStatusFormProps) => {
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ComplainStatusFormError>();
  const [statusData, setStatusData] = useState<{ label: string; value: string }[]>([]);
  const [_formData, setFormData] = useState({ statusId: '', reason: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        //api call goes here
        const data = {
          id: props.complaintData?.id,
          statusId: _formData?.statusId,
          remarks: _formData?.reason,
        };
        if (props?.role === 'Warden') {
          updateComplaintStatus(data).then((result) => {
            if ((result && result.status === 'Success') || result.status === 200) {
              setFormData({ statusId: '', reason: '' });
              props?.closeModal?.();
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
          });
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
  const getAllStatusIdsAndNames = async () => {
    try {
      const statusNameAndIds = await getAllStatusIdAndName();

      if (statusNameAndIds && statusNameAndIds?.data?.length > 0) {
        const transformedStatusData = statusNameAndIds?.data.map((item: any) => ({
          label: item.statusName,
          value: item.id.toString(),
        }));
        setStatusData(transformedStatusData);
      }
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  useEffect(() => {
    getAllStatusIdsAndNames();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="form-container">
        <Grid container rowSpacing={2}>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12} px={1}>
            <CrewSelect
              label={'Status'}
              className="dropdown"
              value={_formData?.statusId}
              menuItems={statusData}
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['statusId']: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ['statusId']: '',
                }));
              }}
              labelVariant={'body1'}
              error={!!errors?.statusId}
              errorMessage={errors?.statusId}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={1}>
            <CrewInputField
              className="complaint-text-area"
              labelVariant={'body1'}
              label={'Reason'}
              type={'input'}
              placeholder={'Type reason'}
              value={_formData?.reason}
              onValueChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  ['reason']: value,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  ['reason']: '',
                }));
              }}
              error={!!errors?.reason}
              errorMessage={errors?.reason}
              radius={8}
              fullWidth
              multiline
              rows={5}
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

export default ComplaintStatusUpdate;
