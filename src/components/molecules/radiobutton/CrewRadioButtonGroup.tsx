'use client';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { RadioOption, RadioOptionGroup } from '@/types/CrewRadioButtonProps';
import CrewRadioButton from '../../../components/atoms/radiobutton/CrewRadioButton';
import { Stack, useTheme } from '@mui/material';
import { CrewTypography } from '../../../components/atoms';
import './CrewRadioButtonGroup.scss';
import { useEffect, useState } from 'react';

interface RenderOptionsProps {
  options: RadioOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderOptions = ({ options, onChange, selectedValue }: RenderOptionsProps) => {
  const [selectedRadio, setSelectedRadio] = useState(selectedValue);
  const isRadioChecked = (value: string): boolean => selectedRadio === value;

  const handleRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.currentTarget.value);
    onChange(e);
  };

  useEffect(() => {
    setSelectedRadio(selectedValue);
  }, [selectedValue]);

  return options.map(({ label, name, disabled }, index) => {
    const optionId = `radio-option-${label.replace(/\s+/g, '')}`;
    return (
      <CrewRadioButton
        value={label}
        label={label}
        id={optionId}
        name={name}
        key={index}
        disabled={disabled}
        checked={isRadioChecked(label)}
        onChange={handleRadioClick}
      />
    );
  });
};

const CrewRadioButtonGroup = ({
  label,
  options,
  onChange,
  selectedValue,
  error,
  errorMessage,
  direction,
  labelVariant = 'caption',
}: RadioOptionGroup) => {
  const theme = useTheme();

  return (
    <Stack direction={'column'} spacing={1}>
      <CrewTypography variant={labelVariant}>{label}</CrewTypography>
      <Stack spacing={1} direction={direction} className="radiostack">
        <RenderOptions selectedValue={selectedValue} options={options} onChange={(e) => onChange(e)} />
      </Stack>
      {error && (
        <CrewTypography className="radio-field-error" variant={labelVariant}>
          {errorMessage}
        </CrewTypography>
      )}
    </Stack>
  );
};

export default CrewRadioButtonGroup;
