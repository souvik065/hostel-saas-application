import React from 'react';
import { Metadata } from 'next';
import HostelMainLayout from '@/components/templates/layout/hostel-main-layout/HostelMainLayout';

export const metadata: Metadata = {
  title: 'Hostel',
  description: 'Hostel  Page',
};
const page = () => {
  return <HostelMainLayout />;
};

export default page;
