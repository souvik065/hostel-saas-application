'use client';
import { LeaveDetail, LeaveFormData } from '../../../types/Leave';
import { CrewFormDelete, CrewFormView } from '../../../components/molecules';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { formatLeaveType, generateViewDataArray } from '../../../services/helperService';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormSection from './apply-leave-form/FormSection';
import { useSession } from 'next-auth/react';
import {
  deleteLeaveById,
  getAllLeaveTypesByHostelId,
  getAllLeavesByHostelId,
  getAllLeavesByHosteliteId,
} from '../../../helpers/leave';
import { getCookie } from 'cookies-next';
import { formatDateForBackend } from '../../../utils/DateHelper';

const tableColumns = [
  { id: 'leaveType', label: 'Leave Type' },
  { id: 'reason', label: 'Reason for Leave' },
  { id: 'parentApprovalStatus', label: 'Parent Approval Status' },
  { id: 'wardenApprovalStatus', label: 'Warden Approval Status' },
  { id: 'fromDate', label: 'From Date' },
  { id: 'toDate', label: 'To Date' },
  { id: 'createdAt', label: 'Applied Date' },
];

const LeaveApply = () => {
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
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [leaveList, setLeaveList] = useState<[]>([]);
  const [leaveTypeList, setLeaveTypeList] = useState<{ label: string; value: string }[]>([]);
  const { data: session } = useSession();
  const userRoles = session?.userRole;

  let permissions = {
    create: userRoles === 'Hostelite' || userRoles === 'Warden' || userRoles === 'Super Admin',
    edit: userRoles === 'Hostelite' || userRoles === 'Warden' || userRoles === 'Super Admin',
    delete: userRoles === 'Hostelite' || userRoles === 'Super Admin' || userRoles === 'Warden',
    view: true, // All roles have view permission
  };
  let allActions = [
    { id: 1, label: 'View' },
    { id: 2, label: 'Edit' },
    { id: 3, label: 'Delete' },
  ];

  let allowedActions = allActions.filter((action) => {
    switch (action.label) {
      case 'View':
        return permissions.view;
      case 'Edit':
        return permissions.edit;
      case 'Delete':
        return permissions.delete;
      default:
        return true; // Allow other actions by default
    }
  });

  const toggleModal = () => {
    setShowCrewModal(!showCrewModal);
  };

  const closeTableModal = () => {
    setTableModalOpen(false);
  };

  const handleActionSelect = (actionData: any) => {
    switch (actionData) {
      case 'Edit':
        setAction('Edit');
        // setFormData(selectedRow);
        toggleModal();
        break;
      case 'Delete':
        setAction('Delete');
        toggleModal();
        break;

      default:
        setAction('View');
        const optionalKeys = ['id', 'hostelId'];
        const formattedFromDate = selectedRow.fromDate ? formatDateForBackend(new Date(selectedRow.fromDate)) : '';
        const formattedToDate = selectedRow.toDate ? formatDateForBackend(new Date(selectedRow.toDate)) : '';
        const datas = generateViewDataArray(
          _formData,
          {
            ...selectedRow,
            fromDate: formattedFromDate,
            toDate: formattedToDate,
          },
          optionalKeys,
        );
        setViewData(datas);
        toggleModal();
        break;
    }
  };
  const deleteLeave = async (id: string) => {
    try {
      await deleteLeaveById(id).then((res) => {
        getAllleaves();
        toggleModal();
      });
    } catch (error) {
      console.error('Error Delete Leave:', error);
    }
  };
  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow?.id) {
      const idToDelete: string = selectedRow.id;
      await deleteLeave(idToDelete);
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };

  const getAllleavesDataByHosteliteId = async () => {
    try {
      const leaveData = await getAllLeavesByHosteliteId();
      setLeaveList(leaveData?.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
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

  const getAllleaves = () => {
    if (userRoles === 'Hostelite') {
      getAllleavesDataByHosteliteId();
    } else {
      if (_formData?.hostelId) {
        getAllleavesDataByHostelId(_formData?.hostelId);
      }
    }
  };

  const getAllleavesTypeDataByHostelId = async (id: string) => {
    try {
      const leaveData = await getAllLeaveTypesByHostelId(id);
      const Data = await formatLeaveType(leaveData?.data);
      setLeaveTypeList(Data);
    } catch (error) {
      console.error('Error fetching leaves type:', error);
    }
  };

  useEffect(() => {
    getAllleaves();
  }, []);

  useEffect(() => {
    getAllleaves();
    if (_formData.hostelId) {
      console.log('_formData.hostelId', _formData.hostelId);
      getAllleavesTypeDataByHostelId(_formData.hostelId);
    }
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
        {permissions.create && (
          <FormSection leaveData={_formData} isModal={false} getAllleaves={getAllleaves} leaveTypes={leaveTypeList} />
        )}
        <Stack mt={3}>
          <CrewTable
            tableName="List of Leave Application"
            Modal={{
              open: tablemodalOpen,
              onClose: closeTableModal,
              onActionSelect: handleActionSelect,
              anchorEl: null,
              actions: allowedActions,
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
        <CrewModal title={`${action} Hostel`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {action === 'Edit' && (
            <FormSection
              leaveData={selectedRow}
              isModal={true}
              getAllleaves={getAllleaves}
              closeModal={handleCloseCrewModal}
              leaveTypes={leaveTypeList}
            />
          )}
          {action === 'View' && <CrewFormView datas={viewData} />}
          {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
        </CrewModal>
      </Stack>
    </Stack>
  );
};

export default LeaveApply;
