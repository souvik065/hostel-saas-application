'use client';
import { CrewTabsWithChildrenProps } from '../../../types/CrewTabsProps';
import { CrewTabs } from '../../../components/molecules';
import React, { useState } from 'react';
import './CrewTabsWithChildren.scss';
import { Stack } from '@mui/material';

const CrewTabsWithChildren = ({ tabs, children, onChange }: CrewTabsWithChildrenProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Stack component={'section'}>
      <CrewTabs value={value} onChange={handleChange} tabs={tabs} />
      <Stack component={'section'} className="children-setcion">
        {children}
      </Stack>
    </Stack>
  );
};

export default CrewTabsWithChildren;
