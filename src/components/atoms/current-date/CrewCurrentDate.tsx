import React from 'react';
import { CrewTypographyProps } from '@/types/CrewTypographyProps';
import './CrewCurrentDate.scss';
import CrewTypography from '../typography/CrewTypography';

const CrewCurrentDate = ({ variant = 'caption', ...props }: CrewTypographyProps) => {
  const currentDate = new Date();
  //TO:DO move below const to common files
  const options = { weekday: 'long', day: 'numeric', month: 'long' } as Intl.DateTimeFormatOptions;
  const formattedDate = currentDate.toLocaleDateString('en-IN', options);

  return (
    <CrewTypography variant={variant} {...props}>
      {formattedDate}
    </CrewTypography>
  );
};

export default CrewCurrentDate;
