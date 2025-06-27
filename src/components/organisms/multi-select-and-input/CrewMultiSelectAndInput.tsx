import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewButton, CrewIcon, CrewTypography } from '../../atoms';
import { CrewSelectAndInput } from '../../molecules';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import './CrewMultiSelectAndInput.scss';
import { errorMessage } from '../../../constants/app-hostel-constants';
import CrewModal from '../modal/CrewModal';

// Defining the structure of an item
interface Item {
  id: string;
  [key: string]: string;
}

// Defining the error structure for each item
interface AssignFormError<T extends Item> {
  [index: number]: {
    [key in keyof T]?: string;
  };
}

// Props for the CustomMultiSelectAndInputProps component
interface CrewMultiSelectAndInputProps<T extends Item> {
  items: T[];
  onChange: (data: T[]) => void;
  onSetErrors: (errors: AssignFormError<T>) => void;
  onHandleDelete?: (data: string) => void;
  errors: AssignFormError<T>;
  selectLabel: string;
  inputLabel: string;
  namePrefix: string;
  inputName: keyof T;
  selectName: keyof T;
  menuItems: { value: string; label: string }[];
  labelVariant:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
}

const CrewMultiSelectAndInput = <T extends Item>({
  items,
  errors,
  onChange,
  onSetErrors,
  selectLabel,
  inputLabel,
  inputName,
  selectName,
  menuItems,
  labelVariant = 'body1',
  onHandleDelete,
}: CrewMultiSelectAndInputProps<T>) => {
  const [updatedItems, setUpdatedItems] = useState<T[]>(items);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState<string>('');

  // Function to add a new select and input field
  const addNewItem = () => {
    const hasEmptyOrNullValues = updatedItems.some(
      (item) =>
        !item[selectName] || item[selectName].trim() === '' || !item[inputName] || item[inputName].trim() === '',
    );
    if (hasEmptyOrNullValues) {
      // Generate validation errors for each item
      const validationErrors: AssignFormError<T> = {
        ...errors,
        ...updatedItems.map((item, index) => ({
          ...errors[index],
          [selectName]: !(item[selectName] as string) ? errorMessage.selectionDropdown(`${String(selectLabel)}`) : '',
          [inputName]: !(item[inputName] as string) ? errorMessage.inputField(`${String(inputLabel)}`) : '',
        })),
      };
      // Update errors and stop the function if there are validation errors
      onSetErrors(validationErrors);
      return;
    }
    // Create a new item with default values and add it to the items array
    const newItem: T = { id: '', [selectName]: '', [inputName]: '' } as T;
    const newItems = [...updatedItems, newItem];
    setUpdatedItems(newItems);

    // Creating a copy of errors for updating
    const updatedErrors = { ...errors };
    // Initializing the error object for the newly added item
    updatedErrors[newItems.length - 1] = { ...updatedErrors[newItems.length - 1] };
    updatedErrors[newItems.length - 1][inputName] = '';
    updatedErrors[newItems.length - 1][selectName] = '';
    onSetErrors(updatedErrors);
    onChange(newItems);
  };

  // Function to handle input field changes
  const handleInputChange = (index: number, value: string) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][inputName as keyof T] = value as T[Extract<keyof T, string>];
    setUpdatedItems(updatedItemsCopy);

    //removing error if this input field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][inputName]) {
      updatedErrors[index][inputName] = '';
      onSetErrors(updatedErrors);
    }
    onChange(updatedItemsCopy);
  };
  // Function to handle select field changes
  const handleSelectChange = (index: number, value: string) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][selectName as keyof T] = value as T[Extract<keyof T, string>];
    setUpdatedItems(updatedItemsCopy);

    //removing error if this select field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][selectName]) {
      updatedErrors[index][selectName] = '';
      onSetErrors(updatedErrors);
    }
  };

  const handleRemoveItem = (index: number) => {
    const itemToRemove = updatedItems[index];
    if (itemToRemove && itemToRemove.id !== null) {
      setDeleteDataId(itemToRemove.id);
      setShowCrewModal(true);
    } else {
      removeLogic(index);
    }
  };
  const removeLogic = (index: number) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy.splice(index, 1);
    setUpdatedItems(updatedItemsCopy);
    // Removing error for this index on remove
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][selectName]) {
      updatedErrors[index][selectName] = '';
      onSetErrors(updatedErrors);
    }
    if (updatedErrors[index] && updatedErrors[index][inputName]) {
      updatedErrors[index][inputName] = '';
      onSetErrors(updatedErrors);
    }
  };

  const deleteConfirmation = async () => {
    onHandleDelete?.(deleteDataId);
    toggleModal();
  };

  const toggleModal = () => {
    setShowCrewModal(!showCrewModal);
  };

  useEffect(() => {
    setUpdatedItems(items);
  }, [items]);

  return (
    <Stack spacing={2}>
      {updatedItems.map((item, index) => (
        <Grid key={index} container>
          <CrewSelectAndInput
            labelVariant={labelVariant}
            selectLabel={selectLabel}
            inputLabel={inputLabel}
            menuItems={menuItems}
            selectError={!!errors && !!errors[index]?.[selectName] ? errors[index]?.[selectName] : ''}
            inputError={!!errors && !!errors[index]?.[inputName] ? errors[index]?.[inputName] : ''}
            inputFieldValue={item[inputName]}
            selectFieldValue={item[selectName]}
            onInputFieldValueChange={(value) => handleInputChange(index, value)}
            onSelectFieldValueChange={(value) => handleSelectChange(index, value)}
          />
          <Stack className="icon-container" spacing={2} direction={'row'}>
            {updatedItems.length > 1 && (
              <Stack className="icon" component={'span'} onClick={() => handleRemoveItem(index)}>
                <CrewIcon icon={faSquareMinus} />
              </Stack>
            )}
            {index === updatedItems.length - 1 && (
              <Stack className="icon" component={'span'} onClick={addNewItem}>
                <CrewIcon icon={faSquarePlus} />
              </Stack>
            )}
          </Stack>
        </Grid>
      ))}
      <CrewModal title={`Delete Item`} open={showCrewModal} onClose={toggleModal}>
        <Stack spacing={2}>
          <CrewTypography variant="caption">
            Do you really want to delete this item, it will delete permanently
          </CrewTypography>
          <Stack direction={'row'} spacing={2}>
            <CrewButton variant="contained" stylebutton onClick={deleteConfirmation}>
              Yes
            </CrewButton>
            <CrewButton variant="contained" stylebutton onClick={toggleModal}>
              No
            </CrewButton>
          </Stack>
        </Stack>
      </CrewModal>
    </Stack>
  );
};

export default CrewMultiSelectAndInput;
