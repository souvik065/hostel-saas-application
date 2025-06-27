'use client';
import { LeaveDetail, LeaveFormData } from '../../../types/Leave';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  getAllLeavesByHostelId,
  getHosteliteDetailsByParentId,
  getLeaveDetailsByHosteliteId,
  getStatusDetails,
} from '../../../helpers/leave';
import { getCookie } from 'cookies-next';
import FormSection from './approval-form/FormSection';
import { CrewSelect } from '../../../components/atoms';

const tableColumns = [
  { id: 'firstName', label: 'Student Name' },
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'reason', label: 'Notes' },
  { id: 'parentApprovalStatus', label: 'Parent Approval Status' },
  { id: 'wardenApprovalStatus', label: 'Warden Approval Status' },
  { id: 'fromDate', label: 'From Date' },
  { id: 'toDate', label: 'To Date' },
  { id: 'createdAt', label: 'Applied Date' },
];

const LeaveApproval = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelId: getCookie('HostelId'),
    fromDate: new Date(),
    toDate: new Date(),
    reason: '',
    leaveType: '',
  } as LeaveFormData);

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<LeaveFormData>({});
  const [studentData, setStudentData] = useState<{ label: string; value: string }[]>([]);
  const [statusData, setStatusData] = useState<{ label: string; value: string }[]>([]);
  const [hosteliteId, setHosteliteId] = useState<string>('');
  const [statusId, setStatusId] = useState<string>('');
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [leaveList, setLeaveList] = useState<[]>([]);
  const { data: session } = useSession();
  const userRoles = session?.userRole;

  let allActions = [
    { id: 1, label: 'Approve' },
    { id: 2, label: 'Reject' },
  ];

  const toggleModal = () => {
    setShowCrewModal(!showCrewModal);
  };

  const closeTableModal = () => {
    setTableModalOpen(false);
  };

  const handleActionSelect = (actionData: any) => {
    const approveData = statusData.find((item) => item.label.toLowerCase() === actionData.toLowerCase());
    if (approveData) {
      setStatusId(approveData.value);
    }
    switch (actionData) {
      case 'Approve':
        setAction('Approve');
        toggleModal();
        break;
      case 'Reject':
        setAction('Reject');
        toggleModal();
        break;

      default:
        break;
    }
  };

  const getAllleavesDataByHostelId = async (id: string) => {
    try {
      const leaveData = await getAllLeavesByHostelId(id);
      setLeaveList(leaveData?.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const getAllStauts = async () => {
    try {
      const StatusData = await getStatusDetails();
      if (StatusData.data.length > 0) {
        const data = StatusData.data.map((item: any) => ({
          label: item.statusName,
          value: item.id,
        }));
        console.log('status', data);
        setStatusData(data);
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  const getHosteliteDetailsByParent = async () => {
    try {
      const studentData = await getHosteliteDetailsByParentId();
      if (studentData !== null) {
        if (studentData.data.length > 0) {
          const data = studentData.data.map((item: any) => ({
            label: item.name,
            value: item.hosteliteId,
          }));
          setStudentData(data);
        }
        if (studentData.data.length === 1) {
          setHosteliteId(studentData.data[0].hosteliteId);
          getAllleavesDataByHosteliteId(studentData.data[0].hosteliteId);
        }
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const getAllleavesDataByHosteliteId = async (id: string) => {
    try {
      const leaveData = await getLeaveDetailsByHosteliteId(id);
      setLeaveList(leaveData?.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };

  const getAllLeaves = () => {
    if (userRoles === 'Warden' || userRoles === 'Super Admin' || userRoles === 'Admin') {
      if (_formData?.hostelId) {
        getAllleavesDataByHostelId(_formData.hostelId);
      }
    } else if (userRoles === 'Parent') {
      getHosteliteDetailsByParent();
    }
  };

  useEffect(() => {
    getAllLeaves();
    getAllStauts();
  }, []);

  useEffect(() => {
    getAllLeaves();
  }, [_formData.hostelId]);

  useEffect(() => {
    const handleHostelChange = (event: CustomEvent<{ selectedHostel: string }>) => {
      const newHostelId = event.detail.selectedHostel;
      setFormData((preview) => ({ ...preview, hostelId: newHostelId }));
    };
    document.addEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    };
  }, []);

  return (
    <Stack spacing={6} component={'section'}>
      <Stack>
        {userRoles === 'Parent' && (
          <Grid container rowSpacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} px={1}>
              <CrewSelect
                label={'Students'}
                className="dropdown"
                value={hosteliteId}
                menuItems={studentData}
                onChange={(value) => getAllleavesDataByHosteliteId(value)}
                labelVariant={'body1'}
              />
            </Grid>
          </Grid>
        )}

        <Stack mt={3}>
          <CrewTable
            tableName="Leave Approval"
            Modal={{
              open: tablemodalOpen,
              onClose: closeTableModal,
              onActionSelect: handleActionSelect,
              anchorEl: null,
              actions: allActions,
            }}
            TableName={{
              order: 'asc',
              lableFontWeight: 'bold',
              orderBy: 'id',
              headLabel: tableColumns,
              rowCount: leaveList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={(leaveList as LeaveDetail[]) || []}
            columns={tableColumns}
            onSetSelectedRow={(row: LeaveFormData) => setSelectedRow(row)}
          />
        </Stack>
        <CrewModal title={`${action} Leave`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {(action === 'Approve' || action === 'Reject') && (
            <FormSection
              leaveData={selectedRow}
              isModal={true}
              role={userRoles ?? ''}
              statusId={statusId}
              getAllleaves={getAllLeaves}
              closeModal={handleCloseCrewModal}
            />
          )}
        </CrewModal>
      </Stack>
    </Stack>
  );
};

export default LeaveApproval;
