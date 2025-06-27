import { CrewButton, CrewInputField, CrewTypography } from '../../../../components/atoms';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewHostel';
import { Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { getErrorClassName } from '../../../../utils/ComponentHelper';
import * as Yup from 'yup';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import { OutPassApprovalFormError, OutPassApprovalFormProps } from '../../../../types/OutPassProps';
import { ApproveOutPassFromParent } from '../../../../helpers/out-pass';

const validationSchema = Yup.object().shape({
  reason: Yup.string()
    .max(255, errorMessage.max('Reason', 255))
    .matches(/^[a-zA-Z0-9\s,]+$/, 'Should contain only letters and numbers')
    .required(errorMessage.inputField('Reason')),
});

const FormSection = ({ ...props }: OutPassApprovalFormProps) => {
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<OutPassApprovalFormError>();
  const [reason, setReason] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate({ reason: reason }, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        //api call goes here
        const data = {
          id: props.outPassData?.id,
          approvalStatusId: props?.statusId,
          remarks: reason,
        };
        if (props?.role === 'Parent') {
          ApproveOutPassFromParent(data).then((result) => {
            if ((result && result.status === 'Success') || result.status === 200) {
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
            props.getAllOutPass?.();
          });
        } else if (props?.role === 'Warden') {
          ApproveOutPassFromParent(data).then((result) => {
            if ((result && result.status === 'Success') || result.status === 200) {
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
            props.getAllOutPass?.();
          });
        }
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        console.log(validationErrors);
        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="form-container">
        <Grid container rowSpacing={2}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} px={1}>
            <CrewInputField
              className="complaint-text-area"
              labelVariant={'body1'}
              label={'Reason'}
              type={'input'}
              placeholder={'Type reason'}
              value={reason}
              onValueChange={(value) => setReason(value)}
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
