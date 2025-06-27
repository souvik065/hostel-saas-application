import { CrewTypography } from '../../../components/atoms';
import { CrewMultipleInput } from '../../../components/molecules';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { AssignRelationTypeError, AssignRelationTypeFormError } from '../../../types/Settings';
import { Grid, Stack } from '@mui/material';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { errorMessage } from '../../../constants/app-hostel-constants';
import {
  createRelationType,
  deleteRelationTypeDataById,
  getAllRelationTypeDetails,
  updateRelationType,
} from '../../../helpers/relation-type';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const validationSchema = Yup.object().shape({
  relationname: Yup.string()
    .max(255, errorMessage.max('Relation', 255))
    .required(errorMessage.inputField('Relation'))
    .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
});

const RelationSection = () => {
  const [_formData, setFormData] = useState({
    relationTypes: [{ id: '', relationname: '' }],
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [errors, setErrors] = useState<AssignRelationTypeFormError>({ relationTypes: [] });

  const getAllRelationTypes = async () => {
    try {
      const relationTypeData = await getAllRelationTypeDetails();
      if (relationTypeData !== null) {
        if (relationTypeData.data.length > 0) {
          setFormData((props) => ({
            ...props,
            relationTypes: relationTypeData?.data?.map((types: any) => ({
              id: types.id,
              relationname: types.relationname,
            })),
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching relation types:', error);
    }
  };

  const deleteRelationType = async (id: string) => {
    await deleteRelationTypeDataById(id)
      .then((result) => {
        getAllRelationTypes();
      })
      .catch((err: any) => {
        setBtnLoading(false);
      });
  };

  const handleSaveOrUpdate = async (item: any, index: number) => {
    const data = {
      id: item.id === '' ? null : item.id,
      relationname: item.relationname,
    };
    await validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        if (data.id === '' || data.id === null) {
          createRelationType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllRelationTypes();
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
          updateRelationType(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllRelationTypes();
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
          const validationErrors: AssignRelationTypeFormError = {};
          err.inner.forEach((error) => {
            const realtionTypeError: AssignRelationTypeError = {
              ...validationErrors.relationTypes?.[index],
              relationname: error.message,
            };
            validationErrors.relationTypes = validationErrors.relationTypes || [];
            validationErrors.relationTypes[index] = realtionTypeError;
          });
          setErrors(validationErrors);
        }
      });
  };

  useEffect(() => {
    getAllRelationTypes();
  }, []);

  return (
    <section>
      <Stack spacing={5}>
        <CrewMultipleInput
          items={_formData.relationTypes}
          onChange={(updatedRelationTypes) =>
            setFormData((prevData) => ({ ...prevData, relationTypes: updatedRelationTypes }))
          }
          errors={errors.relationTypes || []}
          label="Relation Type"
          namePrefix="relationTypes"
          itemName="relationname"
          labelVariant="body1"
          onSetErrors={(receivedErrors: AssignRelationTypeError) => {
            setErrors((prevErrors) => ({ ...prevErrors, relationTypes: receivedErrors as AssignRelationTypeError[] }));
          }}
          onHandleDelete={(relationTypeId) => deleteRelationType(relationTypeId)}
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

export default RelationSection;
