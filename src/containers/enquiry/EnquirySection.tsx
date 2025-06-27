'use client';
import { EnquiryData, EnquiryDetails } from '../../types/CrewEnquiry';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CrewIconProps } from '../../types/CrewIconProps';
import { CrewModal, CrewTable } from '../../components/organisms';
import EnquiryFormSection from './enquiry-form-section/EnquiryFormSection';
import { CrewFormDelete, CrewFormView, CrewPageHeadWithIcon } from '../../components/molecules';
import { generateViewDataArray } from '../../services/helperService';
import { deleteEnquiry, getAllEnquiriesForHostel } from '../../helpers/enquiry';
import { getCookie } from 'cookies-next';
import { useSession } from 'next-auth/react';

const tableColumns = [
  { id: 'studentFirstName', label: 'Student First Name' },
  { id: 'studentLastName', label: 'Student Last Name' },
  { id: 'mobile1', label: 'Contact' },
  { id: 'email1', label: 'Email' },
  { id: 'institution', label: 'Institution' },
];

const icon: CrewIconProps = {
  icon: faQuestion,
};

const EnquirySection = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelId: getCookie('HostelId'),
    studentFirstName: '',
    parentFirstName: '',
    studentLastName: '',
    parentLastName: '',
    mobile1: '',
    mobile2: '',
    address1: '',
    address2: '',
    email1: '',
    email2: '',
    town: '',
    district: '',
    state: '',
    pincode: '',
    countryCodeValue1: 'in',
    countryCodeValue2: 'in',
  } as EnquiryData);
  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<EnquiryData>({});
  const showEditButton = true;
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [enquiryList, setEnquiryList] = useState<[]>([]);

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

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };

  const getAllEnquiries = async () => {
    try {
      if (_formData.hostelId) {
        const enquiryData = await getAllEnquiriesForHostel(_formData.hostelId);
        setEnquiryList(enquiryData?.data);
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const deleteEnquiryById = async (id: string) => {
    try {
      await deleteEnquiry(id).then((res) => {
        getAllEnquiries();
        toggleModal();
      });
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow.id) {
      const idToDelete: string = selectedRow.id;
      await deleteEnquiryById(idToDelete);
    }
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);

  useEffect(() => {
    getAllEnquiries();
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
    <section>
      <Stack spacing={6}>
        <CrewPageHeadWithIcon text="Enquiry" variant={'h4'} icon={icon} iconPlacementPosition="right" />
        {permissions.create && (
          <EnquiryFormSection enquiryData={_formData} isModal={false} getAllEnquiries={getAllEnquiries} />
        )}
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
              rowCount: enquiryList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={(enquiryList as EnquiryDetails[]) || []}
            columns={tableColumns}
            onSetSelectedRow={(row: EnquiryData) => {
              const updatedRow: EnquiryData = {
                ...row,
                countryCodeValue1: row.mobile1CountryCode,
                countryCodeValue2: row.mobile2CountryCode,
              };
              setSelectedRow(updatedRow);
            }}
          />
        </Stack>
        <CrewModal title={`${action} Enquiry`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {action === 'Edit' && (
            <EnquiryFormSection
              enquiryData={selectedRow}
              isModal={true}
              closeModal={toggleModal}
              getAllEnquiries={getAllEnquiries}
            />
          )}
          {action === 'View' && <CrewFormView datas={viewData} />}
          {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
        </CrewModal>
      </Stack>
    </section>
  );
};

export default EnquirySection;
