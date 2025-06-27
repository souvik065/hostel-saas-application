import Selection from '@/containers/user-selection/Selection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Selection',
  description: 'Selection Page for Hostel',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Admin', 'Super Admin', 'Warden', 'Parent', 'Hostelite']}>
      <Selection />
    </ProtectedRoute>
  );
};

export default page;
