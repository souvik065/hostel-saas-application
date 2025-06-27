import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';
import Complaint from '../../containers/complaint/Complaint';

export const metadata: Metadata = {
  title: 'Apply Compliant',
  description: 'Compliant',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Hostelite', 'Parent', 'Super Admin']}>
      <Complaint />
    </ProtectedRoute>
  );
};

export default page;
