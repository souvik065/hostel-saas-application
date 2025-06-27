import OutPassApproval from '../../../containers/out-pass/approve-out-pass/OutPassApproval';
import ProtectedRoute from '../../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Approve Out-Pass',
  description: 'Out-Pass Approval Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Parent', 'Super Admin']}>
      <OutPassApproval />
    </ProtectedRoute>
  );
};

export default page;
