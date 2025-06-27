'use client';
import React, { useEffect, useState } from 'react';
import './Selection.scss';
import { CrewSelect } from '../../components/atoms';
import { Stack } from '@mui/material';
import { getAllHostelIdAndName, getAllHostelIdAndNameByWarden } from '../../helpers/hostel';
import { useSession } from 'next-auth/react';
import { setCookie } from 'cookies-next';
import { getHosteliteDetailsByParentId } from '../../helpers/leave';

const Selection = () => {
  const { data: session } = useSession();
  const userRoles = session?.userRole;
  const [dropDownData, setDropDownData] = useState<{ label: string; value: string }[]>([]);

  const getAllHostelData = async () => {
    const hostelData = await getAllHostelIdAndName();
    if (hostelData !== null) {
      const transformedHostelData = hostelData?.data?.map((item: any) => ({
        label: item.hostelName,
        value: item.hostelId.toString(),
      }));
      setDropDownData(transformedHostelData);
    }
  };

  const getAllHostelDataByWarden = async () => {
    const hostelData = await getAllHostelIdAndNameByWarden();
    if (hostelData !== null) {
      const transformedHostelData = hostelData?.data?.map((item: any) => ({
        label: item.hostelName,
        value: item.hostelId.toString(),
      }));
      setDropDownData(transformedHostelData);
    }
  };

  const getHosteliteDetailsByParent = async () => {
    try {
      const studentData = await getHosteliteDetailsByParentId();
      if (studentData !== null) {
        if (studentData.data.hostelites.length > 1) {
          const data = studentData.data.hostelites.map((item: any) => ({
            label: `${item.hosteliteFirstName} ${item.hosteliteLastName}`,
            value: item.hosteliteId,
          }));
          setDropDownData(data);
        }
        if (studentData.data.hostelites.length === 1) {
          setCookie('HosteliteId', studentData.data.hostelites[0].hosteliteId);
          window.location.href = '/profile';
        }
      }
    } catch (error) {
      console.error('Error fetching hostelite:', error);
    }
  };
  useEffect(() => {
    if (userRoles === 'Parent') {
      getHosteliteDetailsByParent();
    } else if (userRoles === 'Warden') {
      getAllHostelDataByWarden();
    } else if (userRoles === 'Admin' || userRoles === 'Super Admin') {
      getAllHostelData();
    } else {
    }
  }, []);
  const handleSelectClick = (id: string) => {
    if (userRoles === 'Admin' || userRoles === 'Super Admin' || userRoles === 'Warden') {
      setCookie('HostelId', id);
      window.location.href = '/enquiry';
    } else {
      setCookie('HosteliteId', id);
      window.location.href = '/profile';
    }
  };

  return (
    <div className="container">
        <Stack component={'div'} className="user-selection">
          <CrewSelect
            label="Select"
            labelVariant="subtitle2"
            menuItems={dropDownData}
            onChange={(value) => {
              handleSelectClick(value);
            }}
            placeholder="Select"
          />
        </Stack>
      </div>
  );
};

export default Selection;
