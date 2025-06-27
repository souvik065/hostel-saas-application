import React from 'react';
import { CrewNavTop } from '../../../components/molecules';
import CrewNavBottom from '../../../components/molecules/nav-bottom/CrewNavBottom';
import { HeaderIconWithSubMenuProps } from '../../../types/HeaderIconWithSubMenuProps';

interface CrewWebsiteHeaderProps {
  notifications: React.ReactNode[];
  onButtonClick: () => void;
  headerIconItems: HeaderIconWithSubMenuProps[];
  labelVariant: string;
  menuItem: { name: string; path: string }[];
}

const CrewWebsiteHeader: React.FC<CrewWebsiteHeaderProps> = ({
  notifications,
  onButtonClick,
  headerIconItems,
  labelVariant,
  menuItem,
}) => {
  return (
    <div>
      <CrewNavTop notifications={notifications} onButtonClick={onButtonClick} />
      <CrewNavBottom headerIconItems={headerIconItems} labelVariant='caption' menuItem={menuItem} />
    </div>
  );
};

export default CrewWebsiteHeader;
