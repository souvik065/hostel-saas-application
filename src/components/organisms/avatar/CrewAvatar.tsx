'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Stack, useTheme } from '@mui/material';
import { getThemeModeClass, trimText } from '../../../utils/ComponentHelper';
import './CrewAvatar.scss';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { CrewIcon, CrewTypography } from '../../atoms';
import { AvatarProps } from '../../..//types/AvatarProps';
import UserImage from '../../../assets/images/avatar.png';
import { signOut } from 'next-auth/react';
import useResponsive from '../../../hooks/useResponsive';
import CrewSubMenu from '../../../components/molecules/submenu/CrewSubMenu';

const CrewAvatar = ({ image, name, labelVariant = 'caption', email, emailLength = 30, menuItems }: AvatarProps) => {
  const theme = useTheme();
  const imageUrl = UserImage.src;
  const [open, setOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isMobile = useResponsive({ query: 'between', key: 'md', start: 'xs', end: 'lg' });

  const handleOpenUserMenu = () => {
    console.log('clicked');
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
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
    <section ref={avatarRef}>
      <Stack className={`${getThemeModeClass(theme.palette.mode)}`}>
        <Stack component={'div'} spacing={2} direction={'row'} className="avatar-content" onClick={handleOpenUserMenu}>
          <Avatar src={image || imageUrl} alt={name ?? 'userImage'} className="crew-avtar" />
          {!isMobile && (
            <>
              <Stack direction={'column'}>
                <CrewTypography>{name}</CrewTypography>
                <CrewTypography>{trimText(email, emailLength)}</CrewTypography>
              </Stack>
              <Stack>
                {!open && <CrewIcon icon={faAngleDown} />}
                {open && <CrewIcon icon={faAngleUp} />}
              </Stack>
            </>
          )}
        </Stack>
        <CrewSubMenu open={open} labelVariant={labelVariant} menuItems={menuItems} isLogoutButton />
      </Stack>
    </section>
  );
};

export default CrewAvatar;
