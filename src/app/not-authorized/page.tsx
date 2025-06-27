import { CrewTypography } from '../../components/atoms';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Not-Authorized',
  description: 'Not Authorized Page',
};

const page = () => {
  return <CrewTypography>You have don&apos;t have the permission to view this page</CrewTypography>;
};

export default page;
