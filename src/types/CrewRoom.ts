import { Image } from './FileInputProps';

export type CreateRoomError = {
  roomName?: string;
  images?: string;
};

export interface RoomImages {
  id: string | null;
  image: string | null;
  isActive: boolean;
}

export type CreateRoomFormErrors = {
  hostelId?: string;
  buildingId?: string;
  floorId?: string;
  rooms?: CreateRoomError[];
};

export type FormRoom = {
  id?: null;
  roomName?: string;
  occupancy?: string;
  images?: Image[];
};

export type AssignRoomError = {
  id?: string;
  roomNumber?: string;
  occupancy?: string;
  images?: string;
};

export type AssignRoomFormError = {
  hostelId?: string;
  buildingId?: string;
  floorId?: string;
  rooms?: AssignRoomError[];
};
