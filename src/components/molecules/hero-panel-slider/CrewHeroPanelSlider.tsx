"use client";
import React, { useEffect } from 'react';
import './CrewHeroPanelSlider.scss';
import { Stack } from '@mui/material';
import { CrewButton, CrewTypography } from '../../../components/atoms';

interface CrewHeroPanelSliderProps {
  header1: string;
  header2: string;
  subheader: string;
  button1Text: string;
  button1Action?: () => void;
  button2Text: string;
  button2Action?: () => void;
  UserImage: string[];
}

const CrewHeroPanelSlider = ({ header1, header2, subheader, button1Text, button1Action, button2Text, button2Action,  UserImage }:CrewHeroPanelSliderProps) => {
  const [index, setIndex] = React.useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % UserImage.length);
  };
  useEffect(() => {
    
    const intervalId = setInterval(nextSlide, 3000);

    return () => clearInterval(intervalId);
  }, [index]);
  
  return (
    <Stack className="slider">
      <Stack component={'div'} className="slider-content" style={{ backgroundImage: `url(${UserImage[index]})` }}>
        <Stack className="overlay">
          <CrewTypography variant="h3" style={{ color: 'white' }}>
            {header1}
          </CrewTypography>
          <CrewTypography variant="h3" style={{ color: 'white' }}>
            {header2}
          </CrewTypography>
          <CrewTypography variant="h6" style={{ color: 'white' }}>
            {subheader}
          </CrewTypography>
          <Stack direction={'row'} spacing={2}>
            <CrewButton variant="contained" size="small" className="button1" onClick={button1Action}>
              {button1Text}
            </CrewButton>
            <CrewButton variant="contained" size="small" className="button2" onClick={button2Action}>
              {button2Text}
            </CrewButton>
          </Stack>
        </Stack>
      </Stack>
      <Stack className={'carousel-button-group'} direction={'row'}>
        {UserImage.map((image, i) => (
          <CrewButton
            key={i}
            className={`carousel-button ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
          ></CrewButton>
        ))}
      </Stack>
    </Stack>
  );
};

export default CrewHeroPanelSlider;
