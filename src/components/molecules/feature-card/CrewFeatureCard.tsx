import React from 'react';
import { Stack, useTheme } from '@mui/material';
import './CrewFeatureCard.scss';
import { CrewButton, CrewIcon, CrewTypography } from '../../atoms';
import { FeatureCard } from '../../../types/FeatureCard';

const CrewFeatureCard = ({
  cardIcon,
  cardHeading,
  cardButtonText,
  cardFooterText,
  className,
  cardButtonOnClick,
}: FeatureCard) => {
  const theme = useTheme();
  const themeModeClassName = 'dark-mode'; //getThemeModeClass(theme.palette.mode);
  return (
    <Stack className={`feature-card ${className} ${themeModeClassName}`}>
      <Stack className={`card-content`} spacing={4}>
        <CrewIcon className={`card-icon ${themeModeClassName}`} icon={cardIcon} />
        <CrewTypography variant="h2" className={`card-heading ${themeModeClassName}`}>
          {cardHeading}
        </CrewTypography>
        <CrewButton
          variant="contained"
          size="small"
          className={`card-button ${themeModeClassName}`}
          onClick={cardButtonOnClick}
        >
          {cardButtonText}
        </CrewButton>
        {cardFooterText && (
          <CrewTypography variant="body1" className={`card-footer-text ${themeModeClassName}`}>
            {cardFooterText}
          </CrewTypography>
        )}
      </Stack>
    </Stack>
  );
};

export default CrewFeatureCard;
