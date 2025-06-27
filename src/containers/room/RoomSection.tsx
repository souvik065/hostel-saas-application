'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import * as Yup from 'yup';
import { displayTexts, errorMessage } from '../../constants/app-hostel-constants';
import { CrewButton, CrewSelect, CrewTypography } from '../../components/atoms';
import { AssignRoomError, AssignRoomFormError, RoomImages } from '../../types/CrewRoom';
import {
  createRoom,
  deleteRoomDataByFloorId,
  getAllBuidingDetailsByHostelId,
  getAllFloorDetailsByBuildingId,
  getAllRoomsDetailsByFloorId,
} from '../../helpers/room';
import './RoomSection.scss';
import { ApiErrorItem, ApiErrorResponse } from '../../types/CrewBuilding';
import CrewMultiInputAndImage from '@/components/organisms/multi-two-inputs-with-image/CrewMultiTwoInputWithImage';
import { Image } from '@/types/FileInputProps';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required('Hostel must be selected'),
  buildingId: Yup.string().required('Building must be selected'),
  floorId: Yup.string().required('Floor must be selected'),
  rooms: Yup.array().of(
    Yup.object().shape({
      roomNumber: Yup.string()
        .max(255, errorMessage.max('Room name', 255))
        .required(errorMessage.inputField('Room name'))
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
      occupancy: Yup.string()
        .required(errorMessage.inputField('Occupancy'))
        .matches(/^[0-9]+$/, 'Occupancy should contain only numbers'),
      images: Yup.array().min(1, errorMessage.selectionDropdown('At leaset 1 Image')),
    }),
  ),
});

interface Props {
  hostelId: string;
}

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const RoomSection = ({ hostelId }: Props) => {
  const [_formData, setFormData] = useState({
    hostelId: '',
    buildingId: '',
    floorId: '',
    rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] as Image[] }],
  });

  const [errors, setErrors] = useState<AssignRoomFormError>({});
  const [buildingData, setBuildingData] = useState<{ label: string; value: string }[]>([]);
  const [floorData, setFloorData] = useState<{ label: string; value: string }[]>([]);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleHostelSelection = (id: string) => {
    setFormData({ ..._formData, ['hostelId']: id });
    setFormData({
      hostelId: id,
      buildingId: '',
      floorId: '',
      rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] }],
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      ['hostelId']: '',
    }));
    getAllBuildingsByHostelId(id);
  };

  const handleBuildingSelection = async (id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      buildingId: id,
      floorId: '',
      rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] }],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['buildingId']: '',
    }));
    const floorData = await getAllFloorDetailsByBuildingId(id);
    if (floorData.data !== null) {
      const data = floorData.data.floors.map((floor: any) => ({
        label: floor.floorName,
        value: floor.id,
      }));
      setFloorData(data);
    } else {
      // If no room data, set room to an empty array which prevData gets updated
      setFormData((prevState) => ({
        ...prevState,
        rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] }],
      }));
    }
  };

  const handleFloorSelection = async (id: string) => {
    setFormData({ ..._formData, ['floorId']: id });
    setErrors((prevErrors) => ({
      ...prevErrors,
      ['floorId']: '',
    }));
    const roomData = await getAllRoomsDetailsByFloorId(id);
    if (roomData !== null) {
      if (roomData.data.rooms.length > 0) {
        setFormData((prevState) => ({
          ...prevState, // Spread the previous state to retain hostelId and buildingId
          rooms: roomData?.data?.rooms?.map((room: any) => ({
            id: room.id,
            roomNumber: room.roomNumber,
            occupancy: room.occupancy,
            images: room.images,
          })),
        }));
      } else {
        // If no room data, set room to an empty array
        setFormData((prevState) => ({
          ...prevState,
          rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] }],
        }));
      }
    } else {
      // Handle the case where roomsData is null - TODO: show an error message
      console.error('Error while fetching rooms data for building with ID:', id);
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

  const convertImagesToHostelImages = (images: Image[]): RoomImages[] => {
    return images.map((image) => ({
      id: image.id || null,
      image: image.imageUrl,
      isActive: image.isActive,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false }) // abortEarly false should wait untill the full validation done
      .then(() => {
        //api call goes here
        const dataToCreate = {
          hostelId: _formData.hostelId,
          buildingId: _formData.buildingId,
          floorId: _formData.floorId,
          rooms: _formData?.rooms?.map((room: any) => ({
            id: room.id == '' ? null : room.id,
            occupancy: room.occupancy,
            roomNumber: room.roomNumber,
            images: convertImagesToHostelImages(room.images),
          })),
        };
        console.log('dataToCreate', dataToCreate);
        createRoom(dataToCreate)
          .then((result) => {
            if (result && result.status === 200) {
              setFormData((prevData) => ({
                ...prevData,
                buildingId: '',
                floorId: '',
                rooms: [{ id: '', roomNumber: '', occupancy: '', images: [] }],
              }));
              handleFloorSelection(_formData.floorId);
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
        const validationErrors: AssignRoomFormError = {};
        let roomError: AssignRoomError = {};
        err.inner.forEach((error: any) => {
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
          } else if (error.path === 'buildingId') {
            validationErrors.buildingId = error.message;
          } else if (error.path === 'floorId') {
            validationErrors.floorId = error.message;
          } else if (error.path && error.path.startsWith('rooms')) {
            const roomIndex = Number(error.path.split('[')[1]?.split(']')[0]);
            if (error.path.endsWith('roomNumber')) {
              roomError.roomNumber = error.message;
            }
            if (error.path.endsWith('occupancy')) {
              roomError.occupancy = error.message;
            }
            if (error.path.endsWith('images')) {
              roomError.images = error.message;
            }
            // if (error.path.endsWith('images')) {
            //   roomError.images = error.message;
            // }
            validationErrors.rooms = validationErrors.rooms || [];
            validationErrors.rooms[roomIndex] = roomError;
          }
        });

        setErrors(validationErrors);
      });
  };

  const deleteRoom = async (id: string) => {
    await deleteRoomDataByFloorId(_formData.floorId, id)
      .then((result) => {
        if (result && result.status === 204) {
          handleFloorSelection(_formData.floorId);
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
    // we have to change the HostelID
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
            <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
              <CrewSelect
                label={'Floor'}
                className="dropdown"
                value={_formData?.floorId}
                menuItems={floorData}
                onChange={(value) => handleFloorSelection(value)}
                error={!!errors?.floorId}
                errorMessage={errors?.buildingId}
                labelVariant={'body1'}
              />
            </Grid>
          </Grid>
          <Grid item xl={3} lg={4} md={4} sm={6} xs={12} px={1}>
          <CrewMultiInputAndImage
            items={_formData.rooms}
            onChange={(updatedRooms) => setFormData((prevData) => ({ ...prevData, rooms: updatedRooms }))}
            onSetErrors={(receivedErrors: AssignRoomError) => {
              setErrors((prevErrors) => ({ ...prevErrors, rooms: receivedErrors as AssignRoomError[] }));
            }}
            onHandleDelete={(roomId) => deleteRoom(roomId)}
            errors={errors.rooms || []}
            uploadImageLabel="Room Images"
            inputLabel1="Room Number"
            inputLabel2="Occupancy"
            namePrefix="room"
            acceptMultiple={true}
            inputName1="roomNumber"
            inputName2="occupancy"
            images="images"
            labelVariant="body1"
          />
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

export default RoomSection;
