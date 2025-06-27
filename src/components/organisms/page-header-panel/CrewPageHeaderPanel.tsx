import React from 'react';
import './CrewPageHeaderPanel.scss';
import { Stack } from '@mui/material';
import { CrewImage, CrewTypography } from '../../../components/atoms';
import UserImage from '../../../assets/images/pageheaderpanel.png';

interface CrewPageHeaderPanelProps {
  headerPanelTitle: string;
  headerPanelText: string;
  imageUrl: string; 
  className?: string;
}

const CrewPageHeaderPanel = ({
  headerPanelTitle,
  headerPanelText,
  className,
  imageUrl,
}:CrewPageHeaderPanelProps) => {
  const src = UserImage.src;
  const name = 'userImage'; 

  const renderImageComponent = ()=>{
    return (
      <CrewImage
        className="panel-image"
        source={src}
        description={name ?? 'userImage'}
      />
    )
  };

  const renderPanelContent = ()=>{
    return (
      <Stack className="panel-text-content" >
            <CrewTypography variant="h3" className={`panel-title`}>{headerPanelTitle}</CrewTypography>
            <CrewTypography variant="subtitle1" className={`panel-text`} >{headerPanelText}</CrewTypography>
      </Stack>
    )
  };

   return (   
      <Stack className={`panel-main-container ${className}`} >
        <Stack className="panel-content" >
          { renderImageComponent() }
          { renderPanelContent() }
        </Stack>
      </Stack>
  )
}

export default CrewPageHeaderPanel;

