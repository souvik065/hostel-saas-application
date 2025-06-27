import ProtectedRoute from '../../providers/ProtectedRoute';
import ProfileSection from '../../containers/profile/ProfileSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile Page',
};

const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Parent', 'Warden', 'Hostelite','Super Admin']}>
      <ProfileSection />
    </ProtectedRoute>
  );
};

export default page;
