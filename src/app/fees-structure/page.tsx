import FeesStructure from '../../containers/fees-structure/FeesStructure';
import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fees Structure',
  description: 'Fees Structure Page',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <FeesStructure />
    </ProtectedRoute>
  );
};

export default page;
