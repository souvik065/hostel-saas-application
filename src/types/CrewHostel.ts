import { Image } from './FileInputProps';

export type CreateHostelFormError = {
  hostelName?: string;
  email1?: string;
  mobile1?: string;
  address1?: string;
  address2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  images?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
};

export interface HostelDetails {
  hostelName?: string;
  id?: string | null;
  contact?: string;
  address?: string;
  district?: string;
  state?: string;
  images?: Image[] | null;
  hostelLogo?: string | null;
  contactId?: string;
  email1?: string;
  email2?: string;
  mobile1?: string;
  mobile2?: string;
  addressId?: string;
  address1?: string;
  address2?: string;
  town?: string;
  pincode?: string;
  isActive?: true;
  createdBy?: string | null;
  createdAt?: string | null;
  isLogoUpdate?: boolean;
  mobile1CountryCode?: string | null;
  mobile2CountryCode?: string | null;
}

export interface HostelImages {
  id: string | null;
  hostelImage: string | null;
  fileName?: string;
  isActive: boolean;
}
export interface HostelFormData {
  id?: string;
  hostelName?: string;
  email1?: string;
  email2?: string;
  mobile1?: string;
  mobile2?: string;
  address1?: string;
  address2?: string;
  town?: string;
  district?: string;
  state?: string;
  pincode?: string;
  images?: Image[] | null;
  mobile1CountryCode?: string;
  mobile2CountryCode?: string;
  countryCodeValue1?: string;
  countryCodeValue2?: string;
}

export interface HostelProps {
  hostelData?: HostelFormData;
  isModal?: boolean;
  closeModal?: () => void;
  getAllHostel?: () => void;
}

export interface ApiErrorItem {
  propertyName: string;
  errorMessage: string;
}
export interface ApiErrorResponse {
  title: string;
  errors: ApiErrorItem[];
}
