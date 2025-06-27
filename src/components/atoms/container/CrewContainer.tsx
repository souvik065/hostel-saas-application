import React from 'react';
import { CrewContainerProps } from '@/types/CrewContainerProps';
import Container from '@mui/material/Container';

const CrewContainer = ({ disableGutters, fixed, maxWidth, ...props }: CrewContainerProps) => {
  const containerClass = `crew-container-main ${disableGutters ? 'no-padding' : 'default-padding'} ${fixed ? 'fixed-width' : 'full-width'}`;

  return (
    <Container className={containerClass} maxWidth={maxWidth} {...props}>
      {props.children}
    </Container>
  );
};

export default CrewContainer;
