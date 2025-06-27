import { Stack, useTheme } from '@mui/material';
import { CrewLink, CrewIcon, CrewTypography } from '../../atoms';
import React from 'react';
import { signOut } from 'next-auth/react';
import { CrewSubMenuProps } from '../../../types/CrewSubMenuProps';
import './CrewSubMenu.scss';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

const CrewSubMenu = ({ open, labelVariant = 'caption', menuItems, isLogoutButton }: CrewSubMenuProps) => {
  const renderLogoutButton = () => {
    const logoutClick = () => {
      signOut().then(() => {
        window.location.href = '/login';
      });
    };
    return (
      <Stack className={`sub-menu-link`}>
        <Stack component={'span'} className="list-item" direction={'row'} spacing={2} onClick={logoutClick}>
          <CrewIcon icon={faSignOut} />
          <CrewTypography variant={labelVariant}>Logout</CrewTypography>
        </Stack>
      </Stack>
    );
  };

  const theme = useTheme();

  return (
    <Stack className={`${getThemeModeClass(theme.palette.mode)} avatar-submenu-wrap ${open ? 'opened' : ''}`}>
      <Stack spacing={1} className="sub-menu">
        {menuItems &&
          menuItems.map((menuItem, index) => {
            return (
              <CrewLink key={index} className={`sub-menu-link`} href={menuItem.path ?? ''}>
                <Stack component={'span'} className="list-item" direction={'row'} spacing={2}>
                  {menuItem.icon && <CrewIcon icon={menuItem.icon} />}
                  <CrewTypography variant={labelVariant}> {menuItem.name}</CrewTypography>
                </Stack>
              </CrewLink>
            );
          })}

        {isLogoutButton && renderLogoutButton()}
      </Stack>
    </Stack>
  );
};

export default CrewSubMenu;
