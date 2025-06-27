'use client';
import { CrewFormDelete, CrewFormView } from '../../../components/molecules';
import { CrewModal, CrewTable } from '../../../components/organisms';
import { generateViewDataArray } from '../../../services/helperService';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { OutPassDetail, OutPassFormData } from '../../../types/OutPassProps';
import FormSection from './apply-out-pass-form/FormSection';
import { deleteOutPassById, getAllOutPassByHostelId, getAlloutPassByHosteliteId } from '../../../helpers/out-pass';
import { convertDateTimeToTimeString } from '../../../utils/DateHelper';

const tableColumns = [
  { id: 'date', label: 'Date' },
  { id: 'timeFrom', label: 'Time From' },
  { id: 'timeTo', label: 'Time To' },
  { id: 'createdAt', label: 'Applied Date' },
];

const OutPassApply = () => {
  const [_formData, setFormData] = useState({
    id: '',
    hostelId: getCookie('HostelId'),
    date: new Date(),
    timeFrom: '',
    timeTo: '',
  });

  const [tablemodalOpen, setTableModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<OutPassFormData>({});
  const showEditButton = true;

  const [showCrewModal, setShowCrewModal] = useState(false);
  const [action, setAction] = useState('');
  const [viewData, setViewData] = useState<{ item: string; value: string }[]>([]);
  const [outPassList, setOutPassList] = useState<[]>([]);
  const { data: session } = useSession();
  const userRoles = session?.userRole;

  let permissions = {
    create: userRoles === 'Hostelite' || userRoles === 'Super Admin',
    edit: userRoles === 'Hostelite' || userRoles === 'Super Admin',
    delete: userRoles === 'Super Admin' || userRoles === 'Warden',
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
        const datas = generateViewDataArray(_formData, selectedRow);
        setViewData(datas);
        toggleModal();
        break;
    }
  };
  const deleteoutPass = async (id: string) => {
    try {
      await deleteOutPassById(id).then((res) => {
        getAllOutPassList();
        toggleModal();
      });
    } catch (error) {
      console.error('Error Delete Leave:', error);
    }
  };
  const deleteConfirmation = async () => {
    if (selectedRow && selectedRow?.id) {
      const idToDelete: string = selectedRow.id;
      await deleteoutPass(idToDelete);
    }
  };

  const handleCloseCrewModal = () => {
    setShowCrewModal(false);
  };

  const getAllOutPassDataByHosteliteId = async () => {
    try {
      const outPassData = await getAlloutPassByHosteliteId();
      setOutPassList(outPassData?.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };
  const getAllOutPassDataByHostelId = async (id: string) => {
    try {
      const outPassData = await getAllOutPassByHostelId(id);
      setOutPassList(outPassData?.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const getAllOutPassList = () => {
    if (userRoles === 'Hostelite') {
      getAllOutPassDataByHosteliteId();
    } else {
      if (_formData?.hostelId) {
        getAllOutPassDataByHostelId(_formData?.hostelId);
      }
    }
  };

  useEffect(() => {
    getAllOutPassList();
  }, []);

  useEffect(() => {
    getAllOutPassList();
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
          <FormSection outPassData={_formData} isModal={false} getAllOutPassList={getAllOutPassList} />
        )}
        <Stack mt={3}>
          <CrewTable
            tableName="List of Out-Pass"
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
              rowCount: outPassList?.length ?? 0,
              numSelected: 0,
              showCheckbox: false,
            }}
            showEditButton={showEditButton}
            data={(outPassList as OutPassDetail[]) || []}
            columns={tableColumns}
            onSetSelectedRow={(row: OutPassFormData) => {
              const updatedRow: OutPassFormData = {
                ...row,
                timeFrom: row.timeFrom ? convertDateTimeToTimeString(row.timeFrom) : '',
                timeTo: row.timeTo ? convertDateTimeToTimeString(row.timeTo) : '',
              };

              setSelectedRow(updatedRow);
            }}
          />
        </Stack>
        <CrewModal title={`${action} Out Pass`} open={showCrewModal} onClose={handleCloseCrewModal}>
          {action === 'Edit' && (
            <FormSection
              outPassData={selectedRow}
              isModal={true}
              getAllOutPassList={getAllOutPassList}
              closeModal={handleCloseCrewModal}
            />
          )}
          {action === 'View' && <CrewFormView datas={viewData} />}
          {action === 'Delete' && <CrewFormDelete onClose={toggleModal} onDelete={deleteConfirmation} />}
        </CrewModal>
      </Stack>
    </Stack>
  );
};

export default OutPassApply;
