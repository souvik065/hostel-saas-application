'use client';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { Grid, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getHosteliteDetailsByParentId, getStatusDetails } from '../../../helpers/leave';
import { getCookie } from 'cookies-next';
import FormSection from './approval-form/FormSection';
import { CrewSelect } from '../../../components/atoms';
import { OutPassDetail, OutPassFormData } from '../../../types/OutPassProps';
import { getAllOutPassByHostelId, getOutPassDetailsByHosteliteId } from '../../../helpers/out-pass';

const tableColumns = [
  { id: 'name', label: 'Student Name' },
  { id: 'notes', label: 'Notes' },
  { id: 'parentApprovalStatusName', label: 'Parent Approval Status' },
  { id: 'wardenApprovalStatusName', label: 'Warden Approval Status' },
  { id: 'timeFrom', label: 'Time From' },
  { id: 'timeTo', label: 'Time To' },
  { id: 'createdAt', label: 'Applied Date' },
];

const OutPassApproval = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelId: getCookie('HostelId'),
  } as OutPassFormData);

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OutPassFormData>({});
  const [studentData, setStudentData] = useState<{ label: string; value: string }[]>([]);
  const [statusData, setStatusData] = useState<{ label: string; value: string }[]>([]);
  const [hosteliteId, setHosteliteId] = useState<string>('');
  const [statusId, setStatusId] = useState<string>('');
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [outPassList, setOutPassList] = useState<[]>([]);
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

  const getAllOutPassDataByHostelId = async (id: string) => {
    try {
      const outPassData = await getAllOutPassByHostelId(id);
      setOutPassList(outPassData?.data);
    } catch (error) {
      console.error('Error fetching outpass:', error);
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
          getAllOutPassDataByHosteliteId(studentData.data[0].hosteliteId);
        }
      }
    } catch (error) {
      console.error('Error fetching outpass:', error);
    }
  };

  const getAllOutPassDataByHosteliteId = async (id: string) => {
    try {
      const outPassData = await getOutPassDetailsByHosteliteId(id);
      setOutPassList(outPassData?.data);
    } catch (error) {
      console.error('Error fetching outpass:', error);
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };

  const getAllOutPass = () => {
    if (userRoles === 'Warden' || userRoles === 'Super Admin' || userRoles === 'Admin') {
      if (_formData?.hostelId) {
        getAllOutPassDataByHostelId(_formData.hostelId);
      }
    } else if (userRoles === 'Parent') {
      getHosteliteDetailsByParent();
    }
  };

  useEffect(() => {
    getAllOutPass();
    getAllStauts();
  }, []);

  useEffect(() => {
    getAllOutPass();
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
                onChange={(value) => getAllOutPassDataByHosteliteId(value)}
                labelVariant={'body1'}
              />
            </Grid>
          </Grid>
        )}

        <Stack mt={3}>
          <CrewTable
            tableName="Out Pass Approval"
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
              rowCount: outPassList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={(outPassList as OutPassDetail[]) || []}
            columns={tableColumns}
            onSetSelectedRow={(row: OutPassFormData) => setSelectedRow(row)}
          />
        </Stack>
        <CrewModal title={`${action} Out-Pass`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {(action === 'Approve' || action === 'Reject') && (
            <FormSection
              outPassData={selectedRow}
              isModal={true}
              role={userRoles ?? ''}
              statusId={statusId}
              getAllOutPass={getAllOutPass}
              closeModal={handleCloseCrewModal}
            />
          )}
        </CrewModal>
      </Stack>
    </Stack>
  );
};

export default OutPassApproval;
