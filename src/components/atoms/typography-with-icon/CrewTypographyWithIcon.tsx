'use client';
import { CrewTypographyWithIconProps } from '@/types/CrewTypographyProps';
import Typography from '@mui/material/Typography';
import './CrewTypographyWithIcon.scss';
import { useTheme } from '@mui/material';
import CrewIcon from '../icon/CrewIcon';

const CrewTypographyWithIcon = ({
  fontWeight,
  textAlign,
  color,
  hasInherited,
  iconPlacementPosition,
  variant,
  ...props
}: CrewTypographyWithIconProps) => {
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
      display={'inline-block'}
      {...props}
      variant={variant}
    >
      {props.icon && iconPlacementPosition === 'left' && <CrewIcon {...props.icon} className="icon-left" />}
      {props.children}
      {props.icon && iconPlacementPosition === 'right' && <CrewIcon {...props.icon} className="icon-right" />}
    </Typography>
  );
};

export default CrewTypographyWithIcon;
