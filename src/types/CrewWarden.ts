export type AssignWardenError = {
  wardenId?: string;
  wardenDescription?: string;
};

export type AssignWardenFormError = {
  hostelId?: string;
  wardens?: AssignWardenError[];
};

export interface WardenListDetails {
  id: string;
  name: string;
  email: string;
  contact: string;
  status: string;
}

export type CreateWardenFormError = {
  firstName?: string;
  lastName?: string;
  mobile1?: string;
  mobile2?: string;
  address1?: string;
  address2?: string;
  email1?: string;
  email2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  dob?: string;
  image?: string;
  emergencyContactName?: string;
  emergencyContactNo?: string;
  emergencyContactRelation?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
  countryCodeValue3?: string;
};

export interface WardenFormData {
  userId?: string;
  firstName?: string;
  lastName?: string;
  mobile1?: string;
  mobile2?: string;
  address1?: string;
  address2?: string;
  email1?: string;
  email2?: string;
  gender?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  dob?: Date;
  image?: string;
  emergencyContactName?: string;
  emergencyContactNo?: string;
  emergencyContactRelation?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
  countryCodeValue3?: string;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
  emergencyContactCountryCode?: string;
}

export interface WardenProps {
  wardenData?: WardenFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllWarden?: () => void;
}
export interface WardenDetail {
  userId?: string | null;
  firstName?: string;
  lastName?: string;
  mobile1?: string | null;
  mobile2?: string | null;
  address1?: string;
  address2?: string | null;
  email?: string;
  email2?: string | null;
  gender?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactNo?: string;
  emergencyContactRelation?: string;
  wardenImage?: string | null;
  isImageUpdate?: boolean;
  password?: string;
  mobile1CountryCode?: string | null;
  mobile2CountryCode?: string | null;
  mobile3CountryCode?: string | null;
}
