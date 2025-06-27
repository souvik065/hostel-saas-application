'use client';
import { CrewButton, CrewTypography } from '../../components/atoms';
import { CrewMultiSelectAndInput } from '../../components/organisms';
import { displayTexts, errorMessage } from '../../constants/app-hostel-constants';
import {
  createAssignWarden,
  deleteAssignWardenById,
  getAllAssignWardenByHostelId,
  getAllWardens,
} from '@/helpers/assign-warden';
import { ApiErrorItem, ApiErrorResponse } from '../../types/CrewBuilding';
import { AssignWardenFormError, AssignWardenError } from '../../types/CrewWarden';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  wardens: Yup.array().of(
    Yup.object().shape({
      wardenId: Yup.string().required(errorMessage.selectionDropdown('Warden')),
      wardenDescription: Yup.string()
        .max(255, errorMessage.max('Description name', 255))
        .required(errorMessage.inputField('Description name'))
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
    }),
  ),
});

interface Props {
  hostelId: string;
}

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};
const AssignWardenSection = ({ hostelId }: Props) => {
  const [_formData, setFormData] = useState({
    hostelId: '',
    wardens: [{ id: '', wardenId: '', wardenDescription: '' }],
  });

  const [errors, setErrors] = useState<AssignWardenFormError>({});
  const [wardenData, setWardenData] = useState<{ label: string; value: string }[]>([]);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleHostelSelection = (id: string) => {
    setFormData({ ..._formData, ['hostelId']: id });
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['hostelId']: '',
    }));
    getAssignWardenDataByHostelId(id);
  };

  const getAllWardenList = async () => {
    const wardenData = await getAllWardens();
    if (wardenData.data !== null) {
      const data = wardenData.data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
      setWardenData(data);
    }
  };

  const getAssignWardenDataByHostelId = async (id: string) => {
    const wardenData = await getAllAssignWardenByHostelId(id);
    if (wardenData !== null) {
      if (wardenData.data.wardens.length > 0) {
        setFormData((prevState) => ({
          ...prevState, // Spread the previous state to retain hostelId and buildingId
          wardens: wardenData?.data?.wardens?.map((item: any) => ({
            id: item.id,
            wardenId: item.wardenId,
            wardenDescription: item.designation,
          })),
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          wardens: [{ id: '', wardenId: '', wardenDescription: '' }],
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        const dataToCreate = {
          hostelId: _formData.hostelId,
          wardens: _formData?.wardens?.map((item: any) => ({
            id: item.id == '' ? null : item.id,
            wardenId: item.wardenId,
            designation: item.wardenDescription,
          })),
        };
        createAssignWarden(dataToCreate)
          .then((result) => {
            if (result && result.status === 200) {
              setFormData((prevData) => ({
                ...prevData,
                wardens: [{ id: '', wardenId: '', wardenDescription: '' }],
              }));
              getAssignWardenDataByHostelId(_formData.hostelId);
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
            console.log(err);
            setBtnLoading(false);
          });
      })
      .catch((err: Yup.ValidationError) => {
        setBtnLoading(false);
        const validationErrors: AssignWardenFormError = {};
        let wardenError: AssignWardenError = {};
        err.inner.forEach((error: any) => {
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
          }
          if (error.path && error.path.startsWith('wardens')) {
            const wardenIndex = Number(error.path.split('[')[1]?.split(']')[0]);

            if (error.path.endsWith('wardenId')) {
              wardenError.wardenId = error.message;
            }
            if (error.path.endsWith('wardenDescription')) {
              wardenError.wardenDescription = error.message;
            }
            validationErrors.wardens = validationErrors.wardens || [];
            validationErrors.wardens[wardenIndex] = wardenError;
          }
        });
        setErrors(validationErrors);
      });
  };

  const deleteAssignWarden = async (id: string) => {
    await deleteAssignWardenById(id)
      .then((result) => {
        if (result && result.status === 204) {
          getAssignWardenDataByHostelId(_formData.hostelId);
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
      })
      .catch((err: any) => {
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    getAllWardenList();
    if (hostelId !== null || hostelId !== '') {
      setFormData({ ..._formData, ['hostelId']: hostelId as string });
      handleHostelSelection(hostelId as string);
    }
  }, [hostelId]);

  return (
    <>
      <Stack>
        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <CrewMultiSelectAndInput
              items={_formData.wardens}
              onChange={(updatedWardens) => setFormData((prevData) => ({ ...prevData, wardens: updatedWardens }))}
              errors={errors.wardens || []}
              selectLabel={displayTexts.SELECT_WARDEN}
              inputLabel={displayTexts.WARDEN_DESCRIPTION}
              namePrefix="warden"
              inputName="wardenDescription"
              selectName="wardenId"
              menuItems={wardenData}
              labelVariant="body1"
              onSetErrors={(receivedErrors: AssignWardenError) => {
                setErrors((prevErrors) => ({ ...prevErrors, wardens: receivedErrors as AssignWardenError[] }));
              }}
              onHandleDelete={(assignWardenId) => deleteAssignWarden(assignWardenId)}
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
            <Grid container>
              <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
                <CrewButton loading={btnLoading} type="submit" fullWidth variant="contained" radius={10}>
                  Submit
                </CrewButton>
              </Grid>
            </Grid>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default AssignWardenSection;
