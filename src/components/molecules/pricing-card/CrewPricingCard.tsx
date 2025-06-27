import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './CrewPricingCard.scss';
import { CrewButton, CrewTypography } from '../../atoms';
import { Stack, useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { CrewPricingCardProps } from '../../../types/CrewPricingCardProps';



const CrewPricingCard = ({
  cardButtonText = 'Button Text',
  cardButtonOnClick,
  cardType = 'Basic',
  cardAmount = '9',
  cardFrequency = 'annually',
  cardCurrency = '$',
}: CrewPricingCardProps) => {
  const theme = useTheme();
  return (
    <Card className={`crew-pricing-card ${getThemeModeClass(theme.palette.mode)}`}>
      <CardContent>
        <CrewTypography variant="h2" className="card-title">
          {cardType}
        </CrewTypography>
        <Stack className="price-section">
          <CrewTypography className="price-text" variant="body2" color="textSecondary">
            {cardCurrency}
            {cardAmount}
          </CrewTypography>
          <CrewTypography className="frequency-text" variant="body2" color="textSecondary">
            {cardFrequency}
          </CrewTypography>
        </Stack>

        <CrewButton variant="contained" size="small" className={`card-button`} onClick={cardButtonOnClick}>
          {cardButtonText}
        </CrewButton>
      </CardContent>
    </Card>
  );
};

export default CrewPricingCard;
