'use client';
import React from 'react';
import { Stack, useTheme, Modal, Box } from '@mui/material';
import { CrewPricingCard } from '../../molecules';
import './CrewMultiPricingCard.scss';
import { CrewPricingCardProps, MultiPriceCard } from '../../../types/CrewPricingCardProps';
import { CrewButton, CrewIcon, CrewLink, CrewTypographyWithIcon } from '../../atoms';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const TitleSection = (titleSection: MultiPriceCard) => {
  return (
    <div className={`title-section`}>
      <CrewTypographyWithIcon align={`center`} variant={titleSection?.titleVariant}>
        {titleSection?.title}
      </CrewTypographyWithIcon>
      <CrewLink href={titleSection?.titleButtonLink ?? `#`} target={titleSection?.titleButtonTarget}>
        <CrewButton
          variant="contained"
          size="large"
          stylebutton
          endIcon={<CrewIcon icon={faChevronRight} />}
        >
          {titleSection?.titleButtonText}
        </CrewButton>
      </CrewLink>
    </div>
  );
};

const CrewMultiPricingCard = ({ ...multiPriceCard }: MultiPriceCard) => {
  const theme = useTheme();

  return (
    <>
      {multiPriceCard?.title && <TitleSection {...multiPriceCard} />}
      <Box className="multi-price-cards">
        {multiPriceCard?.priceCards &&
          multiPriceCard.priceCards.map((pricingCard, index) => <CrewPricingCard key={index} {...pricingCard} />)}
      </Box>
    </>
  );
};

export default CrewMultiPricingCard;
