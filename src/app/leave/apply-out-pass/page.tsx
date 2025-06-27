import OutPassApply from '../../../containers/out-pass/apply-out-pass/OutPassApply';
import ProtectedRoute from '../../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Apply Late Comming',
  description: 'Late Comming Apply  Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Hostelite', 'Super Admin']}>
      <OutPassApply />
    </ProtectedRoute>
  );
};

export default page;
