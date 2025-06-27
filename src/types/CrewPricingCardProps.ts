export interface CrewPricingCardProps {
  cardButtonText: string;
  cardType: string;
  cardAmount: string;
  cardFrequency: string;
  cardCurrency: string;
  cardButtonOnClick: () => void;
}

export interface MultiPriceCard {
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleButtonText?: string;
  titleButtonLink?: string;
  titleButtonTarget?: string;
  priceCards?: CrewPricingCardProps[];
}
