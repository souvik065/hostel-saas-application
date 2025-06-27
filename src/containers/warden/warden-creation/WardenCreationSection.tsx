'use client';
import { CrewFormDelete, CrewFormView, CrewPageHeadWithIcon } from '../../../components/molecules';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { generateViewDataArray } from '../../../services/helperService';
import { CrewIconProps } from '../../../types/CrewIconProps';
import { WardenDetail, WardenFormData } from '../../../types/CrewWarden';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import WardenFormSection from './warden-form-section/WardenFormSection';
import { deleteWardenById, getAllWardens } from '../../../helpers/warden';
import { useSession } from 'next-auth/react';

const icon: CrewIconProps = {
  icon: faUserShield,
};

const tableColumns = [
  { id: 'firstName', label: 'FirstName' },
  { id: 'lastName', label: 'Lastname' },
  { id: 'mobile1', label: 'Mobile' },
  { id: 'email', label: 'Email' },
  { id: 'gender', label: 'Gender' },
];

const WardenCreationSection = () => {
  const [_formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    mobile1: '',
    mobile2: '',
    dob: new Date(),
    gender: '',
    address1: '',
    address2: '',
    email1: '',
    email2: '',
    town: '',
    district: '',
    state: '',
    pincode: '',
    emergencyContactName: '',
    emergencyContactNo: '',
    emergencyContactRelation: '',
    countryCodeValue1: 'in',
    countryCodeValue2: 'in',
    countryCodeValue3: 'in',
  } as WardenFormData);
  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WardenFormData>({});
  const showEditButton = true;
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [wardenList, setWardenList] = useState<[]>([]);

  const { data: session } = useSession();

  const userRoles = session?.userRole;

  let permissions = {
    create: userRoles === 'Admin' || userRoles === 'Super Admin',
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

  const getAllWarden = async () => {
    try {
      const wardenData = await getAllWardens();
      setWardenList(wardenData?.data);
    } catch (error) {
      console.error('Error fetching wardens:', error);
    }
  };

  const deleteWarden = async (id: string) => {
    try {
      await deleteWardenById(id).then((res) => {
        getAllWarden();
        toggleModal();
      });
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow.userId) {
      const idToDelete: string = selectedRow.userId;
      await deleteWarden(idToDelete);
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
        const optionalKeys = ['userId'];
        const datas = generateViewDataArray(_formData, selectedRow, optionalKeys);
        setViewData(datas);
        toggleModal();
        break;
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };
  useEffect(() => {
    getAllWarden();
  }, []);

  return (
    <section>
      <Stack spacing={6}>
        <CrewPageHeadWithIcon text="Warden" variant={'h4'} icon={icon} iconPlacementPosition="right" />

        {permissions.create && <WardenFormSection wardenData={_formData} isModal={false} getAllWarden={getAllWarden} />}
        <Stack mt={3}>
          <CrewTable
            tableName="List of Warden"
            tableNameIcon={icon}
            tableNameIconPlacementPosition="right"
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
              rowCount: wardenList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={wardenList as WardenDetail[]}
            columns={tableColumns}
            onSetSelectedRow={(row: WardenFormData) => {
              const updatedRow: WardenFormData = {
                ...row,
                countryCodeValue1: row.mobile1CountryCode,
                countryCodeValue2: row.mobile2CountryCode,
                countryCodeValue3: row.emergencyContactCountryCode,
              };

              setSelectedRow(updatedRow);
            }}
          />
        </Stack>
        <CrewModal title={`${action} Warden`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {action === 'Edit' && (
            <WardenFormSection
              wardenData={selectedRow}
              isModal={true}
              closeModal={handleCloseCrewModal}
              getAllWarden={getAllWarden}
            />
          )}
          {action === 'View' && <CrewFormView datas={viewData} />}
          {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
        </CrewModal>
      </Stack>
    </section>
  );
};

export default WardenCreationSection;
