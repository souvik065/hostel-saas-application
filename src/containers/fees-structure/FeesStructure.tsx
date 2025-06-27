'use client';
import React, { useEffect, useState } from 'react';
import FormSection from './form-section/FormSection';
import { getCookie } from 'cookies-next';
import { FeeStructureData, Installment } from '../../types/CrewFeesStructure';
import { useSession } from 'next-auth/react';
import { Stack } from '@mui/material';
import { CrewButton, CrewIcon, CrewTypographyWithIcon } from '../../components/atoms';
import { faMoneyBillTrendUp, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CrewFeeStructureTable, CrewModal } from '../../components/organisms';
import { CrewIconProps } from '../../types/CrewIconProps';
import { deleteFeesStructure, getAllFeesStructureByHostelId } from '../../helpers/fees-struture';
import { CrewFormDelete } from '../../components/molecules';

const icon: CrewIconProps = {
  icon: faMoneyBillTrendUp,
};

const FeesStructure = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelId: getCookie('HostelId'),
    planTypeId: '',
    feeTypeId: '',
    amount: '',
    dueDate: new Date(),
    noOfInstallments: '',
    installments: [] as Installment[],
  });

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [_formType, setFormType] = useState<string>('create');
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [feesStructureList, setFeesStructureList] = useState<[]>([]);
  const [selectedRow, setSelectedRow] = useState<FeeStructureData>({ installments: [] });

  const { data: session } = useSession();

  const userRoles = session?.userRole;

  let allActions = [
    { id: 1, label: 'Edit' },
    { id: 2, label: 'Delete' },
  ];

  let permissions = {
    create: userRoles === 'Admin' || userRoles === 'Super Admin',
    edit: userRoles === 'Admin' || userRoles === 'Super Admin',
    Delete: userRoles === 'Admin' || userRoles === 'Super Admin',
  };

  let allowedActions = allActions.filter((action) => {
    switch (action.label) {
      case 'Edit':
        return permissions.edit;
      case 'Delete':
        return permissions.Delete;
      default:
        return true; // Allow other actions by default
    }
  });

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };
  const toggleModal = () => {
    setShowCrewModal(!showCrewModal);
  };

  const handleCreateFeesStruture = () => {
    setFormType('create');
    toggleModal();
  };

  const closeTableModal = () => {
    setTableModalOpen(false);
  };

  const getAllFeesListByHostelId = async (id: string) => {
    const feesList = await getAllFeesStructureByHostelId(id);
    if (feesList !== null) {
      if (feesList.data.length > 0) {
        setFeesStructureList(feesList.data);
      }
    }
  };

  const handleActionSelect = (actionData: any) => {
    switch (actionData) {
      case 'Edit':
        setFormType('update');
        toggleModal();
        break;
      case 'Delete':
        setFormType('delete');
        toggleModal();
        break;
      default:
        break;
    }
  };

  const deleteFees = async (id: string) => {
    try {
      await deleteFeesStructure(id).then((res) => {
        getFeesList();
        toggleModal();
      });
    } catch (error) {
      console.error('Error Delete Leave:', error);
    }
  };

  const deleteConfirmation = () => {
    if (selectedRow && selectedRow?.id) {
      const idToDelete: string = selectedRow.id;
      deleteFees(idToDelete);
    }
  };

  const selectedRowWithDates = {
    ...selectedRow,
    installments: selectedRow.installments.map((installment) => ({
      ...installment,
      dueDate: new Date(installment.dueDate),
    })),
  };

  const getFeesList = () => {
    if (_formData?.hostelId) {
      getAllFeesListByHostelId(_formData.hostelId);
    }
  };

  useEffect(() => {
    getFeesList();
  }, []);

  useEffect(() => {
    if (_formData.hostelId) {
      getAllFeesListByHostelId(_formData.hostelId);
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
    <Stack component={'section'}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <CrewTypographyWithIcon variant={'h4'} icon={icon} iconPlacementPosition="right">
          Fees Structure
        </CrewTypographyWithIcon>
        <Stack className="invoice-btn">
          <CrewButton
            variant="contained"
            startIcon={<CrewIcon icon={faPlusCircle} hasInheritedStyles />}
            onClick={handleCreateFeesStruture}
          >
            Add Fees-Structure
          </CrewButton>
        </Stack>
      </Stack>
      <Stack mt={3}>
        <CrewFeeStructureTable
          tableName="List of Fees"
          Modal={{
            actions: allowedActions,
            anchorEl: null,
            onClose: closeTableModal,
            onActionSelect: handleActionSelect,
            open: tablemodalOpen,
          }}
          feeStructures={feesStructureList}
          onActionSelect={() => {}}
          onSetSelectedRow={(row: FeeStructureData) => setSelectedRow(row)}
        />
      </Stack>
      <CrewModal title={`Fees-Structure`} open={showCrewModal} onClose={handleCloseCrewModal}>
        {_formType === 'create' && (
          <FormSection feesStructureDate={_formData} getFeesList={getFeesList} closeModal={toggleModal} />
        )}
        {_formType === 'update' && (
          <FormSection feesStructureDate={selectedRowWithDates} getFeesList={getFeesList} closeModal={toggleModal} />
        )}
        {_formType === 'delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
      </CrewModal>
    </Stack>
  );
};

export default FeesStructure;
