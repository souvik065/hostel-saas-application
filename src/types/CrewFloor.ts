export type CreateFloorError = {
  floorName?: string;
};

export type CreateFloorFormError = {
  hostelId?: string;
  buildingId?: string;
  floors?: CreateFloorError[];
};

export type AssignFloorError = {
  id?: string;
  floorName?: string;
};

export type AssignFloorFormError = {
  hostelId?: string;
  floors?: AssignFloorError[];
};
