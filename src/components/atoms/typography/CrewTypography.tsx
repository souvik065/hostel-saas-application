'use client';
import { CrewTypographyProps } from '../../../types/CrewTypographyProps';
import Typography from '@mui/material/Typography';
import './CrewTypography.scss';
import { useTheme } from '@mui/material';

const CrewTypography = ({
  align,
  gutterBottom,
  noWrap,
  paragraph,
  sx,
  variant,
  fontWeight,
  textAlign,
  color,
  variantMapping,
  hasInherited,
  ...props
}: CrewTypographyProps) => {
  const theme = useTheme();
  const fontWeightClass = fontWeight ? `font-weight-${fontWeight}` : '';
  const textAlighClass = textAlign ? `text-align-${textAlign}` : '';
  const colorClass = color ? `font-${theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'}-color` : '';
  const isInherited = hasInherited ? 'inherit' : '';
  return (
    <Typography
      className={`crew-typography ${isInherited} ${
        theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode'
      } ${fontWeightClass} ${textAlighClass} ${colorClass}`}
      display={'flex'}
      align={align}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      sx={sx}
      variant={variant}
      variantMapping={variantMapping}
      {...props}
    />
  );
};

export default CrewTypography;
