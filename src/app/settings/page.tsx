import SettingSection from '../../containers/settings/SettingSection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Setting Page for Hostel',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Admin', 'Super Admin']}>
      <SettingSection />
    </ProtectedRoute>
  );
};

export default page;
