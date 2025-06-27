'use client';
import React, { useEffect, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CrewIcon, CrewInputField, CrewLink, CrewLogo, CrewSelect, CrewTypography } from '../../atoms';
import './CrewHeader.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import Dark from '../../../assets/images/logos/dark.png';
import Light from '../../../assets/images/logos/light.png';
import useResponsive from '../../../hooks/useResponsive';
import CrewAvatar from '../../organisms/avatar/CrewAvatar';
import { getAllHostelIdAndName } from '../../../helpers/hostel';
import { setCookie, getCookie } from 'cookies-next';
import { TopNavProps } from '../../../types/TopNavProps';
import { useSession } from 'next-auth/react';
import { getHosteliteDetailsByParentId } from '../../../helpers/leave';

const CrewHeader = ({ onNavOpen, image, name, email, pageTitle, menuItems }: TopNavProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState<string>('');
  const isMobile = useResponsive({ query: 'between', key: 'md', start: 'xs', end: 'md' });
  const [Id, setId] = useState<string>('');
  const [dropDownData, setDropDownData] = useState<{ label: string; value: string }[]>([]);

  const { data: session } = useSession();
  const userRoles = session?.userRole;

  const getAllHostelIdsAndNames = async () => {
    try {
      const hostelNameAndIds = await getAllHostelIdAndName();

      if (hostelNameAndIds && hostelNameAndIds?.data?.length > 0) {
        const transformedHostelData = hostelNameAndIds?.data.map((item: any) => ({
          label: item.hostelName,
          value: item.hostelId.toString(),
        }));
        setDropDownData(transformedHostelData);
      }
    } catch (error) {
      console.error('Error fetching hostel data:', error);
    }
  };

  const getHosteliteDetailsByParent = async () => {
    try {
      const studentData = await getHosteliteDetailsByParentId();
      if (studentData !== null) {
        if (studentData.data.hostelites.length > 0) {
          const data = studentData.data.hostelites.map((item: any) => ({
            label: `${item.hosteliteFirstName} ${item.hosteliteLastName}`,
            value: item.hosteliteId,
          }));
          setDropDownData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching hostelite:', error);
    }
  };

  const handleDropDownSelection = (id: string) => {
    if (userRoles === 'Admin' || userRoles === 'Super Admin' || userRoles === 'Warden') {
      setId(id);
      setCookie('HostelId', id);
      document.dispatchEvent(new CustomEvent('hostelChange', { detail: { selectedHostel: id } }));
    } else if (userRoles === 'Parent') {
      setCookie('HosteliteId', id);
      document.dispatchEvent(new CustomEvent('hosteliteChange', { detail: { selectedHostelite: id } }));
    }
  };

  const handleHostelChange = (event: CustomEvent<{ selectedHostel: string }>) => {
    const newHostelId = event.detail.selectedHostel;
    setId(newHostelId);
    setCookie('HostelId', newHostelId);
  };

  const handleHosteliteChange = (event: CustomEvent<{ selectedHostelite: string }>) => {
    const newHosteliteId = event.detail.selectedHostelite;
    setId(newHosteliteId);
    setCookie('HosteliteId', newHosteliteId);
  };

  useEffect(() => {
    if (userRoles === 'Admin' || userRoles === 'Super Admin' || userRoles === 'Warden') {
      getAllHostelIdsAndNames();
      const hostelId = getCookie('HostelId');
      if (hostelId !== null || hostelId !== '') {
        setId(hostelId as string);
      }
    } else if (userRoles === 'Parent') {
      getHosteliteDetailsByParent();
      const hosteliteId = getCookie('HosteliteId');
      if (hosteliteId !== null || hosteliteId !== '') {
        setId(hosteliteId as string);
      }
    }

    document.addEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    document.addEventListener('hosteliteChange', handleHosteliteChange as EventListenerOrEventListenerObject);

    return () => {
      document.removeEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
      document.removeEventListener('hosteliteChange', handleHosteliteChange as EventListenerOrEventListenerObject);
    };
  }, []);

  return (
    <>
      <section className={`crew-header ${getThemeModeClass(theme.palette.mode)} ${isMobile ? 'mobile' : ''} `}>
        <Stack className="header-container">
          <Stack direction={'row'} className="header-main-section">
            <Stack direction={'row'} spacing={3} className="content1">
              {isMobile && (
                <Stack className="crew-header-icon-bars">
                  <IconButton className="icon-button" onClick={onNavOpen}>
                    <CrewIcon hasInheritedStyles icon={faBars} />
                  </IconButton>
                </Stack>
              )}
              {!isMobile && (
                <Stack className="text-wrapper">
                  <CrewTypography variant="h4">{pageTitle}</CrewTypography>
                </Stack>
              )}
              {isMobile && <CrewLogo theme={theme} src={theme.palette.mode === 'dark' ? Dark : Light} />}
              {!isMobile &&
                (userRoles === 'Warden' ||
                  userRoles === 'Admin' ||
                  userRoles === 'Super Admin' ||
                  userRoles === 'Parent') && (
                  <Stack className="select-wrapper">
                    <CrewSelect
                      className="dropdown"
                      value={Id}
                      menuItems={dropDownData}
                      onChange={(value) => handleDropDownSelection(value)}
                      labelVariant={'body1'}
                    />
                  </Stack>
                )}
            </Stack>
            <Stack spacing={4} direction={'row'} className="content2">
              {!isMobile && (
                <CrewInputField
                  radius={10}
                  width={283}
                  value={searchValue}
                  onValueChange={(value) => setSearchValue(value)}
                  placeholder="Search"
                  endIcon={
                    <Stack className="search-icon">
                      <CrewIcon hasInheritedStyles icon={faSearch} />
                    </Stack>
                  }
                />
              )}
              <CrewLink href="#">
                <CrewIcon className="link-bell" icon={faBell} />
              </CrewLink>
              <CrewAvatar name={name} image={image} email={email} menuItems={menuItems} />
            </Stack>
          </Stack>
        </Stack>
      </section>
      {isMobile && (
        <Stack className={`crew-header-title-container ${getThemeModeClass(theme.palette.mode)}`}>
          <CrewTypography variant="h4">{pageTitle}</CrewTypography>
        </Stack>
      )}
    </>
  );
};

export default CrewHeader;
