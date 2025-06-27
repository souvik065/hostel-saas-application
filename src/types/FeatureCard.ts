import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface FeatureCard {
  cardIcon: IconProp;
  cardHeading: string;
  cardButtonText: string;
  cardButtonOnClick?: () => void;
  cardFooterText?: string;
  className?: string;
}

export interface MultiFeatureCard {
  title?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  featureCards?: FeatureCard[];
}
