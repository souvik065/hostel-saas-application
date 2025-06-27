export type CreateFacilityFormError = {
  name?: string;
  description?: string;
  amount?: string;
  hostelId?: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
};

export interface Building {
  id: string;
  buildingName: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface BuildingsInHostel {
  hostelId: string;
  buildings: Building[];
}

export interface Floor {
  id: string;
  floorName: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface FloorsInBuilding {
  buildingId: string;
  floors: Floor[];
}

export interface RoomImage {
  id: string;
  image: string;
  isActive: boolean;
}
export interface Rooms {
  id: string;
  roomNumber: string;
  occupancy: number;
  images: RoomImage[];
  isActive: boolean;
  createdBy: string;
  createdAt: string;
}

export interface RoomsInFloor {
  floorId: string;
  rooms: Rooms[];
}

export type FacilityFormData = {
  id?: string;
  name?: string;
  description?: string;
  cost?: number;
  hostelId?: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
};

export interface FacilityProps {
  facilityData?: FacilityFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllFacilities?: () => void;
}
