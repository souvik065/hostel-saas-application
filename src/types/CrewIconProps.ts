import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type CrewIconProps = {
  icon: IconProp;
  size?: 'small' | 'regular' | 'medium' | 'large';
  sx?: React.CSSProperties;
  hasInheritedStyles?: boolean;
  className?: string;
};
