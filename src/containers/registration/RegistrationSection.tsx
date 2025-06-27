'use client';
import { Stack } from '@mui/material';
import { CrewTypographyWithIcon } from '../../components/atoms';
import { CrewIconProps } from '../../types/CrewIconProps';
import { faIdCard } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { CrewTabsWithChildren } from '../../components/organisms';
import RegistrationHostelite from './hostelite-section/RegistrationHostelite';
import RegistrationHostelSection from './hostel-section/RegistrationHostelSection';
import RegistrationParent from './parent-section/RegistrationParent';
import RegistrationDocument from './document/RegistrationDocument';
import RegistrationPayment from './payment/RegistrationPayment';

const icon: CrewIconProps = {
  icon: faIdCard,
};

const RegistrationSection = () => {
  const [value, setValue] = useState(0);
  const tabs = [
    { label: 'Hostelite' },
    { label: 'Parent' },
    { label: 'Hostel' },
    { label: 'Document' },
    { label: 'Payment' },
  ];

  const renderTabs = (value: number) => {
    switch (value) {
      case 0:
        return <RegistrationHostelite />;
      case 1:
        return <RegistrationParent />;
      case 2:
        return <RegistrationHostelSection />;
      case 3:
        return <RegistrationDocument />;
      case 4:
        return <RegistrationPayment />;
      default:
        return null;
    }
  };
  return (
    <Stack component={'section'} spacing={2}>
      <CrewTypographyWithIcon variant="h5" icon={icon} iconPlacementPosition="right">
        Registration
      </CrewTypographyWithIcon>
      <CrewTabsWithChildren onChange={(value) => setValue(value)} tabs={tabs}>
        {renderTabs(value)}
      </CrewTabsWithChildren>
    </Stack>
  );
};

export default RegistrationSection;
