import RegistrationSection from '../../containers/registration/RegistrationSection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registration',
  description: 'Student Registration',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <RegistrationSection />
    </ProtectedRoute>
  );
};

export default page;
