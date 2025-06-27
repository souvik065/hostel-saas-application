'use client';
import AgreementFormSection from './agreement-form-section/AgreementFormSection';
import { Stack } from '@mui/material';
import { AgreementFormData, AgreementProps } from '../../types/CrewAgreement';
import { CrewModal, CrewTable } from '../../components/organisms';
import { CrewIconProps } from '../../types/CrewIconProps';
import React, { useEffect, useState } from 'react';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { generateViewDataArray } from '../../services/helperService';
import { useSession } from 'next-auth/react';
import { getAgreementList } from '@/utils/mockData';

const tableColumns = [
  { id: 'hostel', label: 'Hostel' },
  { id: 'agreement', label: 'Agreement' },
  { id: 'text', label: 'Text' },
];

const icon: CrewIconProps = {
  icon: faQuestion,
};

const AgreementSection = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostel: '',
    agreement: '',
    text: '',
  } as AgreementFormData);

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [action, setAction] = useState('');
  const [agreement, setAgreementList] = useState<[]>([]);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<AgreementFormData>({});
  const showEditButton = true;
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);

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

  const toggleModal = () => {
    setShowCrewModal(!showCrewModal);
  };

  const closeTableModal = () => {
    setTableModalOpen(false);
  };

  const agreementData = getAgreementList();

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
        const datas = generateViewDataArray(_formData, selectedRow, optionalKeys);
        setViewData(datas);
        toggleModal();
        break;
    }
  };

  return (
    <section>
      <Stack spacing={6}>
        <AgreementFormSection />
      </Stack>
      <Stack mt={3}>
        <CrewTable
          tableName="List of Enquiries"
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
            rowCount: agreementData?.length ?? 0,
            numSelected: 0,
            showCheckbox: false,
          }}
          showEditButton={showEditButton}
          data={agreementData as AgreementProps[]}
          columns={tableColumns}
        />
      </Stack>
    </section>
  );
};

export default AgreementSection;
