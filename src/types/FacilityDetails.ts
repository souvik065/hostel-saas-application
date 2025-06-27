export interface FacilityDetails {
  id: string;
  name: string;
  cost: number;
  description: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  hostelId: string;
  hostelName?: string;
  buildingId?: string | null;
  buildingName?: string;
  floorId?: string | null;
  floorName?: string;
  roomId?: string | null;
  roomNumber?: string;
}
