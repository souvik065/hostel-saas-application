export type AssignBuildingError = {
  id?: string;
  buildingName?: string;
};

export type AssignBuildingFormError = {
  hostelId?: string;
  buildings?: AssignBuildingError[];
};

export type buildingDate = {
  id?: string;
  buildingName: string;
};

export interface ApiErrorItem {
  propertyName: string;
  errorMessage: string;
}
export interface ApiErrorResponse {
  title: string;
  errors: ApiErrorItem[];
}
