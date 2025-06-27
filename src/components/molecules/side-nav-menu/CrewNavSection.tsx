import { useEffect, useRef, useState } from 'react';
import { Box, List, ListItemText, Stack, useTheme } from '@mui/material';
import { SidebarItem } from '../../../config/NavMenuConfig';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { CrewIcon, CrewLink, CrewTypography } from '../../../components/atoms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './CrewNavSection.scss';
import { usePathname } from 'next/navigation';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface NavSectionProps {
  items: SidebarItem[];
}

interface NavItemProp {
  item: SidebarItem;
}
export default function CrewNavSection({ items }: NavSectionProps) {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {items.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </List>
    </Box>
  );
}

const SubNavItem = ({ item }: NavItemProp) => {
  const { title, path, icon } = item;

  return (
    <Stack className={`sub-menu-link`}>
      <Stack component={'span'} className="list-item" direction={'row'} spacing={2}>
        <CrewIcon icon={icon} />
        <ListItemText disableTypography>
          <CrewLink href={path} target="_self" variant="caption">
            {title}
          </CrewLink>
        </ListItemText>
      </Stack>
    </Stack>
  );
};

const NavItem = ({ ...item }: SidebarItem) => {
  const { title, path, icon, subitems } = item;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathName = usePathname();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const renderBase = (title: string, icon: IconProp) => (
    <Stack
      ref={menuRef}
      className={`nav-item-menu-container ${getThemeModeClass(theme.palette.mode)} ${
        pathName === path ? 'active' : ''
      }`}
      onClick={subitems && handleClick}
    >
      <Stack spacing={2} direction={'row'} className="nav-item-menu">
        <CrewIcon icon={icon} />
        <ListItemText disableTypography>
          <CrewTypography variant="caption">{title}</CrewTypography>
        </ListItemText>
        {subitems && (open ? <CrewIcon icon={faAngleUp} /> : <CrewIcon icon={faAngleDown} />)}
      </Stack>
    </Stack>
  );
  // if have submenu return
  if (subitems) {
    return (
      <>
        {renderBase(title, icon)}
        <Stack className={`nav-submenu-wrap ${open ? 'opened' : ''}`}>
          <Stack spacing={1} className="sub-menu">
            {subitems.map((subNavItem) => (
              <SubNavItem key={subNavItem.title} item={subNavItem} />
            ))}
          </Stack>
        </Stack>
      </>
    );
  }
  // if not have submenu return
  return (
    <Stack
      className={`nav-item-menu-container ${getThemeModeClass(theme.palette.mode)} ${
        pathName === path ? 'active' : ''
      }`}
    >
      <Stack spacing={2} direction={'row'} className="nav-item-menu">
        <CrewIcon icon={icon} />
        <ListItemText disableTypography>
          <CrewLink href={path} target="_self" variant="caption">
            {title}
          </CrewLink>
        </ListItemText>
      </Stack>
    </Stack>
  );
};
