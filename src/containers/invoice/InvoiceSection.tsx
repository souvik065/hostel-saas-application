'use client';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FormSection from './invoice-form/FormSection';
import { InvoiceData, InvoiceDetail } from '../../types/CrewInvoice';
import { getCookie } from 'cookies-next';
import { CrewModal, CrewTable } from '../..//components/organisms';
import { CrewIconProps } from '../../types/CrewIconProps';
import { faFileInvoice, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { CrewButton, CrewIcon, CrewTypographyWithIcon } from '../../components/atoms';
import { getAllInvoiceDetailsByHostelId } from '../../helpers/invoice-hostelite';

const icon: CrewIconProps = {
  icon: faFileInvoice,
};

const tableColumns = [
  { id: 'invoiceNumber', label: 'Invoice No' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'planType', label: 'Plan Type' },
  { id: 'feeType', label: 'Fee Type' },
  { id: 'typeOfGeneration', label: 'Generated' },
  { id: 'amount', label: 'Amount' },
  { id: 'status', label: 'Status' },
  { id: 'dueDate', label: 'Due Date' },
];

const InvoiceSection = () => {
  const [_formData, setFormData] = useState({
    id: '',
    date: new Date(),
    invoiceNumber: '',
    hosteliteId: '',
    address: '',
    roomNumber: '',
    mobile: '',
    countryCodeValue: 'in',
    feeTypeId: '',
    amount: '',
    dueDate: new Date(),
    accounts: '',
    hostelId: getCookie('HostelId'),
  } as InvoiceData);
  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [_formType, setFormType] = useState<string>('create');
  const [selectedRow, setSelectedRow] = useState<InvoiceData>({});
  const showEditButton = true;
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState<[]>([]);

  const { data: session } = useSession();

  const userRoles = session?.userRole;

  let allActions = [{ id: 1, label: 'Create Negative' }];

  let permissions = {
    create: userRoles === 'Admin' || userRoles === 'Super Admin',
    edit: userRoles === 'Admin' || userRoles === 'Super Admin',
  };

  let allowedActions = allActions.filter((action) => {
    switch (action.label) {
      case 'Create Negative':
        return permissions.edit;
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

  const handleCreateInvoice = () => {
    toggleModal();
  };

  const closeTableModal = () => {
    setTableModalOpen(false);
  };

  const getInvoiceListByHostelId = async (id: string) => {
    try {
      const invoiceData = await getAllInvoiceDetailsByHostelId(id);
      if (invoiceData !== null) {
        setInvoiceList(invoiceData.data);
      }
    } catch (error) {
      console.error('Error fetching Invoice:', error);
    }
  };

  const handleActionSelect = (actionData: any) => {
    switch (actionData) {
      case 'Create Negative':
        setFormType('update');
        toggleModal();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (_formData?.hostelId) {
      getInvoiceListByHostelId(_formData.hostelId);
    }
  }, []);

    
  useEffect(() => {
    if (_formData.hostelId) {
      getInvoiceListByHostelId(_formData.hostelId);
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
          Invoice
        </CrewTypographyWithIcon>
        <Stack className="invoice-btn">
          <CrewButton
            variant="contained"
            startIcon={<CrewIcon icon={faPlusCircle} hasInheritedStyles />}
            onClick={handleCreateInvoice}
          >
            Create Invoice
          </CrewButton>
        </Stack>
      </Stack>
      <Stack mt={3}>
        <CrewTable
          tableName="List of Invoice"
          tableNameIcon={icon}
          tableNameIconPlacementPosition="right"
          Modal={{
            open: tablemodalOpen,
            onClose: closeTableModal,
            anchorEl: null,
            actions: allowedActions,
            onActionSelect: handleActionSelect,
          }}
          TableName={{
            order: 'asc',
            lableFontWeight: 'bold',
            orderBy: 'id',
            headLabel: tableColumns,
            rowCount: invoiceList?.length ?? 0,
            numSelected: 0,
            showCheckbox: false,
            labelVariant: 'subtitle1',
          }}
          showEditButton={showEditButton}
          data={(invoiceList as InvoiceDetail[]) || []}
          columns={tableColumns}
          onSetSelectedRow={(row: InvoiceDetail) => {
            const updatedRow: InvoiceData = {
              ...row,
              id: row.id,
              date: row.date ? new Date(row.date) : new Date(),
              amount: row.amount?.toString(),
              dueDate: row?.dueDate ? new Date(row?.dueDate) : new Date(),
            };
            setSelectedRow(updatedRow);
          }}
        />
      </Stack>
      <CrewModal title={`Invoice`} open={showCrewModal} onClose={handleCloseCrewModal}>
        {_formType === 'create' ? (
          <FormSection
            invoiceData={_formData}
            isModal={true}
            closeModal={toggleModal}
            getInvoiceListByHostelId={getInvoiceListByHostelId}
          />
        ) : (
          <FormSection
            invoiceData={selectedRow}
            isModal={true}
            closeModal={toggleModal}
            getInvoiceListByHostelId={getInvoiceListByHostelId}
          />
        )}
      </CrewModal>
    </Stack>
  );
};

export default InvoiceSection;
