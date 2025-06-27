import { Metadata } from 'next';
import React from 'react';
import AgreementSection from '../../containers/agreement/AgreementSection';
import ProtectedRoute from '../../providers/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Agreement',
  description: 'Agreement Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Admin', 'Super Admin']}>
      <AgreementSection />
    </ProtectedRoute>
  );
};

export default page;
