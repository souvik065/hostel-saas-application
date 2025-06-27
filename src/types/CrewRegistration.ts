import { Image } from './FileInputProps';
export interface RegHostliteProps {
  hosteliteData?: HosteliteData;
}

export interface HosteliteData {
  hostelId?: string;
  id?: string | null;
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  town?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  mobile1?: string;
  mobile2?: string;
  email1?: string;
  email2?: string;
  institution?: string;
  occupation?: string;
  isNonBillable?: string;
  nonBillableCategory?: string;
  planTypeId?: string;
  attendanceRegisterId?: string;
  dob?: Date;
  gender?: string;
  nationality?: string;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
  emergencyCountryCode?: string;
  emergencyContactName?: string;
  emergencyContactNo?: string;
  emergencyContactRelation?: string;
  image?: Image[] | null;
}

export interface RegParentProps {
  formData?: ParentOrGuardianData;
}

export interface ParentOrGuardianData {
  id?: string | null;
  firstName?: string;
  lastName?: string;
  parentImage?: Image[] | null;
  addressTypeId?: string;
  address1?: string;
  address2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  mobile1?: string;
  mobile2?: string;
  email1?: string;
  email2?: string;
  dob?: Date;
  gender?: string;
  nationality?: string;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
  profession?: string;
  relationTypeId?: string;
}

export interface HostelData {
  hostelId?: string;
  planTypeId?: string;
  hosteliteId?: string;
  buildingId?: string;
  floorId?: string;
  roomId?: string;
}

export interface RegHostelProps {
  hostelData?: HostelData;
}

export type AssignDocumentError = {
  id?: string;
  documentName?: string;
  documentType?: string;
  expiryDate?: string;
  documet?: string;
};

export interface paymentData {
  hosteliteId: string;
  feeType: { id: string; type: string }[];
}

export type AssignDocumentFormError = {
  documents?: AssignDocumentError[];
};

export type AssignPaymentError = {
  id?: string;
  name?: string;
};

export type AssignPaymentItemFormError = {
  hosteliteId?: string;
  feesStructures?: AssignPaymentError[];
};
