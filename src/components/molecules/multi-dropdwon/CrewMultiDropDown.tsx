import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewIcon, CrewButton, CrewTypography, CrewSelect } from '../../atoms';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { errorMessage } from '../../../constants/app-hostel-constants';
import './CrewMultiDropDown.scss';
import { CrewModal } from '../../organisms';

// Defining the structure of an item
interface Item {
  id: string;
  [key: string]: string | boolean | number;
}

// Defining the error structure for each item
interface AssignFormError<T extends Item> {
  [index: number]: {
    [key in keyof T]?: string;
  };
}
// Props for the CrewMultipleInput component
interface CrewMultiDropDownnProps<T extends Item> {
  items: T[];
  onChange: (data: T[]) => void;
  onSetErrors: (errors: AssignFormError<T>) => void;
  menuItems: { value: string; label: string }[];
  onHandleDelete?: (data: string) => void;
  errors: AssignFormError<T>;
  label: string;
  namePrefix: string;
  itemName: Extract<keyof T, string>;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  itemButton?: boolean;
  onSaveOrUpdate?: (item: T, index: number) => void;
}

const CrewMultiDropDown = <T extends Item>({
  items,
  errors,
  onChange,
  onSetErrors,
  label,
  namePrefix,
  menuItems,
  itemName,
  labelVariant,
  onHandleDelete,
  itemButton,
  onSaveOrUpdate,
}: CrewMultiDropDownnProps<T>) => {
  const [updatedItems, setUpdatedItems] = useState<T[]>(items);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState<string>('');
  // Function to add a new input field
  const handleAddInput = () => {
    const isAnyItemEmpty = updatedItems.some((item) => !(item[itemName] as string));
    if (isAnyItemEmpty) {
      // Generate validation errors for each item
      const validationErrors: AssignFormError<T> = {
        ...errors,
        ...updatedItems.map((item, index) => ({
          ...errors[index],
          [itemName]: !(item[itemName] as string) ? errorMessage.inputField(`${label}`) : '',
        })),
      };
      // Update errors and stop the function if there are validation errors
      onSetErrors(validationErrors);
      return;
    }

    // Create a new item with default values and add it to the items array
    const newItem: T = { id: '', [itemName]: '' } as T;
    const newItems = [...updatedItems, newItem];
    setUpdatedItems(newItems);

    // Creating a copy of errors for updating
    const updatedErrors = { ...errors };
    // Initializing the error object for the newly added item
    updatedErrors[updatedItems.length - 1] = { ...updatedErrors[updatedItems.length - 1] };
    updatedErrors[updatedItems.length - 1][itemName] = '';
    onSetErrors(updatedErrors);
    onChange(updatedItems);
  };

  // Function to remove a select and input field
  const handleRemoveInput = (index: number) => {
    const itemToRemove = updatedItems[index];
    if (itemToRemove && itemToRemove.id !== null && itemToRemove.id !== '') {
      setDeleteDataId(itemToRemove.id);
      setShowCrewModal(true);
    } else {
      removeLogic(index);
    }
  };

  const removeLogic = (index: number) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy.splice(index, 1);
    onChange(updatedItemsCopy);

    // Removing error for this index on remove
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][itemName]) {
      updatedErrors[index][itemName] = '';
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

  // Function to handle input field changes
  const handleInputFieldChange = (value: string, index: number) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][itemName as keyof T] = value as T[Extract<keyof T, string>];

    // removing error if this input field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][itemName]) {
      updatedErrors[index][itemName] = '';
      onSetErrors(updatedErrors);
    }

    onChange(updatedItemsCopy);
  };

  useEffect(() => {
    setUpdatedItems(items);
  }, [items]);

  return (
    <Stack spacing={2}>
      {updatedItems.map((item, index) => (
        <Grid key={index} container>
          <Grid item xl={4} lg={4} md={4} sm={12} xs={12} px={1}>
            <CrewSelect
              labelVariant={labelVariant}
              label={label}
              value={String(item[itemName])}
              menuItems={menuItems}
              onChange={(e) => handleInputFieldChange(e, index)}
              error={!!errors && !!errors[index]?.[itemName]}
              errorMessage={errors?.[index]?.[itemName]}
            />
          </Grid>
          <Stack className="icon-container" spacing={2} direction={'row'}>
            {itemButton && (
              <Stack className="btn icon" component={'span'}>
                <CrewButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  radius={10}
                  onClick={() => onSaveOrUpdate?.(item, index)}
                >
                  {item.id === '' || item.id === null ? 'Save' : 'Update'}
                </CrewButton>
              </Stack>
            )}
            {updatedItems.length > 1 && (
              <Stack className="icon" component={'span'} onClick={() => handleRemoveInput(index)}>
                <CrewIcon icon={faSquareMinus} />
              </Stack>
            )}
            {index === updatedItems.length - 1 && (
              <Stack className="icon" component={'span'} onClick={handleAddInput}>
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

export default CrewMultiDropDown;
