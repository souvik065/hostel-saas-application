import LeaveApply from '../../../containers/leave/apply-leave/LeaveApply';
import ProtectedRoute from '../../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Apply Leave',
  description: 'Leave Apply Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Hostelite', 'Super Admin']}>
      <LeaveApply />
    </ProtectedRoute>
  );
};

export default page;
