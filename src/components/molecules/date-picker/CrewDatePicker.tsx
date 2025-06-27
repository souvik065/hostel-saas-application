import { CrewCalendar, CrewIcon, CrewInputField } from '../../atoms';
import React, { useState, useEffect, useRef } from 'react';
import './CrewDatePicker.scss';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import { formatDate } from '../../../utils/DateHelper';

interface CrewDatePickerProps {
  initialDate: Date; // Date received from the parent component
  onDateChange: (date: Date) => void; // Callback function to send the updated date to the parent
  error?: boolean;
  errorMessage?: string;
  label: string;
  labelVariant:
    | 'caption'
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
    | 'overline';
  placeholder: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
}

const CrewDatePicker = ({
  initialDate = new Date(),
  onDateChange,
  error,
  errorMessage,
  label,
  labelVariant,
  placeholder,
  locale,
  minDate,
  maxDate,
}: CrewDatePickerProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [inputValue, setInputValue] = useState<Date>(initialDate);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date) => {
    setInputValue(date);
    setCalendarOpen(false);
    onDateChange(date);
  };

  const handleInputFocus = () => {
    setCalendarOpen(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      setCalendarOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setCalendarOpen(false);
    }
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
    setInputValue(initialDate);
  }, [initialDate]);

  return (
    <section ref={calendarRef} className={`date-picker-container ${calendarOpen ? 'open' : ''}`}>
      <CrewInputField
        value={formatDate(inputValue, locale)}
        placeholder={placeholder}
        onFocus={handleInputFocus}
        fullWidth
        error={error}
        errorMessage={errorMessage}
        label={label}
        labelVariant={labelVariant}
        endIcon={
          <Stack className="icon" component={'span'} onClick={handleInputFocus}>
            <CrewIcon hasInheritedStyles icon={faCalendarAlt} />
          </Stack>
        }
      />
      <div className={`date-picker-calendar`}>
        <CrewCalendar
          date={inputValue}
          onDateChange={handleDateChange}
          selectRange={false}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </section>
  );
};

export default CrewDatePicker;
