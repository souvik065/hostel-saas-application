'use client';
import React, { useEffect, useState } from 'react';
import { CrewIcon, CrewTypography } from '../../atoms';
import { faAngleDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Stack } from '@mui/material';
import './CrewPrivacyPolicyContent.scss';
import { CrewHeaderWithExpandableContent } from '../../molecules';
import { ExpandableContent } from '../../molecules/header-with-expandable-content/CrewHeaderWithExpandableContent';

interface PrivacyPolicyProps {
  header: string;
  headerVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  content: string;
  contentVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
  expandableContentList?: ExpandableContent[];
}

const CrewPrivacyPolicyContent: React.FC<PrivacyPolicyProps> = ({
  header,
  headerVariant = 'h4',
  content,
  contentVariant = 'caption',
  expandableContentList,
}) => {
  
  return (
    <Stack component={'div'}>
      <CrewTypography variant={headerVariant}>{header}</CrewTypography>
      <CrewTypography variant={contentVariant} className="content">
        {content}
      </CrewTypography>
      {expandableContentList &&
        expandableContentList?.length > 0 &&
        expandableContentList.map((expandableContent: ExpandableContent, index: number) => {
          return (
            <CrewHeaderWithExpandableContent key={index} {...expandableContent} />
          );
        })}
    </Stack>
  );
};

export default CrewPrivacyPolicyContent;
