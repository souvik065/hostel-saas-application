'use client';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { EntriesPerPageSelectorProps } from '@/types/EntriesPerPageSelectorProps';
import { CrewTypography, CrewSelect } from '../../atoms';
import './CrewEntriesPerPageSelector.scss';
import { getDropDownEntries } from '../../../utils/mockData';

const DropDownItems = getDropDownEntries();

const getDropDownItemLabel = (itemValue: string) => {
  return DropDownItems.find((item) => item.value === itemValue)?.label;
};
const getDropDownItemValue = (label: string) => {
  return DropDownItems.find((item) => item.label === label)?.value;
};

const CrewEntriesPerPageSelector = ({
  onChange,
  pageSize,
  labelVariant,
  spacing = 1,
  direction = 'row',
}: EntriesPerPageSelectorProps) => {
  const getPageSizeLabel = getDropDownItemValue(String(pageSize));
  const [selectedValue, setSelectedValue] = useState<string>(getPageSizeLabel ?? '2');
  const handleSelectChange = (selectedItemValue?: string) => {
    if (selectedItemValue) {
      const selectedNumber = getDropDownItemLabel(selectedItemValue);
      setSelectedValue(selectedItemValue);
      onChange(Number(selectedNumber));
    }
  };

  return (
    <Stack direction={direction} className="row-stack" spacing={spacing}>
      <CrewTypography variant={labelVariant}>Show</CrewTypography>
      <CrewSelect className="dropdown" value={selectedValue} menuItems={DropDownItems} onChange={handleSelectChange} />
      <CrewTypography variant={labelVariant}>entries</CrewTypography>
    </Stack>
  );
};

export default CrewEntriesPerPageSelector;
