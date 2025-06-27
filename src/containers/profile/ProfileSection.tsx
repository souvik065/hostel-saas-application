'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import WardenProfileSection from './warden/WardenProfileSection';
import ParentProfileSection from './parent/ParentProfileSection';
import HosteliteProfileSection from './hostelite/HosteliteProfileSection';

const ProfileSection = () => {
  const { data: session } = useSession();

  const userRoles = session?.userRole;

  if (userRoles === 'Warden') {
    return <WardenProfileSection />;
  } else if (userRoles === 'Parent') {
    return <ParentProfileSection />;
  }
  return <HosteliteProfileSection />;
};

export default ProfileSection;
