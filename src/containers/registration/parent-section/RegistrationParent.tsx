import { Stack } from '@mui/material';
import React, { useState } from 'react';
import FormSection from './reg-parent-form-section/FormSection';
import { ParentOrGuardianData } from '@/types/CrewRegistration';

const RegistrationParent = () => {
  const [_formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    addressTypeId: '',
    address1: '',
    address2: '',
    town: '',
    district: '',
    state: '',
    pincode: '',
    mobile1: '',
    mobile2: '',
    email1: '',
    email2: '',
    gender: '',
    nationality: '',
    mobile1CountryCode: 'in',
    mobile2CountryCode: 'in',
    profession: '',
    relationTypeId: '',
  } as ParentOrGuardianData);

  return (
    <section>
      <Stack spacing={6}>
        <FormSection formData={_formData} />
      </Stack>
    </section>
  );
};

export default RegistrationParent;
