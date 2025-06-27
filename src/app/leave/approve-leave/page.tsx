import LeaveApproval from '../../../containers/leave/approve-leave/LeaveApproval';
import ProtectedRoute from '../../../providers/ProtectedRoute';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Approve Leave',
  description: 'Leave Approval Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Parent', 'Super Admin']}>
      <LeaveApproval />
    </ProtectedRoute>
  );
};

export default page;
