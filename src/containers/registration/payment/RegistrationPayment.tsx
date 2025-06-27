import { CrewTypography } from '../../../components/atoms';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCookie } from 'cookies-next';
import { AssignPaymentError, AssignPaymentItemFormError } from '../../../types/CrewRegistration';
import CrewMultiDropDown from '../../../components/molecules/multi-dropdwon/CrewMultiDropDown';
import { getAllFeesStructureByHostelId } from '../../../helpers/fees-struture';
import { CreatePaymentRegistration } from '../../../helpers/payment-registration';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  hosteliteId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  feesStructures: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required(errorMessage.selectionDropdown('Name')),
    }),
  ),
});

const RegistrationPayment = () => {
  const [_formData, setFormData] = useState({
    hostelId: getCookie('HostelId'),
    hosteliteId: getCookie('HosteliteId'),
    feesStructures: [{ id: '', name: '' }],
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [errors, setErrors] = useState<AssignPaymentItemFormError>({ feesStructures: [] });
  const [feesStructureData, setFeesStructure] = useState<{ label: string; value: string }[]>([]);

  const getAllFeesListByHostelId = async (id: string) => {
    const feesList = await getAllFeesStructureByHostelId(id);
    if (feesList !== null) {
      if (feesList.data.length > 0) {
        const transformedFeesStructureData = feesList?.data.map((item: any) => ({
          label: item.name,
          value: item.id,
        }));
        setFeesStructure(transformedFeesStructureData);
      }
    }
  };

  const handleSaveOrUpdate = async (item: any, index: number) => {
    const data = {
      hostelId: getCookie('HostelId'),
      hosteliteId: getCookie('HosteliteId'),
      feeStructureId: item.name,
    };
    await validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        CreatePaymentRegistration(data)
          .then((result) => {
            if ((result && result.status === 'Success') || result.status === 200) {
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
            } else if (result && result.status === 500) {
              setApiErrors({
                title: 'Error',
                errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
              });
            }
            setBtnLoading(false);
          })
          .catch((err: any) => {
            setBtnLoading(false);
          });
      })
      .catch((err: Yup.ValidationError) => {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: AssignPaymentItemFormError = {};
          err.inner.forEach((error) => {
            if (error.path === 'hosteliteId') {
              validationErrors.hosteliteId = error.message;
              setApiErrors({
                title: 'Error',
                errors: [{ propertyName: 'Error', errorMessage: error?.message }],
              });
            } else {
              const planTypeError: AssignPaymentError = {
                ...validationErrors.feesStructures?.[index],
                name: error.message,
              };
              validationErrors.feesStructures = validationErrors.feesStructures || [];
              validationErrors.feesStructures[index] = planTypeError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  useEffect(() => {
    const handleHostelChange = (event: CustomEvent<{ selectedHostel: string }>) => {
      const newHostelId = event.detail.selectedHostel;
      setFormData((preview) => ({ ...preview, hostelId: newHostelId }));
    };
    document.addEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    };
  }, []);

  const getFeesList = () => {
    if (_formData?.hostelId) {
      getAllFeesListByHostelId(_formData.hostelId);
    }
  };

  useEffect(() => {
    getFeesList();
  }, []);

  return (
    <section>
      <Stack spacing={5}>
        <CrewMultiDropDown
          items={_formData.feesStructures}
          menuItems={feesStructureData}
          onChange={(updatedFeeTypes) => setFormData((prevData) => ({ ...prevData, feeTypes: updatedFeeTypes }))}
          errors={errors.feesStructures || []}
          label="Fees Name"
          namePrefix="feesStructures"
          itemName="name"
          labelVariant="body1"
          onSetErrors={(receivedErrors: AssignPaymentError) => {
            setErrors((prevErrors) => ({ ...prevErrors, feesStructures: receivedErrors as AssignPaymentError[] }));
          }}
          itemButton
          onSaveOrUpdate={handleSaveOrUpdate}
        />
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
    </section>
  );
};

export default RegistrationPayment;
