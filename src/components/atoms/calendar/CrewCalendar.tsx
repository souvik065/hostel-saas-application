'use client';
import React, { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@mui/material';
import { MiniCalendarProps } from '@/types/MiniCalendarProps';
import CrewTypography from '../typography/CrewTypography';
import CrewIcon from '../icon/CrewIcon';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CrewCalendarProps extends MiniCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const CrewCalendar = ({ date, selectRange, themeName, onDateChange, ...rest }: CrewCalendarProps) => {
  const [value, onChange] = useState<Value>(date);
  const theme = useTheme();
  const setTheme = () => {
    return theme.palette.mode === 'dark' ? 'dark-mode' : 'light-mode';
  };

  const handleDateChange = (selectedDate: Date | Date[]) => {
    if (Array.isArray(selectedDate)) {
    } else {
      onChange(selectedDate);
      onDateChange(selectedDate); // Invoke the callback with the selected date
    }
  };

  return (
    <div className={setTheme()}>
      <Calendar
        onChange={handleDateChange as CalendarProps['onChange']}
        value={value}
        selectRange={selectRange}
        view={'month'}
        tileContent={<CrewTypography />}
        prevLabel={<CrewIcon icon={faChevronLeft} />}
        nextLabel={<CrewIcon icon={faChevronRight} />}
        minDate={rest.minDate ? rest.minDate : null}
        maxDate={rest.maxDate ? rest.maxDate : null}
      />
    </div>
  );
};

export default CrewCalendar;
