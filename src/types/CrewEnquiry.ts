export type CreateEnquiryFormError = {
  hostelId?: string;
  studentFirstName?: string;
  parentFirstName?: string;
  studentLastName?: string;
  parentLastName?: string;
  contact1?: string;
  contact2?: string;
  address1?: string;
  address2?: string;
  email1?: string;
  email2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  institution?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
};

export interface EnquiryDetails {
  id: string;
  studentName?: string;
  parentName?: string;
  email?: string;
  contact?: string;
  status?: string;
  hostelId?: string;
  studentFirstName?: string;
  parentFirstName?: string;
  studentLastName?: string;
  parentLastName?: string;
  contact1?: string;
  contact2?: string;
  address1?: string;
  address2?: string;
  email1?: string;
  email2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  institution?: string;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
}

export interface StateList {
  value: string;
  label: string;
}

export interface DistrictList {
  id: string;
  name: string;
  stateId: string;
}
export interface EnquiryDetails {
  id: string;
  studentName?: string;
  parentName?: string;
  email?: string;
  mobile?: string;
  status?: string;
  countryCodeValue1?: string | null;
  countryCodeValue2?: string | null;
}
export interface EnquiryData {
  id?: string | null;
  hostelId?: string;
  studentFirstName?: string;
  parentFirstName?: string;
  studentLastName?: string;
  parentLastName?: string;
  mobile1?: string;
  mobile2?: string  | null;
  address1?: string;
  address2?: string;
  email1?: string | null;
  email2?: string | null;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  institution?: string;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
}

export interface EnquiryProps {
  enquiryData?: EnquiryData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllEnquiries?: () => void;
}
