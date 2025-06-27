import LoginFormSection from '@/containers/auth/login/LoginFormSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Hostel Login',
};
const page = () => {
  return <LoginFormSection />;
};

export default page;
