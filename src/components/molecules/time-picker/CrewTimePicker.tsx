import { CrewIcon, CrewInputField, CrewTimeSelector } from '../../../components/atoms';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './CrewTimePicker.scss';
import { TimePickerProps } from '../../../types/CrewForm';

function CrewTimePicker({
  name,
  id,
  error,
  errorMessage,
  label,
  labelVariant,
  placeholder,
  initialValue = '',
  onTimeChange,
}: TimePickerProps) {
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const timePcikerRef = useRef<HTMLDivElement>(null);

  const handleInputFocus = () => {
    setTimePickerOpen(!timePickerOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (timePcikerRef.current && !timePcikerRef.current.contains(event.target as Node)) {
      setTimePickerOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setTimePickerOpen(false);
    }
  };

  const handleTimeChange = (data: string) => {
    setInputValue(data);
    setTimePickerOpen(false);
    onTimeChange(data);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  return (
    <section ref={timePcikerRef} className={`time-picker-container ${timePickerOpen ? 'open' : ''}`}>
      <CrewInputField
        value={inputValue}
        onFocus={handleInputFocus}
        fullWidth
        name={name}
        id={id}
        error={error}
        errorMessage={errorMessage}
        label={label}
        labelVariant={labelVariant}
        placeholder={placeholder}
        endIcon={
          <Stack className="icon" component={'span'} onClick={handleInputFocus}>
            <CrewIcon hasInheritedStyles icon={faClock} />
          </Stack>
        }
      />
      <div className={`time-picker-wrap`}>
        <CrewTimeSelector onSelectTime={(value) => handleTimeChange(value)} value={inputValue} />
      </div>
    </section>
  );
}

export default CrewTimePicker;
