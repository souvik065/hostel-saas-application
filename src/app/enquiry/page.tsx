import EnquirySection from '../../containers/enquiry/EnquirySection';
import ProtectedRoute from '../../providers/ProtectedRoute';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enquiry',
  description: 'Enquiry Login',
};
const page = () => {
  return (
    <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
      <EnquirySection />
    </ProtectedRoute>
  );
};

export default page;
