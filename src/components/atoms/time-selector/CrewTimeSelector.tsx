'use client';
import React, { useEffect, useState } from 'react';
import './CrewTimeSelector.scss';
import { Stack, useTheme } from '@mui/material';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface TimePickerProps {
  onSelectTime: (selectedTime: string) => void;
  value?: string;
}

const CrewTimeSelector = ({ onSelectTime, value }: TimePickerProps) => {
  const theme = useTheme();
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');

  const hours = Array.from({ length: 24 }, (_, index) => index.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, '0'));

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(e.target.value);
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMinute(e.target.value);
    updateSelectedTime(selectedHour, e.target.value);
  };

  const updateSelectedTime = (hour: string, minute: string) => {
    const formattedTime = `${hour}:${minute}`;
    onSelectTime(formattedTime);
  };

  useEffect(() => {
    const separatedTime = value?.split(':').map(Number);
    setSelectedHour(String(separatedTime?.[0]));
    setSelectedMinute(String(separatedTime?.[1]));
  }, [value]);

  return (
    <Stack direction={'row'} className={`time-picker ${getThemeModeClass(theme.palette.mode)}`}>
      <Stack className="custom-dropdown">
        <select value={selectedHour} onChange={handleHourChange}>
          {hours.map((hour) => (
            <option className="hour-section" key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </Stack>
      <span>:</span>
      <Stack className="custom-dropdown">
        <select value={selectedMinute} onChange={handleMinuteChange}>
          {minutes.map((minute) => (
            <option className="min-section" key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </Stack>
    </Stack>
  );
};

export default CrewTimeSelector;
