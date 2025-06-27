'use client';
import React from 'react';
import { Tab, Tabs, useTheme } from '@mui/material';
import './CrewTabs.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { CrewTabsProps } from '../../../types/CrewTabsProps';

const CrewTabs = ({ value, onChange, tabs }: CrewTabsProps) => {
  const theme = useTheme();
  return (
    <Tabs
      className={`${getThemeModeClass(theme.palette.mode)}`}
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {tabs.map((tab, index) => (
        <Tab className={`tab-name `} key={index} label={tab.label} {...getIdProps(index)} />
      ))}
    </Tabs>
  );
};

function getIdProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default CrewTabs;
