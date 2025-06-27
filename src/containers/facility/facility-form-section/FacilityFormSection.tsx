'use client';
import { CrewButton, CrewSelect, CrewTypography } from '../../../components/atoms';
import { CrewRenderFormField } from '../../../components/molecules';
import { CreateFacilityFormError, FacilityProps } from '../../../types/CrewFacility';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './FacilityFormSection.scss';
import * as Yup from 'yup';
import { getAllHostelIdAndName } from '../../../helpers/hostel';
import { getBuidingDetailsByHostelId } from '../../../helpers/building';
import { getAllFloorsDetailsByBuildingId } from '../../../helpers/floor';
import { getAllRoomsDetailsByFloorId } from '../../../helpers/room';
import { createFacilityData, updateFacilityData } from '../../../helpers/facility';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(255, errorMessage.max('Name', 255))
    .required(errorMessage.inputField('Name'))
    .matches(/^[a-zA-Z\s]+$/, 'Name should contain only letters'),
  description: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Description should contain only letters')
    .required('Description is required')
    .max(500, errorMessage.max('Description', 500)),
  amount: Yup.number().nullable(),
  hostelId: Yup.string().required('Hostel Must be selected'),
});

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const FacilityFormSection = ({ ...props }: FacilityProps) => {
  const [_formData, setFormData] = useState(props.facilityData);
  const [errors, setErrors] = useState<CreateFacilityFormError>({});
  const [hostelData, setHostelData] = useState<{ label: string; value: string }[]>([]);
  const [buildingData, setBuildingData] = useState<{ label: string; value: string }[]>([]);
  const [floorData, setFloorData] = useState<{ label: string; value: string }[]>([]);
  const [roomData, setRoomData] = useState<{ label: string; value: string }[]>([]);
  const [hideAmountField, setHideAmountField] = useState<boolean>(true);
  const [showBuilding, setShowBuilding] = useState<boolean>(false);
  const [showFloor, setShowFloor] = useState<boolean>(false);
  const [showRoom, setShowRoom] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const getAllHostelData = async () => {
    const hostelData = await getAllHostelIdAndName();
    if (hostelData !== null) {
      const transformedHostelData = hostelData?.data?.map((item: any) => ({
        label: item.hostelName,
        value: item.hostelId.toString(),
      }));
      setHostelData(transformedHostelData);
    }
  };

  const getAllBuildingDataByHostelId = async (id: string) => {
    const buildingData = await getBuidingDetailsByHostelId(id);
    if (buildingData !== null) {
      if (buildingData.data.buildings.length > 0) {
        const transformedBuildingData = buildingData?.data?.buildings?.map((item: any) => ({
          label: item.buildingName,
          value: item.id.toString(),
        }));
        setBuildingData(transformedBuildingData);
      }
    }
  };

  const getAllFloorDataByBuildingId = async (id: string) => {
    const floorData = await getAllFloorsDetailsByBuildingId(id);
    if (floorData !== null) {
      if (floorData.data.floors.length > 0) {
        const transformedFloorData = floorData?.data?.floors?.map((item: any) => ({
          label: item.floorName,
          value: item.id.toString(),
        }));
        setFloorData(transformedFloorData);
      }
    }
  };

  const getAllRoomDataByFloorId = async (id: string) => {
    const roomData = await getAllRoomsDetailsByFloorId(id);
    if (roomData !== null) {
      if (roomData.data.rooms.length > 0) {
        const transformedRoomData = roomData?.data?.rooms?.map((item: any) => ({
          label: item.roomNumber,
          value: item.id.toString(),
        }));
        setRoomData(transformedRoomData);
      }
    }
  };

  const handleHostelSelection = (id: string) => {
    setFormData({ ..._formData, ['hostelId']: id });
    setShowBuilding(true);
    setShowFloor(false);
    setShowRoom(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['hostelId']: '',
    }));
    getAllBuildingDataByHostelId(id);
  };

  const handleBuidlingSelection = (id: string) => {
    setFormData({ ..._formData, ['buildingId']: id });
    setShowFloor(true);
    setShowRoom(false);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['buildingId']: '',
    }));
    getAllFloorDataByBuildingId(id);
  };

  const handleFloorSelection = (id: string) => {
    setFormData({ ..._formData, ['floorId']: id });
    setShowRoom(true);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['floorId']: '',
    }));
    getAllRoomDataByFloorId(id);
  };

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const inputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'name',
      id: 'facility-name',
      label: 'Name',
      details: {
        inputType: 'text',
        placeholder: 'type name',
        lableVariant: 'body1',
        value: _formData?.name,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'description',
      id: 'facility-description',
      label: 'Description',
      details: {
        inputType: 'text',
        placeholder: 'type description',
        lableVariant: 'body1',
        value: _formData?.description,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'amount',
      id: 'facility-amount',
      label: 'Amount',
      hideField: hideAmountField,
      details: {
        inputType: 'number',
        placeholder: 'type description',
        lableVariant: 'body1',
        value: String(_formData?.cost),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
  ];

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
              name: _formData?.name,
              cost: _formData?.cost,
              description: _formData?.description,
              hostelId: _formData?.hostelId,
              buildingId: _formData?.buildingId === '' ? null : _formData?.buildingId,
              floorId: _formData?.floorId === '' ? null : _formData?.floorId,
              roomId: _formData?.roomId === '' ? null : _formData?.roomId,
            };
            createFacilityData(dataToCreate)
              .then((result) => {
                if (result && result.status === 'Success') {
                  setFormData({
                    id: '',
                    name: '',
                    description: '',
                    cost: 0,
                    hostelId: '',
                    buildingId: '',
                    floorId: '',
                    roomId: '',
                  });
                  setShowBuilding(false);
                  setShowFloor(false);
                  setShowRoom(false);
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
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
                setBtnLoading(false);
                props.getAllFacilities?.();
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (error) {
            console.error('Error fetching facilities:', error);
          }
        } else {
          try {
            const dataToUpdate = {
              id: _formData?.id,
              name: _formData?.name,
              cost: _formData?.cost,
              description: _formData?.description,
              hostelId: _formData?.hostelId,
              buildingId: _formData?.buildingId === '' ? null : _formData?.buildingId,
              floorId: _formData?.floorId === '' ? null : _formData?.floorId,
              roomId: _formData?.roomId === '' ? null : _formData?.roomId,
            };
            updateFacilityData(dataToUpdate)
              .then((result) => {
                if (result && result.status === 'Success') {
                  setBtnLoading(false);
                  props.closeModal?.();
                  props.getAllFacilities?.();
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
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            console.error('Error fetching facilities:', error);
          }
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

  useEffect(() => {
    getAllHostelData();
    if (_formData?.hostelId) {
      setShowBuilding(true);
      getAllBuildingDataByHostelId(_formData?.hostelId);
    }
    if (_formData?.buildingId) {
      setShowFloor(true);
      getAllFloorDataByBuildingId(_formData?.buildingId);
    }
    if (_formData?.floorId) {
      setShowRoom(true);
      getAllRoomDataByFloorId(_formData?.floorId);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="grid-container">
        <Grid container rowSpacing={1}>
          {inputs.map((item, index) => (
            <Grid
              item
              xl={item?.gridValues?.xl}
              lg={item?.gridValues?.lg}
              md={item?.gridValues?.md}
              sm={item?.gridValues?.sm}
              xs={item?.gridValues?.xs}
              px={item?.gridValues?.px}
              key={index}
            >
              <CrewRenderFormField
                index={index}
                input={item}
                handleFieldChange={(value, input) => handleFieldChange(value, input)}
                errors={errors}
              />
            </Grid>
          ))}
        </Grid>
        <Grid container>
          <CrewTypography variant="h6" fontWeight="bold" color="primary">
            Select Hostel and (Building/Floor/Room)
          </CrewTypography>
        </Grid>
        <Grid container>
          <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
            <CrewSelect
              label={'Hostel'}
              className="dropdown"
              value={_formData?.hostelId}
              menuItems={hostelData}
              onChange={(value) => handleHostelSelection(value)}
              error={!!errors?.hostelId}
              errorMessage={errors?.hostelId}
              labelVariant={'body1'}
            />
          </Grid>
          {showBuilding && (
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
              <CrewSelect
                label={'Building'}
                className="dropdown"
                value={_formData?.buildingId}
                menuItems={buildingData}
                onChange={(value) => handleBuidlingSelection(value)}
                error={!!errors?.buildingId}
                errorMessage={errors?.buildingId}
                labelVariant={'body1'}
              />
            </Grid>
          )}
          {showFloor && (
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
              <CrewSelect
                label={'Floor'}
                className="dropdown"
                value={_formData?.floorId}
                menuItems={floorData}
                onChange={(value) => handleFloorSelection(value)}
                error={!!errors?.floorId}
                errorMessage={errors?.floorId}
                labelVariant={'body1'}
              />
            </Grid>
          )}
          {showRoom && (
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
              <CrewSelect
                label={'Room'}
                className="dropdown"
                value={_formData?.roomId}
                menuItems={roomData}
                onChange={(value) => setFormData({ ..._formData, ['roomId']: value })}
                error={!!errors?.roomId}
                errorMessage={errors?.roomId}
                labelVariant={'body1'}
              />
            </Grid>
          )}
        </Grid>
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

export default FacilityFormSection;
