'use client';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { Stack, useTheme } from '@mui/material';
import './HostelMainLayout.scss';
import HostelSection from '../../../../containers/hostel/hostel-creation-section/HostelSection';
import { CrewIcon, CrewTypography } from '../../../../components/atoms';

import {
  faBed,
  faBuilding,
  faBuildingFlag,
  faHotel,
  faPersonBooth,
  faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import BuildingSection from '../../../../containers/building/BuildingSection';
import FloorSection from '../../../../containers/floor/FloorSection';
import RoomSection from '../../../../containers/room/RoomSection';
import { getCookie } from 'cookies-next';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getThemeModeClass } from '../../../../utils/ComponentHelper';
import AssignWardenSection from '../../../../containers/assign-warden/AssignWardenSection';
import ProtectedRoute from '../../../../providers/ProtectedRoute';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabData {
  label: string;
  content: React.ReactNode;
  icon: IconProp;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const HostelMainLayout = () => {
  const [value, setValue] = useState(0);
  const [hostelId, setHostelId] = useState<string>('');
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabData: TabData[] = [
    {
      label: 'Hostel',
      content: (
        <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
          <HostelSection />
        </ProtectedRoute>
      ),
      icon: faHotel,
    },
    {
      label: 'Building',
      content: (
        <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
          <BuildingSection hostelId={hostelId} />
        </ProtectedRoute>
      ),
      icon: faBuilding,
    },
    {
      label: 'Floor',
      content: (
        <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
          <FloorSection hostelId={hostelId} />
        </ProtectedRoute>
      ),
      icon: faBuildingFlag,
    },
    {
      label: 'Room',
      content: (
        <ProtectedRoute requiredRoles={['Warden', 'Admin', 'Super Admin']}>
          <RoomSection hostelId={hostelId} />
        </ProtectedRoute>
      ),
      icon: faBed,
    },
    {
      label: 'Warden',
      content: (
        <ProtectedRoute requiredRoles={['Admin', 'Super Admin']}>
          <AssignWardenSection hostelId={hostelId} />
        </ProtectedRoute>
      ),
      icon: faPersonBooth,
    },
  ];

  useEffect(() => {
    const hostelId = getCookie('HostelId');
    if (hostelId !== null || hostelId !== '') {
      setHostelId(hostelId as string);
    }
  }, []);

  useEffect(() => {
    const handleHostelChange = (event: CustomEvent<{ selectedHostel: string }>) => {
      const newHostelId = event.detail.selectedHostel;
      setHostelId(newHostelId);
    };
    document.addEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    };
  }, []);

  return (
    <Box className={`hostel-main-layout ${getThemeModeClass(theme.palette.mode)}`}>
      <Stack spacing={3} className="head-container">
        <Stack direction={'row'} className="hostel-main-layout-header">
          <Stack direction="row" spacing={2}>
            <CrewTypography variant="h4">{tabData[value].label}</CrewTypography>
            <CrewIcon className="icon" icon={tabData[value].icon} />
          </Stack>
        </Stack>
        {/* rendering tabs */}
        <Box className="hostel-tab-content">
          <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs example">
            {tabData.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                {...a11yProps(index)}
                className="tab-name"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: `${(100 / tabData.length) * index}%`,
                  width: `${100 / tabData.length}%`,
                  '&.Mui-selected': {
                    borderColor: '#15CEDA',
                    borderBottom: '4px solid #15CEDA',
                    color: 'white',
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Stack>
      {/* rendering pages */}
      {tabData.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default HostelMainLayout;
