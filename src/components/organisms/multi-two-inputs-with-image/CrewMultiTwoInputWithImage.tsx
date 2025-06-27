import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewButton, CrewIcon, CrewTypography } from '../../atoms';
import { CrewTwoInputAndImage } from '../../molecules';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { errorMessage } from '../../../constants/app-hostel-constants';
import CrewModal from '../modal/CrewModal';
import { Image } from '../../../types/FileInputProps';

// Defining the structure of an item
interface Item {
  id: string;
  [key: string]: string | Image[];
}

// Defining the error structure for each item
interface AssignFormError<T extends Item> {
  [index: number]: {
    [key in keyof T]?: string;
  };
}

// Props for the CustomMultiSelectAndInputProps component
interface CrewMultiInputAndImageProps<T extends Item> {
  items: T[];
  onChange: (data: T[]) => void;
  onSetErrors: (errors: AssignFormError<T>) => void;
  onHandleDelete?: (data: string) => void;
  errors: AssignFormError<T>;
  uploadImageLabel: string;
  inputLabel1: string;
  inputLabel2: string;
  namePrefix: string;
  acceptMultiple: boolean;
  inputName1: keyof T;
  inputName2: keyof T;
  images: keyof T;
  labelVariant: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}

const CrewMultiInputAndImage = <T extends Item>({
  items,
  errors,
  onChange,
  onSetErrors,
  uploadImageLabel,
  inputLabel1,
  inputLabel2,
  inputName1,
  inputName2,
  images,
  labelVariant = 'body1',
  onHandleDelete,
  acceptMultiple,
}: CrewMultiInputAndImageProps<T>) => {
  const [updatedItems, setUpdatedItems] = useState<T[]>(items);
  const [showCrewModal, setShowCrewModal] = useState(false);
  const [deleteDataId, setDeleteDataId] = useState<string>('');

  // Function to handle input field changes
  const handleInput1Change = (index: number, value: string) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][inputName1 as keyof T] = value as T[Extract<keyof T, string>];
    setUpdatedItems(updatedItemsCopy);

    //removing error if this input 1 field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][inputName1]) {
      updatedErrors[index][inputName1] = '';
      onSetErrors(updatedErrors);
    }
    onChange(updatedItemsCopy);
  };

  // Function to handle input 2 field changes
  const handleInput2Change = (index: number, value: string) => {
    const updatedItemsCopy = [...updatedItems];
    updatedItemsCopy[index][inputName2 as keyof T] = value as T[Extract<keyof T, string>];
    setUpdatedItems(updatedItemsCopy);

    //removing error if this input field have
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][inputName2]) {
      updatedErrors[index][inputName2] = '';
      onSetErrors(updatedErrors);
    }
    onChange(updatedItemsCopy);
  };

  const handleImageChange = (index: number, value: Image[]) => {
    const updatedItemsCopy = [...updatedItems];
    const key = images as Extract<keyof T, Image>;

    const updatedValue = value as Image[] as T[Extract<keyof T, Image>];

    updatedItemsCopy[index][key] = updatedValue;
    setUpdatedItems(updatedItemsCopy);

    // Removing error if this select field has
    const updatedErrors = { ...errors };
    if (updatedErrors[index] && updatedErrors[index][images]) {
      updatedErrors[index][images] = '';
      onSetErrors(updatedErrors);
    }
  };

  // Function to add a new select and input field
  const addNewItem = () => {
    const hasEmptyOrNullValues = updatedItems.some((item) => {
      const value1 = item[inputName1];
      const value2 = item[inputName2];
      const image = item[images];

      if (
        (typeof value1 === 'string' && (value1.trim() === '' || !value1)) ||
        (typeof value2 === 'string' && (value2.trim() === '' || !value2)) ||
        (Array.isArray(image) && image.length === 0)
      ) {
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
          [images]:
            Array.isArray(item[images]) && item[images].length === 0
              ? errorMessage.selectionDropdown(`${String(images)}`)
              : '',
          [inputName1]: !(item[inputName1] as string) ? errorMessage.inputField(`${String(inputLabel1)}`) : '',
          [inputName2]: !(item[inputName2] as string) ? errorMessage.inputField(`${String(inputLabel2)}`) : '',
        })),
      };
      console.log('validationErrors', validationErrors);
      // Update errors and stop the function if there are validation errors
      onSetErrors(validationErrors);
      return;
    }
    // Create a new item with default values and add it to the items array
    const newItem: T = { id: '', [inputName1]: '', [inputName2]: '', [images]: [] } as T;
    const newItems = [...updatedItems, newItem];
    setUpdatedItems(newItems);

    // Creating a copy of errors for updating
    const updatedErrors = { ...errors };
    // Initializing the error object for the newly added item
    updatedErrors[newItems.length - 1] = { ...updatedErrors[newItems.length - 1] };
    updatedErrors[newItems.length - 1][inputName1] = '';
    updatedErrors[newItems.length - 1][inputName2] = '';
    updatedErrors[newItems.length - 1][images] = '';
    onSetErrors(updatedErrors);
    onChange(newItems);
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
    if (updatedErrors[index] && updatedErrors[index][inputName1]) {
      updatedErrors[index][inputName1] = '';
      onSetErrors(updatedErrors);
    }
    if (updatedErrors[index] && updatedErrors[index][inputName2]) {
      updatedErrors[index][inputName2] = '';
      onSetErrors(updatedErrors);
    }
    if (updatedErrors[index] && updatedErrors[index][images]) {
      updatedErrors[index][images] = '';
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
          <CrewTwoInputAndImage
            labelVariant={labelVariant}
            acceptMultiple={acceptMultiple}
            inputFieldValue1={item[inputName1] as string}
            inputFieldValue2={item[inputName2] as string}
            imageUploadFieldValue={item[images] as Image[]}
            inputLabel1={inputLabel1}
            inputLabel2={inputLabel2}
            imageUploadLabel={uploadImageLabel}
            inputError1={!!errors && !!errors[index]?.[inputName1] ? errors[index]?.[inputName1] : ''}
            inputError2={!!errors && !!errors[index]?.[inputName2] ? errors[index]?.[inputName2] : ''}
            imageUploadError={!!errors && !!errors[index]?.[images] ? errors[index]?.[images] : ''}
            onImageUploadFieldValueChange={(value) => handleImageChange(index, value)}
            onInputFieldValueChange1={(value) => handleInput1Change(index, value)}
            onInputFieldValueChange2={(value) => handleInput2Change(index, value)}
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

export default CrewMultiInputAndImage;
