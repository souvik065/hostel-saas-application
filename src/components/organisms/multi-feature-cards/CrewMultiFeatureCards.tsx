import React from 'react';
import { Stack, useTheme, Modal, Box } from '@mui/material';
import { CrewFeatureCard } from '../../molecules';
import './CrewMultiFeatureCards.scss';
import { CrewTypographyWithIcon } from '../../atoms';
import { MultiFeatureCard } from '../../../types/FeatureCard';

const CrewMultiFeatureCards = ({ title, titleVariant='h2', featureCards }: MultiFeatureCard) => {
  const theme = useTheme();
  const themeModeClassName = 'dark-mode'; //getThemeModeClass(theme.palette.mode);
  return (
    <>
      <div className={`title-section ${themeModeClassName}`}>
        <CrewTypographyWithIcon align={`center`} variant={titleVariant}>
          {title}
        </CrewTypographyWithIcon>
      </div>
      <Box className={`multi-feature-card ${themeModeClassName}`}>
        {featureCards &&
          featureCards.map((card, index) => {
            return (
              <CrewFeatureCard
                key={index}
                cardIcon={card.cardIcon}
                cardHeading={card.cardHeading}
                cardButtonText={card.cardButtonText}
                cardFooterText={card.cardFooterText}
                className={card.className}
                cardButtonOnClick={card.cardButtonOnClick}
              />
            );
          })}
      </Box>
    </>
  );
};

export default CrewMultiFeatureCards;
