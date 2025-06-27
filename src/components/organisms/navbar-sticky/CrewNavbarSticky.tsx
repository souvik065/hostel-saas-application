import React from 'react';
import { CrewNavTop } from '../../molecules';
import CrewNavBottom from '../../molecules/nav-bottom/CrewNavBottom';
import { HeaderIconWithSubMenuProps } from '../../../types/HeaderIconWithSubMenuProps';
import './CrewNavbarSticky.scss';

interface CrewNavbarStickyProps {
  notifications: React.ReactNode[];
  onButtonClick: () => void;
  headerIconItems: HeaderIconWithSubMenuProps[];
  labelVariant: string;
  menuItem: { name: string; path: string }[];
}

const CrewNavbarSticky: React.FC<CrewNavbarStickyProps> = ({
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

export default CrewNavbarSticky;
