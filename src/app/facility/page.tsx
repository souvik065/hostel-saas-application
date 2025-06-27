import CreateFacility from '../../containers/facility/CreateFacility';
import ProtectedRoute from '../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Facility',
  description: 'Facility Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <CreateFacility />
    </ProtectedRoute>
  );
};

export default page;
