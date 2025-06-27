'use client';
import {
  CrewButton,
  CrewIcon,
  CrewLink,
  CrewLogo,
  CrewTypography,
  CrewTypographyWithIcon,
} from '../../../components/atoms';
import useResponsive from '../../../hooks/useResponsive';
import { BottomNavProps } from '../../../types/BottomNavProps';
import { faAngleRight, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Box, Drawer, IconButton, Stack, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Dark from '../../../assets/images/logos/dark.png';
import HeaderIconWithSubmenu from '../website-header-icon/HeaderIconWithSubmenu';
import { CrewIconProps } from '../../../types/CrewIconProps';
import './CrewNavBottom.scss';

const icon: CrewIconProps = {
  icon: faAngleRight,
};

const CrewNavBottom = ({ labelVariant = 'caption', menuItem, direction = 'row', headerIconItems }: BottomNavProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navmenuRef = useRef<HTMLDivElement>(null);
  const isMobile = useResponsive({ query: 'between', key: 'md', start: 'xs', end: 'md' });

  const handleOpenUserMenu = () => {
    setOpen(!open);
  };
  const handleSignInClick = () => {
    window.location.href = '/login';
  };

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Box className={`crew-webiste-header-content-container`}>
      <Drawer
        anchor="top"
        open={open}
        PaperProps={{
          className: `crew-website-header-paper ${open ? 'active' : ''}`,
        }}
        onClose={() => setOpen(false)}
      >
        <Stack className="drawer-bottom-header">
          <Stack direction={'row'} spacing={2} className="bottom-nav">
            <Stack className="close-icon" component={'span'} onClick={() => setOpen(false)} direction={'row'}>
              <CrewIcon icon={faBars} hasInheritedStyles />
            </Stack>
            <CrewLogo theme={theme} src={Dark} />
            <CrewButton variant={'contained'} onClick={handleSignInClick}>
              <CrewTypography variant="body1">Sign In</CrewTypography>
            </CrewButton>
          </Stack>
          <Stack spacing={2} direction={direction} className="bottom-drawer-navitem" ref={navmenuRef}>
            {menuItem.map((menuItem, index) => {
              return (
                <Stack key={index} component={'span'} direction={direction} spacing={2} className="bottom-item">
                  {!isMobile && (
                    <CrewTypography variant={labelVariant} className="bottom-list-item">
                      {menuItem.name}
                    </CrewTypography>
                  )}
                  {isMobile && (
                    <CrewTypographyWithIcon
                      variant={labelVariant}
                      className="bottom-list-item"
                      iconPlacementPosition="right"
                      icon={icon}
                      hasInherited
                    >
                      {menuItem.name}
                    </CrewTypographyWithIcon>
                  )}
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Drawer>
      {isMobile ? (
        <Stack direction={'row'} className="bottom-header">
          <IconButton className="icon-button" onClick={handleOpenUserMenu}>
            <CrewIcon hasInheritedStyles icon={faBars} />
          </IconButton>
          <CrewLogo theme={theme} src={Dark} />
        </Stack>
      ) : (
        <Stack direction={'row'} className="bottom-header">
          <CrewLogo theme={theme} src={Dark} />
          <Stack spacing={2} direction={direction} className="bottom-navitem" ref={navmenuRef}>
            {menuItem.map((menuItem, index) => {
              return (
                <Stack key={index} component={'span'} direction={direction} spacing={2} className="bottom-item">
                  {!isMobile && (
                    <CrewTypography variant={labelVariant} className="bottom-list-item">
                      {menuItem.name}
                    </CrewTypography>
                  )}
                  {isMobile && (
                    <CrewTypographyWithIcon
                      variant={labelVariant}
                      className="bottom-list-item"
                      iconPlacementPosition="right"
                      icon={icon}
                      hasInherited
                    >
                      {menuItem.name}
                    </CrewTypographyWithIcon>
                  )}
                </Stack>
              );
            })}
          </Stack>
          <Stack spacing={2} className="botton-nav-icon" direction={direction}>
            {headerIconItems.map((item, index) => {
              return (
                <HeaderIconWithSubmenu
                  key={index}
                  labelVariant="caption"
                  link={item.link}
                  icon={item.icon}
                  subMenuItems={item.subMenuItems}
                  className={item.icon === faUser ? 'login-icon' : ''}
                />
              );
            })}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default CrewNavBottom;
