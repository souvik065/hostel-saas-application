'use client';
import { Stack } from '@mui/material';
import { CrewTypographyWithIcon } from '../../components/atoms';
import { CrewIconProps } from '../../types/CrewIconProps';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { CrewTabsWithChildren } from '../../components/organisms';
import PlanTypeSection from './plan-type-section/PlanTypeSection';
import FeeTypeSection from './fee-type-section/FeeTypeSection';
import GeneralSection from './general-section/GeneralSection';
import RelationSection from './relation-type-section/RelationSection';
import LeaveTypeSection from './leave-type-section/LeaveTypeSection';

const icon: CrewIconProps = {
  icon: faScrewdriverWrench,
};

const SettingSection = () => {
  const [value, setValue] = useState(0);
  const tabs = [
    { label: 'Plan Type' },
    { label: 'Fee Type' },
    { label: 'General' },
    { label: 'Relation' },
    { label: 'Leave Type' },
  ];

  const renderContent = (value: number) => {
    switch (value) {
      case 0:
        return <PlanTypeSection />;
      case 1:
        return <FeeTypeSection />;
      case 2:
        return <GeneralSection />;
      case 3:
        return <RelationSection />;
      case 4:
        return <LeaveTypeSection />;
      default:
        return null;
    }
  };
  return (
    <Stack component={'section'} spacing={2}>
      <CrewTypographyWithIcon variant="h5" icon={icon} iconPlacementPosition="right">
        Settings
      </CrewTypographyWithIcon>
      <CrewTabsWithChildren onChange={(value) => setValue(value)} tabs={tabs}>
        {renderContent(value)}
      </CrewTabsWithChildren>
    </Stack>
  );
};

export default SettingSection;
