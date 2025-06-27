import InvoiceSection from '../../containers/invoice/InvoiceSection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Invoice',
  description: 'Invoice Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <InvoiceSection />
    </ProtectedRoute>
  );
};

export default page;
