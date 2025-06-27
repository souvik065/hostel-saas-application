import { CrewButton, CrewTypography } from '../../../../components/atoms';
import { CrewRenderFormField } from '../../../../components/molecules';
import { errorMessage } from '../../../../constants/app-hostel-constants';
import { getAllHostelIdAndName } from '../../../../helpers/hostel';
import { CreateHostelRegistration } from '../../../../helpers/hostel-registration';
import { getPlanTypesByHostelId } from '../../../../helpers/hostelite-registration';
import {
  getAllBuidingDetailsByHostelId,
  getAllFloorDetailsByBuildingId,
  getAllRoomsDetailsByFloorId,
} from '../../../../helpers/room';
import { ApiErrorItem, ApiErrorResponse } from '../../../../types/CrewBuilding';
import { HandleFieldChange, InputFieldProps } from '../../../../types/CrewForm';
import { HostelData, RegHostelProps } from '../../../../types/CrewRegistration';
import { getErrorClassName } from '../../../../utils/ComponentHelper';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  buildingId: Yup.string().required(errorMessage.selectionDropdown('Building')),
  floorId: Yup.string().required(errorMessage.selectionDropdown('Floor')),
  roomId: Yup.string().required(errorMessage.selectionDropdown('Room')),
  // planTypeId: Yup.string().required(errorMessage.selectionDropdown('Plan Type')),
});

const FormSection = ({ ...props }: RegHostelProps) => {
  const [_formData, setFormData] = useState(props.hostelData);
  const [errors, setErrors] = useState<HostelData>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [showPlanType, setShowPlanType] = useState(true);
  const [hostelData, setHostelData] = useState<{ label: string; value: string }[]>([]);
  const [buildingData, setBuildingData] = useState<{ label: string; value: string }[]>([]);
  const [floorData, setFloorData] = useState<{ label: string; value: string }[]>([]);
  const [roomData, setRoomData] = useState<{ label: string; value: string }[]>([]);
  const [planTypeData, setPlanTypeData] = useState<{ label: string; value: string }[]>([]);

  const getAllHostelIdsAndNames = async () => {
    try {
      const hostelNameAndIds = await getAllHostelIdAndName();

      if (hostelNameAndIds && hostelNameAndIds?.data?.length > 0) {
        const transformedHostelData = hostelNameAndIds?.data.map((item: any) => ({
          label: item.hostelName,
          value: item.hostelId.toString(),
        }));
        setHostelData(transformedHostelData);
      }
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  const getAllPlanTypesByHostelId = async (id: string) => {
    try {
      const res = await getPlanTypesByHostelId(id);
      const data = res.data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
      setPlanTypeData(data);
    } catch (error) {
      console.error('Error fetching plan Type:', error);
    }
  };

  const getAllBuildingsByHostelId = async (id: string) => {
    try {
      const buildingData = await getAllBuidingDetailsByHostelId(id);
      const data = buildingData.data.buildings.map((building: any) => ({
        label: building.buildingName,
        value: building.id,
      }));
      setBuildingData(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const getAllFloorsDetailsByBuildingId = async (id: string) => {
    const floorData = await getAllFloorDetailsByBuildingId(id);
    const data = floorData.data.floors.map((floor: any) => ({
      label: floor.floorName,
      value: floor.id,
    }));
    setFloorData(data);
  };

  const getAllRoomDetailsByFloorId = async (id: string) => {
    const roomData = await getAllRoomsDetailsByFloorId(id);

    const data = roomData?.data.rooms.map((room: any) => ({
      label: room.roomNumber,
      value: room.id,
    }));

    setRoomData(data);
  };

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'hostelId') {
      setShowPlanType(false);
      getAllPlanTypesByHostelId(value as string);
      getAllBuildingsByHostelId(value as string);
    } else if (name === 'buildingId') {
      getAllFloorsDetailsByBuildingId(value as string);
    } else if (name === 'floorId') {
      getAllRoomDetailsByFloorId(value as string);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const inputs: InputFieldProps[] = [
    {
      type: 'dropdown',
      name: 'hostelId',
      id: 'hostelId',
      label: 'Select Hostel',
      details: {
        items: hostelData,
        lableVariant: 'body1',
        value: _formData?.hostelId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'buildingId',
      id: 'buildingId',
      label: 'Select Building',
      details: {
        items: buildingData,
        lableVariant: 'body1',
        value: _formData?.buildingId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'floorId',
      id: 'floorId',
      label: 'Select Floor',
      details: {
        items: floorData,
        lableVariant: 'body1',
        value: _formData?.floorId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'roomId',
      id: 'roomId',
      label: 'Select Room',
      details: {
        items: roomData,
        lableVariant: 'body1',
        value: _formData?.roomId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'planTypeId',
      id: 'planTypeId',
      label: 'Select Plan Type',
      hideField: showPlanType,
      details: {
        items: planTypeData,
        lableVariant: 'body1',
        value: _formData?.planTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        try {
          const dataToCreate = {
            planTypeId: _formData?.planTypeId,
            hostelId: _formData?.hostelId,
            buildingId: _formData?.buildingId,
            floorId: _formData?.floorId,
            roomId: _formData?.roomId,
            hosteliteId: sessionStorage.getItem('hosteliteId'),
          };
          CreateHostelRegistration(dataToCreate)
            .then((result) => {
              if (result.status === 200 || (result && result.status.toString().toLowerCase() === 'success')) {
                setFormData({});
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
                  errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                });
              } else {
                setApiErrors({
                  title: 'Error',
                  errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                });
              }
              setBtnLoading(false);
            })
            .catch((err) => {
              setBtnLoading(false);
              console.log(err);
            });
        } catch (error) {
          setBtnLoading(false);
          console.error('Error Registration Hostelite:', error);
        }
      })
      .catch((err: Yup.ValidationError) => {
        console.log('err', err);
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
        });
        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    getAllHostelIdsAndNames();
  }, []);

  return (
    <Stack component={'section'}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} className="form-section">
          <Grid container rowSpacing={2}>
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
          <Stack className={`footer-container`}>
            <CrewButton size="large" loading={btnLoading} type="submit" variant="contained" stylebutton>
              Submit
            </CrewButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormSection;
