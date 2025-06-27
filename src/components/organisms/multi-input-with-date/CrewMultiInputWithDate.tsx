import { Grid, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CrewModal } from '..';
import { CrewButton, CrewIcon, CrewTypography } from '../../../components/atoms';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { CrewInputWithDate } from '../../../components/molecules';

// Defining the structure of an item
interface Item {
  id: string;
  [key: string]: string | Date;
}

// Defining the error structure for each item
interface AssignFormError<T extends Item> {
  [index: number]: {
    [key in keyof T]?: string;
  };
}

// Props for the CustomMultiSelectAndInputProps component
export interface CrewMultiInputWithDatePros<T extends Item> {
  items: T[];
  onChange: (data: T[]) => void;
  onSetErrors: (errors: AssignFormError<T>) => void;
  onHandleDelete?: (data: string) => void;
  errors: AssignFormError<T>;
  inputLabel: string;
  dateLabel: string;
  minDate?: Date;
  maxDate?: Date;
  namePrefix: string;
  inputName: keyof T;
  dateName: keyof T;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

const CrewMultiInputWithDate = <T extends Item>({
  items,
  errors,
  onChange,
  onSetErrors,
  inputLabel,
  dateLabel,
  inputName,
  dateName,
  minDate,
  maxDate,
  labelVariant = 'body1',
  onHandleDelete,
  xl = 3,
  lg = 4,
  md = 4,
  sm = 6,
  xs = 12,
}: CrewMultiInputWithDatePros<T>) => {
  const [updatedItems, setUpdatedItems] = useState<T[]>(items);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState<string>('');
  const theme = useTheme();

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

  // Function to handle Date field changes
  const handleDateChange = (index: number, value: Date) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][dateName as keyof T] = value as T[Extract<keyof T, Date>];
    setUpdatedItems(updatedItemsCopy);

    //removing error if this input field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][dateName]) {
      updatedErrors[index][dateName] = '';
      onSetErrors(updatedErrors);
    }
    onChange(updatedItemsCopy);
  };

  const addNewItem = () => {
    const hasEmptyOrNullValues = updatedItems.some((item) => {
      const input = item[inputName];
      if (typeof input === 'string' && (input.trim() === '' || !input)) {
        return true;
      }

      return false;
    });
    if (hasEmptyOrNullValues) {
      // Generate validation errors for each item
      const validationErrors: AssignFormError<T> = {
        ...errors,
        ...updatedItems.map((item, index) => ({
          ...errors[index],

          [inputName]: !(item[inputName] as string) ? errorMessage.inputField(`${String(inputLabel)}`) : '',

          [dateName]: !(item[dateName] as string) ? errorMessage.selectionDropdown(`${String(dateName)}`) : '',
        })),
      };
      // Update errors and stop the function if there are validation errors
      onSetErrors(validationErrors);
      return;
    }
    // Create a new item with default values and add it to the items array
    const newItem: T = { id: '', [inputName]: '', [dateName]: new Date() } as T;
    const newItems = [...updatedItems, newItem];
    setUpdatedItems(newItems);

    // Creating a copy of errors for updating
    const updatedErrors = { ...errors };
    // Initializing the error object for the newly added item
    updatedErrors[newItems.length - 1] = { ...updatedErrors[newItems.length - 1] };
    updatedErrors[newItems.length - 1][inputName] = '';
    updatedErrors[newItems.length - 1][dateName] = '';
    onSetErrors(updatedErrors);
    onChange(newItems);
  };

  const handleRemoveItem = (index: number) => {
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
    setUpdatedItems(updatedItemsCopy);
    // Removing error for this index on remove
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][inputName]) {
      updatedErrors[index][inputName] = '';
      onSetErrors(updatedErrors);
    }

    if (updatedErrors[index] && updatedErrors[index][dateName]) {
      updatedErrors[index][dateName] = '';
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
        <Grid key={index} container className={`${getThemeModeClass(theme.palette.mode)} section-row`}>
          <CrewInputWithDate
            labelVariant={labelVariant}
            inputLabel={inputLabel}
            inputFieldValue={item[inputName] as string}
            inputError={!!errors && !!errors[index]?.[inputName] ? errors[index]?.[inputName] : ''}
            onInputFieldValueChange={(value) => handleInputChange(index, value)}
            dateLable={dateLabel}
            dateFieldValue={item[dateName] as Date}
            dateError={!!errors && !!errors[index]?.[dateName] ? errors[index]?.[dateName] : ''}
            minDate={minDate}
            maxDate={maxDate}
            onDateFieldValueChange={(value: Date) => handleDateChange(index, value)}
            xl={xl}
            lg={lg}
            md={md}
            sm={sm}
            xs={xs}
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

export default CrewMultiInputWithDate;
