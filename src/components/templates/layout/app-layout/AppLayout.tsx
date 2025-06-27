'use client';
import React, { useState } from 'react';
import { CrewHeader, CrewSideBar } from '../../../molecules';
import { useSession } from 'next-auth/react';
import { Stack, useTheme } from '@mui/material';
import './AppLayout.scss';
import { getThemeModeClass } from '../../../../utils/ComponentHelper';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CrewAuthenticationDialogProvider } from '../../../../components/molecules';
import { faCog, faCreditCard, faEdit, faQuestion } from '@fortawesome/free-solid-svg-icons';
interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const menuItems = [
  {
    name: 'Edit Profile',
    icon: faEdit,
    path: '/profile',
  },
  {
    name: 'Payments',
    icon: faCreditCard,
    path: '/invoice',
  },
  {
    name: 'Need Help',
    icon: faQuestion,
    path: '',
  },
];

const AppLayout = ({ children, title }: LayoutProps) => {
  const [openNav, setOpenNav] = useState(false);
  const { data: session } = useSession();
  const theme = useTheme();
  const hasActiveSession = session;
  return (
    <Stack className={`app-container ${getThemeModeClass(theme.palette.mode)}`}>
      <CrewSideBar
        onClose={() => setOpenNav(false)}
        open={openNav}
        user={session?.user ?? { name: '', email: '', image: '' }}
        userRole={session?.userRole}
      />
      <Stack className={`main`}>
        <Stack className="content">
          <CrewHeader
            pageTitle={title}
            onNavOpen={() => setOpenNav(true)}
            name={session?.user?.name ?? ''}
            image={session?.user?.image ?? ''}
            email={session?.user?.email ?? ''}
            menuItems={menuItems}
          />
        </Stack>
        <Stack className={`content app-container-children ${getThemeModeClass(theme.palette.mode)}`}>
          <Stack className={`app-container-main ${getThemeModeClass(theme.palette.mode)}`}>
            {hasActiveSession ? (
              <>
                {children}
                <SpeedInsights />
              </>
            ) : (
              <CrewAuthenticationDialogProvider open={true} msg={'Session not available. Please log in.'} />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AppLayout;
