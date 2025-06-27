'use client';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { CrewIconProps } from '../../../types/CrewIconProps';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import HostelFormSection from './hostel-form-section/HostelFormSection';
import { generateViewDataArray } from '../../../services/helperService';
import { deleteHostelDataById, getAllHostels } from '../../../helpers/hostel';
import { HostelDetails, HostelFormData } from '../../../types/CrewHostel';
import { CrewFormDelete, CrewFormView } from '../../../components/molecules';

const tableColumns = [
  { id: 'hostelName', label: 'HostelName' },
  { id: 'email1', label: 'Email' },
  { id: 'address1', label: 'Address' },
  { id: 'district', label: 'District' },
  { id: 'state', label: 'State' },
];

const icon: CrewIconProps = {
  icon: faHouse,
};

const HostelSection = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelName: '',
    email1: '',
    email2: '',
    mobile1: '',
    mobile2: '',
    address1: '',
    address2: '',
    town: '',
    district: '',
    state: '',
    pincode: '',
    countryCodeValue1: 'in',
    countryCodeValue2: 'in',
    images: null,
  } as HostelFormData);

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<HostelFormData>({});
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [hostelList, setHostelList] = useState<[]>([]);

  const getAllHostel = async () => {
    try {
      const hostelData = await getAllHostels();
      setHostelList(hostelData?.data);
    } catch (error) {
      console.error('Error fetching hostels:', error);
    }
  };

  const deleteHostel = async (id: string) => {
    try {
      await deleteHostelDataById(id).then((res) => {
        if (res && res.status === 204) {
          getAllHostel();
          toggleModal();
        }
      });
    } catch (error) {
      console.error('Error delete hostels:', error);
    }
  };

  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow?.id) {
      const idToDelete: string = selectedRow.id;
      await deleteHostel(idToDelete);
      getAllHostel(); 
      toggleModal();
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
        // setFormData(selectedRow);
        toggleModal();
        break;
      case 'Delete':
        setAction('Delete');
        deleteConfirmation();
        break;

      default:
        setAction('View');
        const optionalKeys = ['id'];
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
    getAllHostel();
  }, []);

  return (
    <section>
      <Stack spacing={6}>
        <HostelFormSection hostelData={_formData} isModal={false} getAllHostel={getAllHostel} />
        <Stack mt={3}>
          <CrewTable
            tableName="List of Hostels"
            tableNameIcon={icon}
            tableNameIconPlacementPosition="right"
            Modal={{
              open: tablemodalOpen,
              onClose: closeTableModal,
              onActionSelect: handleActionSelect,
              anchorEl: null,
              actions: [
                { id: 1, label: 'View' },
                { id: 2, label: 'Edit' },
                { id: 3, label: 'Delete' },
              ],
            }}
            TableName={{
              order: 'asc',
              lableFontWeight: 'bold',
              orderBy: 'id',
              headLabel: tableColumns,
              rowCount: hostelList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={(hostelList as HostelDetails[]) || []}
            columns={tableColumns}
            onSetSelectedRow={(row: HostelDetails) => {
              console.log("Hostel data",row);
              const updatedRow: HostelFormData = {
                ...row,
                countryCodeValue1: row.mobile1CountryCode === null ? 'in' : row.mobile1CountryCode,
                countryCodeValue2: row.mobile2CountryCode === null ? 'in' : row.mobile2CountryCode,
                mobile1CountryCode: row.mobile1CountryCode ?? '',
                mobile2CountryCode: row.mobile2CountryCode ?? '',
                id: row.id ?? '',
              };

              setSelectedRow(updatedRow);
            }}
          />
        </Stack>
        <CrewModal title={`${action} Hostel`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {action === 'Edit' && (
            <HostelFormSection
              hostelData={selectedRow}
              isModal={true}
              getAllHostel={getAllHostel}
              closeModal={handleCloseCrewModal}
            />
          )}
          {action === 'View' && <CrewFormView datas={viewData} />}
          {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
        </CrewModal>
      </Stack>
    </section>
  );
};

export default HostelSection;
