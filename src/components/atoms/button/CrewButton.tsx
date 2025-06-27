'use client';
import { CrewButtonProps } from '@/types/CrewButtonProps';
import { CircularProgress, useTheme } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import './CrewButton.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

const IconAdornment = (icon: React.ReactNode) => {
  return <span className="crew-button-icon">{icon}</span>;
};

const getSizeClassName = (size: string) => {
  switch (size) {
    case 'small':
      return 'size-small';
    case 'medium':
      return 'size-medium';
    case 'large':
      return 'size-large';
    case 'fullwidth':
      return 'full-width';
    default:
      return '';
  }
};
const CrewButton = ({
  radius,
  variant,
  size,
  fullWidth,
  startIcon,
  endIcon,
  color,
  loading,
  stylebutton,
  ...props
}: CrewButtonProps) => {
  const theme = useTheme();
  let sizeClassName = '';
  if (size) {
    sizeClassName = getSizeClassName(size);
  }

  const styledRadiusButtonClass = stylebutton ? 'stylebutton' : '';

  return (
    <>
      <ButtonBase
        className={`crew-button ${sizeClassName} ${variant} ${getThemeModeClass(
          theme.palette.mode,
        )} ${styledRadiusButtonClass}`}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <CircularProgress className="crew-button-circular" size={15} />
        ) : (
          <>
            {startIcon && IconAdornment(startIcon)}
            {props.children}
            {endIcon && IconAdornment(endIcon)}
          </>
        )}
      </ButtonBase>
    </>
  );
};

export default CrewButton;
