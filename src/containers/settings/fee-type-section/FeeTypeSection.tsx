import {
  createFeeType,
  deleteFeeTypeDataById,
  getFeeTypeDetailsByHostelId,
  updateFeeType,
} from '../../../helpers/fee-type';
import { CrewTypography } from '../../../components/atoms';
import { CrewMultipleInput } from '../../../components/molecules';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { AssignFeeTypeError, AssignFeeTypeFormError } from '../../../types/Settings';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCookie } from 'cookies-next';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  type: Yup.string()
    .max(255, errorMessage.max('Type', 255))
    .required(errorMessage.inputField('Name'))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Type should contain only letters and numbers'),
});

const FeeTypeSection = () => {
  const [_formData, setFormData] = useState({
    hostelId: getCookie('HostelId'),
    feeTypes: [{ id: '', type: '' }],
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [errors, setErrors] = useState<AssignFeeTypeFormError>({ feeTypes: [] });

  const getAllFeeTypesByHostelId = async (id: string) => {
    try {
      const feeTypeData = await getFeeTypeDetailsByHostelId(id);
      if (feeTypeData !== null) {
        if (feeTypeData.data.length > 0) {
          setFormData((props) => ({
            ...props,
            feeTypes: feeTypeData?.data?.map((types: any) => ({
              id: types.id,
              type: types.type,
            })),
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching fee types:', error);
    }
  };

  const deleteFeeType = async (id: string) => {
    await deleteFeeTypeDataById(id)
      .then((result) => {
        if (_formData?.hostelId) {
          getAllFeeTypesByHostelId(_formData?.hostelId);
        }
      })
      .catch((err: any) => {
        setBtnLoading(false);
      });
  };

  const handleSaveOrUpdate = async (item: any, index: number) => {
    const data = {
      id: item.id === '' ? null : item.id,
      type: item.type,
      hostelId: _formData.hostelId,
    };
    await validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        if (data.id === '' || data.id === null) {
          createFeeType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllFeeTypesByHostelId(data?.hostelId ?? '');
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
        } else {
          updateFeeType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllFeeTypesByHostelId(data?.hostelId ?? '');
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
        }
      })
      .catch((err: Yup.ValidationError) => {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: AssignFeeTypeFormError = {};
          err.inner.forEach((error) => {
            if (error.path === 'hostelId') {
              validationErrors.hostelId = error.message;
              setApiErrors({
                title: 'Error',
                errors: [{ propertyName: 'Error', errorMessage: error?.message }],
              });
            } else {
              const planTypeError: AssignFeeTypeError = {
                ...validationErrors.feeTypes?.[index],
                type: error.message,
              };
              validationErrors.feeTypes = validationErrors.feeTypes || [];
              validationErrors.feeTypes[index] = planTypeError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  useEffect(() => {
    if (_formData.hostelId) {
      getAllFeeTypesByHostelId(_formData.hostelId);
    }
  }, []);

  useEffect(() => {
    if (_formData.hostelId) {
      getAllFeeTypesByHostelId(_formData.hostelId);
    }
  }, [_formData.hostelId]);

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

  return (
    <section>
      <Stack spacing={5}>
        <CrewMultipleInput
          items={_formData.feeTypes}
          onChange={(updatedFeeTypes) => setFormData((prevData) => ({ ...prevData, feeTypes: updatedFeeTypes }))}
          errors={errors.feeTypes || []}
          label="Fee Type"
          namePrefix="feeTypes"
          itemName="type"
          labelVariant="body1"
          onSetErrors={(receivedErrors: AssignFeeTypeError) => {
            setErrors((prevErrors) => ({ ...prevErrors, type: receivedErrors as AssignFeeTypeError[] }));
          }}
          onHandleDelete={(feeTypeId) => deleteFeeType(feeTypeId)}
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

export default FeeTypeSection;
