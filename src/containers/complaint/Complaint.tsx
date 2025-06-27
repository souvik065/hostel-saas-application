'use client';
import { CrewFormDelete, CrewFormView } from '../../components/molecules';
import { CrewModal, CrewTable } from '../../components/organisms';
import { ComplaintFormData } from '../../types/Complaint';
import { Stack } from '@mui/material';
import { getCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CreateComplaint from './apply-complaint/apply-complaint-form/CreateComplaint';
import ComplaintStatusUpdate from './complain-status-update/ComplaintStatusUpdate';
import { getAllComplaintsByHostelId, getAllComplaintsByHosteliteId } from '../../helpers/complaint';
import { generateViewDataArray } from '@/services/helperService';

const tableColumns = [
  { id: 'complaintNo', label: 'Complaint No' },
  { id: 'notes', label: 'Notes' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created Date' },
];
const Complaint = () => {
  const [_formData, setFormData] = useState({
    id: '',
    complaintNo: '',
    hostelId: getCookie('HostelId'),
    notes: '',
    type: '',
  } as ComplaintFormData);
  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ComplaintFormData>({});
  const [complaintList, setComplaintList] = useState<[]>([]);
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);

  const { data: session } = useSession();
  const userRoles = session?.userRole;
  let permissions = {
    create: userRoles === 'Hostelite' || userRoles === 'Super Admin',
    edit: userRoles === 'Hostelite' || userRoles === 'Super Admin',
    delete: userRoles === 'Hostelite' || userRoles === 'Super Admin',
    update: userRoles === 'Warden' || userRoles === 'Super Admin',
    view: true, // All roles have view permission
  };
  let allActions = [
    { id: 1, label: 'View' },
    { id: 2, label: 'Edit' },
    { id: 3, label: 'Delete' },
    { id: 4, label: 'Update Status' },
  ];

  let allowedActions = allActions.filter((action) => {
    switch (action.label) {
      case 'View':
        return permissions.view;
      case 'Edit':
        return permissions.edit;
      case 'Update Status':
        return permissions.update;
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
  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };
  const deleteComplaint = async (id: string) => {};
  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow?.id) {
      const idToDelete: string = selectedRow.id;
      await deleteComplaint(idToDelete);
    }
  };
  const handleActionSelect = (actionData: any) => {
    switch (actionData) {
      case 'Edit':
        setAction('Edit');
        setFormData(selectedRow);
        toggleModal();
        break;
      case 'View':
        setAction('View');
        const optionalKeys = [
          'id',
          'hostelId',
          'createdBy',
          'createdAt',
          'buildingId',
          'floorId',
          'roomId',
          'isActive',
        ];
        const datas = generateViewDataArray(_formData, selectedRow, optionalKeys);
        setViewData(datas);
        toggleModal();
        break;
      case 'Update Status':
        setAction('Update Status');
        setFormData(selectedRow);
        toggleModal();
        break;
      case 'Delete':
        setAction('Delete');
        toggleModal();
        break;
    }
  };

  const getAllleavesDataByHosteliteId = async () => {
    try {
      const complaintData = await getAllComplaintsByHosteliteId();
      setComplaintList(complaintData?.data?.complaints);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const getAllComplaintsDataByHostelId = async (id: string) => {
    try {
      const complaintData = await getAllComplaintsByHostelId(id);
      setComplaintList(complaintData?.data?.complaints);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const getAllComplaints = () => {
    if (userRoles === 'Hostelite') {
      getAllleavesDataByHosteliteId();
    } else if (userRoles === 'Super Admin' || userRoles === 'Warden') {
      if (_formData?.hostelId) {
        getAllComplaintsDataByHostelId(_formData.hostelId);
      }
    }
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  useEffect(() => {
    getAllComplaints();
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
      {permissions.create && (
        <CreateComplaint
          complaintData={_formData}
          isModal={false}
          getAllcomplaint={getAllComplaints}
          closeModal={toggleModal}
        />
      )}
      <Stack mt={3}>
        <CrewTable
          tableName="List of Complaint"
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
            rowCount: complaintList.length ?? 0,
            numSelected: 0,
            showCheckbox: false,
          }}
          showEditButton={showEditButton}
          data={complaintList ?? []}
          columns={tableColumns}
          onSetSelectedRow={(row: ComplaintFormData) => setSelectedRow(row)}
        />
      </Stack>
      <CrewModal title={`${action} Complaint`} open={showCrewModal} onClose={handleCloseCrewModal}>
        {action === 'Edit' && (
          <CreateComplaint
            complaintData={selectedRow}
            isModal={true}
            getAllcomplaint={getAllComplaints}
            closeModal={toggleModal}
          />
        )}
        {action === 'View' && <CrewFormView datas={viewData} />}
        {action === 'Update Status' && (
          <ComplaintStatusUpdate complaintData={selectedRow} role={userRoles ?? ''} isModal closeModal={toggleModal} />
        )}
        {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
      </CrewModal>
    </Stack>
  );
};

export default Complaint;
