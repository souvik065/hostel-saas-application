import { Stack } from '@mui/material';
import React, { useState } from 'react';
import FormSection from './reg-hostelite-form-section/FormSection';
import { HosteliteData } from '../../../types/CrewRegistration';
import { getCookie } from 'cookies-next';

const RegistrationHostelite = () => {
  const [_formData, setFormData] = useState({
    hostelId: getCookie('HostelId'),
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    town: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    mobile1: '',
    mobile2: '',
    email1: '',
    email2: '',
    dob: new Date(),
    institution: '',
    occupation: '',
    gender: '',
    isNonBillable: 'No',
    planTypeId: '',
    attendanceRegisterId: '',
    nonBillableCategory: '',
    nationality: '',
    mobile1CountryCode: 'in',
    mobile2CountryCode: 'in',
    emergencyCountryCode: 'in',
    emergencyContactName: '',
    emergencyContactNo: '',
    emergencyContactRelation: '',
  } as HosteliteData);
  return (
    <section>
      <Stack spacing={6}>
        <FormSection hosteliteData={_formData} />
      </Stack>
    </section>
  );
};

export default RegistrationHostelite;
