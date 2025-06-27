'use client';
import { CrewModal, CrewTable } from '../../components/organisms';
import { deleteFacilityDataById, getAllFacilities } from '../../helpers/facility';
import { generateViewDataArray } from '../../services/helperService';
import { FacilityFormData } from '../../types/CrewFacility';
import { FacilityDetails } from '../../types/FacilityDetails';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FacilityFormSection from './facility-form-section/FacilityFormSection';
import { CrewFormDelete, CrewFormView } from '../../components/molecules';
import { useSession } from 'next-auth/react';

const tableColumns = [
  { id: 'name', label: 'Facilities' },
  { id: 'hostelName', label: 'Hostel' },
  { id: 'buildingName', label: 'Building' },
  { id: 'floorName', label: 'Floor' },
  { id: 'roomNumber', label: 'Room' },
  { id: 'description', label: 'Description' },
  { id: 'cost', label: 'Amount' },
];

const CreateFacility = () => {
  const [_formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    cost: 0,
    hostelId: '',
    buildingId: '',
    floorId: '',
    roomId: '',
  } as FacilityFormData);

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FacilityFormData>({});
  const showEditButton = true;
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [hideAmountField, setHideAmountField] = useState<boolean>(true);
  const [facilityList, setFacilityList] = useState<[]>([]);

  const visibleColumns = tableColumns.filter((column) => !hideAmountField || column.id !== 'cost');

  const { data: session } = useSession();

  const userRoles = session?.userRole;

  let permissions = {
    create: userRoles === 'Admin' || userRoles === 'Super Admin' || userRoles === 'Warden',
    edit: userRoles === 'Warden' || userRoles === 'Admin' || userRoles === 'Super Admin',
    delete: userRoles === 'Admin' || userRoles === 'Super Admin',
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

  const getAllFacility = async () => {
    try {
      const data = await getAllFacilities();
      setFacilityList(data?.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const deleteFacilityById = async (id: string) => {
    try {
      await deleteFacilityDataById(id).then((res) => {
        getAllFacility();
        toggleModal();
      });
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow.id) {
      const idToDelete: string = selectedRow.id;
      await deleteFacilityById(idToDelete);
    }
  };

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
        toggleModal();
        break;
      case 'Delete':
        setAction('Delete');
        toggleModal();
        break;

      default:
        setAction('View');
        const datas = generateViewDataArray(_formData, selectedRow);
        setViewData(datas);
        toggleModal();
        break;
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };
  useEffect(() => {
    getAllFacility();
  }, []);
  return (
    <Stack spacing={4}>
      {permissions.create && (
        <FacilityFormSection facilityData={_formData} isModal={false} getAllFacilities={getAllFacility} />
      )}
      <CrewTable
        tableName="LIST OF FACILITIES"
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
          headLabel: visibleColumns,
          rowCount: facilityList?.length ?? 0,
          numSelected: 0,
          showCheckbox: false,
        }}
        showEditButton={showEditButton}
        data={facilityList as FacilityDetails[]}
        columns={visibleColumns}
        onSetSelectedRow={(row: FacilityFormData) => setSelectedRow(row)}
      />

      <CrewModal title={`${action} Facility`} open={showCrewModal} onClose={toggleModal}>
        {action === 'Edit' && (
          <FacilityFormSection
            facilityData={selectedRow}
            closeModal={handleCloseCrewModal}
            isModal={true}
            getAllFacilities={getAllFacility}
          />
        )}
        {action === 'View' && <CrewFormView datas={viewData} />}
        {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
      </CrewModal>
    </Stack>
  );
};

export default CreateFacility;
