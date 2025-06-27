import { CrewIcon, CrewTypography } from '../../atoms';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { faAngleDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './CrewHeaderWithExpandableContent.scss';

export interface ExpandableContent {
  header: string;
  headerVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  content: string;
  contentVariant?: 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
}

const CrewHeaderWithExpandableContent = ({header, headerVariant, content, contentVariant}: ExpandableContent) => {
  const [showExpandableContent, setShowExpandableContent] = useState(false);

  const handleSubheaderClick = () => {
    setShowExpandableContent(!showExpandableContent);
  };
  return (
    <>
      <Stack 
        component={'div'}
        direction={'row'}
        className="arrow" 
        onClick={handleSubheaderClick}
      >
        {showExpandableContent ? (
          <CrewIcon icon={faAngleDown} className="arrow" hasInheritedStyles/>
        ) : (
          <CrewIcon icon={faChevronRight} className="arrow" hasInheritedStyles />
        )}
        <h3>{showExpandableContent}</h3>
        <CrewTypography
          variant={headerVariant ? headerVariant : 'subtitle1'}
          className="manage-section"
        >
          {header}
        </CrewTypography>
      </Stack>
      {showExpandableContent && (
        <CrewTypography
          variant={contentVariant ? contentVariant : 'caption'}
          className="subheader-content"
        >
          {content}
        </CrewTypography>
      )}
    </>
  );
};

export default CrewHeaderWithExpandableContent;
