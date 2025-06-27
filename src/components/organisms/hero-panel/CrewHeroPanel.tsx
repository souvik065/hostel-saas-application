
'use client';
import CrewHeroPanelSmallCard from '../../../components/molecules/hero-panel-small-card/CrewHeroPanelSmallCard';
import CrewHeroPanelSlider from '../../../components/molecules/hero-panel-slider/CrewHeroPanelSlider';
import React from 'react';
import { Grid } from '@mui/material';

interface CrewHeroPanelProps {
  sliderProps: {
    UserImage: string[];
    button1Text: string;
    button2Text: string;
    header1: string;
    header2: string;
    subheader: string;
  };
  smallCardProps: {
    buttonAction: () => void;
    buttonText: string;
    className?: string;
    titleText: string;
  };
}

const CrewHeroPanel= ({ sliderProps, smallCardProps }:CrewHeroPanelProps) => {
  return (
    <Grid container rowSpacing={1} columnSpacing={12}>
      <Grid item xl={8} lg={8} md={8} sm={12} xs={12}>
        <CrewHeroPanelSlider {...sliderProps} />
      </Grid>
      <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
        <CrewHeroPanelSmallCard {...smallCardProps} />
      </Grid>
    </Grid>
  );
};

export default CrewHeroPanel;