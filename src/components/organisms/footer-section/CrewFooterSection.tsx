'use client';
import React, { useState } from 'react';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { CrewMultiLink, CrewMultiIconLink } from '../../molecules';
import { Divider, Grid, Stack, colors, useTheme } from '@mui/material';
import './CrewFooterSection.scss';
import { CrewTypography } from '../../../components/atoms';

export interface CrewFooterSectionProps {
  footerMetaData: FooterMetadata[];
}

interface FooterMetadata {
  title: string;
  links: Link[];
  type: 'link' | 'iconLink';
}

interface Link {
  name: string;
  url: string;
  target: string;
}

const CrewFooterSection =({ footerMetaData }:CrewFooterSectionProps ) => {
  const theme = useTheme();
  
  return (
    <section className={`footer-main-container ${getThemeModeClass(theme.palette.mode)}`}>
      <Stack  className='footer-items' direction={'row'} spacing={5}>
        {footerMetaData.map((footerItem, index) => (
          <Stack  key={index} >
            {footerItem.type === 'link' ? (
              <CrewMultiLink title={footerItem.title} links={footerItem.links} linkVariant='subtitle2' fontWeight='bold' labelVariant='h6' />
            ) : (
              <CrewMultiIconLink title={footerItem.title} links={footerItem.links} fontWeight='bold' labelVariant='h6' />
            )}
          </Stack>
        ))}
      </Stack>
      <Divider className='divider'/>
      <CrewTypography variant="body2" className={`bottom-nav ${getThemeModeClass}`}>
        Copyright © 2017 Classify - All Rights Reserved.
      </CrewTypography>
    </section>
  );
};
export default CrewFooterSection;