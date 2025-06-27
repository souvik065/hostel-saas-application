import { Stack } from '@mui/material';
import React, { useState } from 'react';
import FormSection from './reg-hostel-form-section/FormSection';
import { HostelData } from '@/types/CrewRegistration';

const RegistrationHostelSection = () => {
  const [_formData, setFormData] = useState({
    hostelId: '',
    planTypeId: '',
    hosteliteId: '',
    buildingId: '',
    floorId: '',
    roomId: '',
  } as HostelData);
  return (
    <section>
      <Stack spacing={6}>
        <FormSection hostelData={_formData} />
      </Stack>
    </section>
  );
};

export default RegistrationHostelSection;
