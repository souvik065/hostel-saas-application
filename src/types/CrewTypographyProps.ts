import { TypographyProps } from '@mui/material';
import { CrewIconProps } from './CrewIconProps';

export interface CrewTypographyProps extends TypographyProps {
  align?: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
    | 'overline';
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  color?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';
  sx?: Record<string, any>;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variantMapping?: object;
  hasInherited?: boolean;
}

export interface CrewTypographyWithIconProps extends CrewTypographyProps {
  children?: JSX.Element | string;
  iconPlacementPosition?: 'left' | 'right';
  icon?: CrewIconProps
}