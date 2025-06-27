import { OutPassDetail } from './OutPassProps';

export type ProfileFormData = {
  id?: string;
  hostelite?: string;
  firstName?: string;
  lastName?: string;
  addressTypeId?: string;
  address1?: string;
  address2?: string | null;
  city?: string;
  state?: string;
  town?: string;
  district?: string;
  pincode?: string;
  email1?: string;
  email2?: string | null;
  mobile1?: string;
  mobile2?: string;
  countryCodeValue1?: string;
  mobile1CountryCode?: string;
  countryCodeValue2?: string;
  mobile2CountryCode?: string;
  countryCodeValue3?: string;
  emergencyCountryCode?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactNo?: string;
  occupation?: string;
  contact1?: string;
  contact2?: string | null;
  gender?: string | null;
  nationality?: string;
  dob?: Date;
  relationTypeId?: string;
  profession?: string;
  institution?: string;
  attendanceRegisterId?: string;
  isNonBillable?: string;
  nonBillableCategory?: string;
};

export interface ProfileProps {
  profileData?: ProfileFormData;
  isModal?: boolean;
  closeModal?: () => void;
}
