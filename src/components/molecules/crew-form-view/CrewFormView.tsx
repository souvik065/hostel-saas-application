import { CrewTypography } from '../../atoms';
import { Divider, Stack, useTheme } from '@mui/material';
import React from 'react';
import './CrewFormView.scss';
import { getThemeModeClass } from '../../../utils/ComponentHelper';

interface RenderRowProps {
  item: string;
  value: string;
}

const RenderRow = ({ item, value }: RenderRowProps) => {
  return (
    <Stack className="view-section-detail" direction={'row'}>
      <Stack className="view-section-title">
        <CrewTypography variant="body1">{item}</CrewTypography>
      </Stack>
      <Divider className="divider" orientation="vertical" />
      <Stack className="view-section-value">
        <CrewTypography variant="body1">{value}</CrewTypography>
      </Stack>
    </Stack>
  );
};

interface viewProps {
  datas: { item: string; value: string }[];
}

const CrewFormView = ({ datas }: viewProps) => {
  const theme = useTheme();
  return (
    <Stack className={`view-section-container ${getThemeModeClass(theme.palette.mode)}`}>
      {datas.map((data, index) => (
        <RenderRow key={index} item={data.item} value={data.value} />
      ))}
    </Stack>
  );
};

export default CrewFormView;
