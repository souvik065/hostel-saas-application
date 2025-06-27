'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import * as Yup from 'yup';
import { AssignFloorError, CreateFloorError, CreateFloorFormError } from '../../types/CrewFloor';
import { displayTexts, errorMessage } from '../../constants/app-hostel-constants';
import { CrewButton, CrewSelect, CrewTypography } from '../../components/atoms';
import { CrewMultipleInput } from '../../components/molecules';
import {
  createFloor,
  getBuidingDetailsByHostelId,
  getAllFloorsDetailsByBuildingId,
  deleteFloorDataByBuildingId,
} from '../../helpers/floor';
import { ApiErrorItem, ApiErrorResponse } from '../../types/CrewHostel';
import './FloorSection.scss';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  buildingId: Yup.string().required(errorMessage.selectionDropdown('Building')),
  floors: Yup.array().of(
    Yup.object().shape({
      floorName: Yup.string()
        .max(255, errorMessage.max('Floor name', 255))
        .required(errorMessage.inputField('Floor name'))
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

const FloorSection = ({ hostelId }: Props) => {
  const [_formData, setFormData] = useState({
    hostelId: '',
    buildingId: '',
    floors: [{ id: '', floorName: '' }],
  });

  const [errors, setErrors] = useState<CreateFloorFormError>({});
  const [buildingData, setBuildingData] = useState<{ label: string; value: string }[]>([]);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleHostelSelection = (id: string) => {
    setFormData({
      hostelId: id,
      buildingId: '',
      floors: [{ id: '', floorName: '' }],
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ['hostelId']: '',
    }));
    getAllBuildingsByHostelId(id);
  };

  const deleteFloor = async (id: string) => {
    await deleteFloorDataByBuildingId(id, _formData.buildingId)
      .then((result) => {
        if (result && result.status === 204) {
          handleBuildingSelection(_formData.buildingId);
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

  const handleBuildingSelection = async (id: string) => {
    setFormData({ ..._formData, ['buildingId']: id });
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['buildingId']: '',
    }));
    const floorData = await getAllFloorsDetailsByBuildingId(id);
    if (floorData !== null) {
      if (floorData.data.floors.length > 0) {
        setFormData((prevState) => ({
          ...prevState, // Spread the previous state to retain hostelId and buildingId
          floors: floorData?.data?.floors?.map((floor: any) => ({
            id: floor.id,
            floorName: floor.floorName,
          })), // Update floors with the new array of floor objects
        }));
      } else {
        // If no floor data, set floors to an empty array
        setFormData((prevState) => ({
          ...prevState,
          floors: [{ id: '', floorName: '' }],
        }));
      }
    } else {
      // Handle the case where floorData is null - TODO: show an error message
      console.error('Error while fetching floor data for building with ID:', id);
    }
  };

  const getAllBuildingsByHostelId = async (id: string) => {
    try {
      const buildingData = await getBuidingDetailsByHostelId(id);
      const data = buildingData.data.buildings.map((building: any) => ({
        label: building.buildingName,
        value: building.id,
      }));
      setBuildingData(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        //API call
        const dataToCreate = {
          hostelId: _formData.hostelId,
          buildingId: _formData.buildingId,
          floors: _formData?.floors?.map((floor: any) => ({
            id: floor.id == '' ? null : floor.id,
            floorName: floor.floorName,
          })),
        };
        createFloor(dataToCreate)
          .then((result) => {
            if (result && result.status === 200) {
              getAllFloorsDetailsByBuildingId(_formData.hostelId);
              setFormData((prevData) => ({
                ...prevData,
                buildingId: '',
                floors: [{ id: '', floorName: '' }],
              }));
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
          });
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: CreateFloorFormError = {};
        err.inner.forEach((error) => {
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
          } else if (error.path === 'buildingId') {
            validationErrors.buildingId = error.message;
          } else if (error.path && error.path.startsWith('floors')) {
            const floorIndex = Number(error.path.split('[')[1]?.split(']')[0]);
            const floorError: CreateFloorError = {
              ...validationErrors.floors?.[floorIndex],
              floorName: error.message,
            };
            validationErrors.floors = validationErrors.floors || [];
            validationErrors.floors[floorIndex] = floorError;
          }
        });
        setErrors(validationErrors);
      });
  };

  useEffect(() => {
    if (hostelId !== null || hostelId !== '') {
      handleHostelSelection(hostelId as string);
    }
  }, [hostelId]);

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <Grid container>
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
              <CrewSelect
                label={'Building'}
                className="dropdown"
                value={_formData?.buildingId}
                menuItems={buildingData}
                onChange={(value) => handleBuildingSelection(value)}
                error={!!errors?.buildingId}
                errorMessage={errors?.buildingId}
                labelVariant={'body1'}
              />
            </Grid>
          </Grid>
          <CrewMultipleInput
            items={_formData.floors}
            onChange={(updatedFloors) => setFormData((prevData) => ({ ...prevData, floors: updatedFloors }))}
            errors={errors.floors || []}
            label="Floor Name"
            namePrefix="floors"
            itemName="floorName"
            labelVariant="body1"
            onSetErrors={(receivedErrors: AssignFloorError) => {
              setErrors((prevErrors) => ({ ...prevErrors, floors: receivedErrors as AssignFloorError[] }));
            }}
            onHandleDelete={(floorId) => deleteFloor(floorId)}
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
    </Stack>
  );
};

export default FloorSection;
