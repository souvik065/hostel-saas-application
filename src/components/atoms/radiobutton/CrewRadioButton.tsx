import { useTheme } from '@mui/material';
import './CrewRadioButton.scss';
import { RadioElementProps } from '@/types/CrewRadioButtonProps';
import { CrewTypography } from '..';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

const CrewRadioButton = ({ label, id, disabled = false, checked = false, ...props }: RadioElementProps) => {
  const theme = useTheme();
  return (
    <div className={`radio-wrapper ${getThemeModeClass(theme.palette.mode)}`}>
      <input className="radio-input" type="radio" id={id} checked={checked} disabled={disabled} {...props} />
      <label className="radio-label" htmlFor={id}>
        <CrewTypography>{label}</CrewTypography>
      </label>
    </div>
  );
};

export default CrewRadioButton;
