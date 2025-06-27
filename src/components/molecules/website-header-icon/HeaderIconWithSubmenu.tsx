'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Stack, useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import './HeaderIconWithSubmenu.scss';
import { CrewIcon, CrewLink } from '../../atoms';
import { HeaderIconWithSubMenuProps } from '../../../types/HeaderIconWithSubMenuProps';
import CrewSubMenu from '../submenu/CrewSubMenu';

const HeaderIconWithSubmenu = ({ labelVariant = 'caption', icon, link, subMenuItems, className }: HeaderIconWithSubMenuProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleOpenUserMenu = () => {
    console.log('clicked');
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section ref={notificationRef} className={className}>
      <Stack>
        <Stack
          component={'div'}
          spacing={2}
          direction={'row'}
          onClick={handleOpenUserMenu}
        >
          {link && (
            <CrewLink href={link}>
              <CrewIcon className="header-icon" icon={icon} />
            </CrewLink>
          )}
          {!link && <CrewIcon className="header-icon" icon={icon} />}
        </Stack>
        <Stack className="header-submenu-content">
          {subMenuItems && open && <CrewSubMenu open={open} labelVariant={labelVariant} menuItems={subMenuItems} />}
        </Stack>
      </Stack>
    </section>
  );
};

export default HeaderIconWithSubmenu;
