import { Country } from '../types/CountryCode';
import { DistrictList } from '../types/CrewEnquiry';
import { FloorsInBuilding, BuildingsInHostel, RoomsInFloor } from '../types/CrewFacility';
import { LeaveTypeDetail } from '../types/Leave';

export const base64 = {
  encode(text: any) {
    return btoa(text);
  },
  decode(text: any) {
    return atob(text);
  },
};

export const filterBuildingsByHostelId = (array: BuildingsInHostel[], hostelId: string) => {
  const selectedHostel = array.find((item) => item.hostelId === hostelId);
  const filteredBuildings = selectedHostel?.buildings || [];

  return filteredBuildings.map((building) => ({
    label: building.buildingName,
    value: building.id,
  }));
};

export const filterFloorsByBuildingId = (array: FloorsInBuilding[], buildingId: string) => {
  const selectedBuilding = array.find((item) => item.buildingId === buildingId);
  const filteredFloors = selectedBuilding?.floors || [];

  return filteredFloors.map((item) => ({
    label: item.floorName,
    value: item.id,
  }));
};

export const filterRoomsByFloorId = (array: RoomsInFloor[], floorId: string) => {
  const selectedFloor = array.find((item) => item.floorId === floorId);
  const filteredRooms = selectedFloor?.rooms || [];

  return filteredRooms.map((item) => ({
    label: item.roomNumber,
    value: item.id,
  }));
};

export const filterDistrictsByStateId = (districtsArray: DistrictList[], stateId: string) => {
  const filteredDistricts = districtsArray.filter((district) => district.stateId === stateId);
  const formattedData = filteredDistricts.map((district) => ({ value: district.id, label: district.name }));
  return formattedData;
};

export const formatCountryCode = (CountryCodeArray: Country[]) => {
  const formattedData = CountryCodeArray.map((countrycode) => ({
    value: countrycode.dial_code,
    label: ` ${countrycode.dial_code}`,
  }));
  return formattedData;
};

export const formatLeaveType = (LeaveTypeArray: LeaveTypeDetail[]) => {
  const formattedData = LeaveTypeArray.map((leave) => ({
    value: leave.id,
    label: leave.labelText,
  }));
  return formattedData;
};

export const generateViewDataArray = (formData: any, selectedRow: any, optionalKeys?: string[]) => {
  return Object.keys(formData).reduce(
    (result, key) => {
      if (selectedRow.hasOwnProperty(key) && (!optionalKeys || !optionalKeys.includes(key))) {
        const value = selectedRow[key];
        result.push({ item: key, value });
      }
      return result;
    },
    [] as { item: string; value: string }[],
  );
};
