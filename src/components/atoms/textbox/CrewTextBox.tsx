import { OutlinedInput, Box } from '@mui/material';
import { CrewTypography } from '..';
import { CrewTextBoxProps } from '../../../types/CrewTextBoxProps';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { useTheme } from '@mui/material';
import './CrewTextBox.scss';

const CrewTextBox = ({
  label,
  labelVariant,
  placeholderText,
  className,
  rows,
  error,
  errorMessage,
}: CrewTextBoxProps) => {
  const theme = useTheme();
  const inputErrorClasses = error ? 'input-error' : '';
  return (
    <div className={`textbox-container ${getThemeModeClass(theme.palette.mode)}`}>
      <CrewTypography className={`textbox-label`} variant={'h6'} fontWeight="bold">
        {label}
      </CrewTypography>

      <OutlinedInput
        className={`text-box ${className} ${inputErrorClasses}`}
        multiline
        rows={rows}
        placeholder={placeholderText}
      />
      {error && (
        <CrewTypography className="input-field-error" variant={labelVariant}>
          {errorMessage}
        </CrewTypography>
      )}
    </div>
  );
};

export default CrewTextBox;
