'use client';
import { CrewButton, CrewTypography } from '../../components/atoms';
import { CrewMultipleInput } from '../../components/molecules';
import { displayTexts, errorMessage } from '../../constants/app-hostel-constants';
import { createBuilding, deleteBuildingDataByHostelId, getBuidingDetailsByHostelId } from '../../helpers/building';
import { ApiErrorItem, ApiErrorResponse, AssignBuildingError, AssignBuildingFormError } from '../../types/CrewBuilding';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './BuildingSection.scss';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  buildings: Yup.array().of(
    Yup.object().shape({
      buildingName: Yup.string()
        .max(255, errorMessage.max('Building name', 255))
        .required(errorMessage.inputField('Building name'))
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

const BuildingSection = ({ hostelId }: Props) => {
  const [_formData, setFormData] = useState({
    hostelId: '',
    buildings: [{ id: '', buildingName: '' }],
  });
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [errors, setErrors] = useState<AssignBuildingFormError>({ hostelId: '', buildings: [] });

  const getAllBuildingsByHostelId = async (id: string) => {
    try {
      const buildingData = await getBuidingDetailsByHostelId(id);
      if (buildingData !== null) {
        if (buildingData.data.buildings.length > 0) {
          setFormData({
            hostelId: buildingData?.data?.hostelId,
            buildings: buildingData?.data?.buildings?.map((building: any) => ({
              id: building.id,
              buildingName: building.buildingName,
            })),
          });
        }
      }
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const deleteBuilding = async (id: string) => {
    await deleteBuildingDataByHostelId(id, _formData.hostelId)
      .then((result) => {
        if (result && result.status === 204) {
          getAllBuildingsByHostelId(_formData.hostelId);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        //api call goes here
        const dataToCreate = {
          hostelId: _formData.hostelId,
          buildings: _formData?.buildings?.map((building: any) => ({
            id: building.id == '' ? null : building.id,
            buildingName: building.buildingName,
          })),
        };
        createBuilding(dataToCreate)
          .then((result) => {
            if (result && result.status === 200) {
              getAllBuildingsByHostelId(_formData.hostelId);
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
        setBtnLoading(false);
        if (err instanceof Yup.ValidationError) {
          const validationErrors: AssignBuildingFormError = {};
          err.inner.forEach((error) => {
            if (error.path === 'hostelId') {
              validationErrors.hostelId = error.message;
            } else if (error.path && error.path.startsWith('buildings')) {
              const buildingIndex = Number(error.path.split('[')[1]?.split(']')[0]);
              const buildingError: AssignBuildingError = {
                ...validationErrors.buildings?.[buildingIndex],
                buildingName: error.message,
              };
              validationErrors.buildings = validationErrors.buildings || [];
              validationErrors.buildings[buildingIndex] = buildingError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  useEffect(() => {
    if (hostelId !== null || hostelId !== '') {
      setFormData({ ..._formData, ['hostelId']: hostelId as string, buildings: [{ id: '', buildingName: '' }] });
      getAllBuildingsByHostelId(hostelId as string);
    }
  }, [hostelId]);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <CrewMultipleInput
            items={_formData.buildings}
            onChange={(updatedBuildings) => setFormData((prevData) => ({ ...prevData, buildings: updatedBuildings }))}
            errors={errors.buildings || []}
            label="Building Name"
            namePrefix="buildings"
            itemName="buildingName"
            labelVariant="body1"
            onSetErrors={(receivedErrors: AssignBuildingError) => {
              setErrors((prevErrors) => ({ ...prevErrors, buildings: receivedErrors as AssignBuildingError[] }));
            }}
            onHandleDelete={(buildingId) => deleteBuilding(buildingId)}
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
          <Grid container px={1}>
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12}>
              <CrewButton loading={btnLoading} type="submit" fullWidth variant="contained" radius={10}>
                {displayTexts.SUBMIT}
              </CrewButton>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </section>
  );
};

export default BuildingSection;
