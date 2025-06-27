import { CrewTypography } from '../../../components/atoms';
import { CrewMultipleInput } from '../../../components/molecules';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { AssignPlanTypeError, AssignPlanTypeFormError } from '../../../types/Settings';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCookie } from 'cookies-next';
import {
  createPlanType,
  deletePlanTypeDataById,
  getPlanTypeDetailsByHostelId,
  updatePlanType,
} from '../../../helpers/plan-type';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  name: Yup.string()
    .max(255, errorMessage.max('Name', 255))
    .required(errorMessage.inputField('Name'))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
});

const PlanTypeSection = () => {
  const [_formData, setFormData] = useState({
    hostelId: getCookie('HostelId'),
    planTypes: [{ id: '', name: '' }],
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [errors, setErrors] = useState<AssignPlanTypeFormError>({ planTypes: [] });

  const getAllPlanTypesByHostelId = async (id: string) => {
    try {
      const planTypeData = await getPlanTypeDetailsByHostelId(id);
      if (planTypeData !== null) {
        if (planTypeData.data.length > 0) {
          setFormData((props) => ({
            ...props,
            planTypes: planTypeData?.data?.map((types: any) => ({
              id: types.id,
              name: types.name,
            })),
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching Plan types:', error);
    }
  };

  const deletePlanType = async (id: string) => {
    await deletePlanTypeDataById(id)
      .then((result) => {
        if (_formData?.hostelId) {
          getAllPlanTypesByHostelId(_formData?.hostelId);
        }
      })
      .catch((err: any) => {
        setBtnLoading(false);
      });
  };

  const handleSaveOrUpdate = async (item: any, index: number) => {
    const data = {
      id: item.id === '' ? null : item.id,
      name: item.name,
      hostelId: _formData.hostelId,
    };
    await validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        if (data.id === '' || data.id === null) {
          createPlanType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllPlanTypesByHostelId(data?.hostelId ?? '');
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
          updatePlanType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllPlanTypesByHostelId(data?.hostelId ?? '');
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
          const validationErrors: AssignPlanTypeFormError = {};
          err.inner.forEach((error) => {
            if (error.path === 'hostelId') {
              validationErrors.hostelId = error.message;
              setApiErrors({
                title: 'Error',
                errors: [{ propertyName: 'Error', errorMessage: error?.message }],
              });
            } else {
              const planTypeError: AssignPlanTypeError = {
                ...validationErrors.planTypes?.[index],
                name: error.message,
              };
              validationErrors.planTypes = validationErrors.planTypes || [];
              validationErrors.planTypes[index] = planTypeError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  useEffect(() => {
    if (_formData.hostelId) {
      getAllPlanTypesByHostelId(_formData.hostelId);
    }
  }, []);

   
  useEffect(() => {
    if (_formData.hostelId) {
      getAllPlanTypesByHostelId(_formData.hostelId);
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
          items={_formData.planTypes}
          onChange={(updatedPlanTypes) => setFormData((prevData) => ({ ...prevData, planTypes: updatedPlanTypes }))}
          errors={errors.planTypes || []}
          label="Plan Type"
          namePrefix="planTypes"
          itemName="name"
          labelVariant="body1"
          onSetErrors={(receivedErrors: AssignPlanTypeError) => {
            setErrors((prevErrors) => ({ ...prevErrors, planTypes: receivedErrors as AssignPlanTypeError[] }));
          }}
          onHandleDelete={(planTypeId) => deletePlanType(planTypeId)}
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

export default PlanTypeSection;
