import { Avatar, Box, Drawer, Stack, useTheme } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import { NavMenuItems, SidebarItem } from '../../../config/NavMenuConfig';
import Dark from '../../../assets/images/logos/dark.png';
import Light from '../../../assets/images/logos/light.png';
import { CrewIcon, CrewLogo, CrewTypography } from '../../atoms';
import { getThemeModeClass, trimText } from '../../../utils/ComponentHelper';
import './CrewSideBar.scss';
import CrewThemeSwitch from '../theme-switch/CrewThemeSwitch';
import CrewNavSection from '../side-nav-menu/CrewNavSection';
import UserImage from '../../../assets/images/avatar.png';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CrewSideBar = ({ open, onClose, user, userRole }: SideNavProps) => {
  const theme = useTheme();
  const isMobile = useResponsive({ query: 'between', key: 'md', start: 'xs', end: 'md' });
  const imageUrl = UserImage.src;
  const filterMenuItems = (NavMenuItems: SidebarItem[], userRole: string) => {
    const filteredItems: SidebarItem[] = [];
    NavMenuItems.forEach((item) => {
      if (item.allowedRoles.includes(userRole)) {
        const filteredItem: SidebarItem = {
          title: item.title,
          path: item.path,
          icon: item.icon,
          allowedRoles: item.allowedRoles,
        };

        if (item.subitems) {
          filteredItem.subitems = filterMenuItems(item.subitems, userRole);
        }

        filteredItems.push(filteredItem);
      }
    });

    return filteredItems;
  };
  let filteredNavMenuItems: SidebarItem[] = NavMenuItems;
  if (userRole) {
    filteredNavMenuItems = filterMenuItems(NavMenuItems, userRole);
  }
  return (
    <Drawer
      anchor="left"
      open={open}
      PaperProps={{
        className: `crew-sidebar-paper ${getThemeModeClass(theme.palette.mode)} ${open ? 'active' : ''}`,
      }}
      variant={!isMobile ? 'permanent' : 'temporary'}
      onClose={onClose}
    >
      <Box className={`crew-sidebar-content-container ${getThemeModeClass(theme.palette.mode)}`}>
        {!isMobile && (
          <Box className="crew-sidebar-content-logo">
            <CrewLogo theme={theme} src={theme.palette.mode === 'dark' ? Dark : Light} />
          </Box>
        )}
        {isMobile && (
          <>
            <Stack component={'span'} spacing={2} direction={'row'} className="avatar-content">
              <Avatar src={user?.image || imageUrl} alt={user?.name ?? 'userImage'} className="crew-avtar" />
              <Stack direction={'column'}>
                <CrewTypography>{user?.name}</CrewTypography>
                <CrewTypography>{trimText(user?.email, 15)}</CrewTypography>
              </Stack>
              <Stack component={'span'} onClick={onClose}>
                <CrewIcon icon={faAngleRight} />
              </Stack>
            </Stack>
          </>
        )}
        <Stack className="crew-sidebar-content-paper">
          <CrewNavSection items={filteredNavMenuItems} />
        </Stack>
        <Stack className="crew-sidebar-toggle-theme">
          <Stack className="content">
            <CrewThemeSwitch lableVariant="caption" />
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CrewSideBar;
