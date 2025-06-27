'use client';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { CrewSearchProps } from '../../../types/CrewSearchProps';
import CrewTypography from '../../../components/atoms/typography/CrewTypography';
import CrewInputField from '../../../components/atoms/input-field/CrewInputField';
import './CrewTableSearch.scss';

const CrewTableSearch = ({
  onSearch,
  placeholder = 'Search',
  borderRadius = 10,
  labelVariant = 'subtitle1',
}: CrewSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Stack spacing={2} direction={'row'} className="table-search-container">
      <CrewTypography variant={labelVariant}>Search</CrewTypography>
      <CrewInputField
        radius={borderRadius}
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onValueChange={(value) => handleInputChange(value)}
      />
    </Stack>
  );
};

export default CrewTableSearch;
