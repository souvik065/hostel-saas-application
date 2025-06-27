import WardenCreationSection from '../../containers/warden/warden-creation/WardenCreationSection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Warden-Creation',
  description: 'Create a Wardens',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <WardenCreationSection />
    </ProtectedRoute>
  );
};

export default page;
