import React from 'react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import CrewButton from '../button/CrewButton';
import CrewIcon from '../icon/CrewIcon';

interface Props {
  handleLogoutClick: () => void;
  loading: boolean;
  buttonVariant: 'logoutContained';
}

const CrewLogoutButton = ({ handleLogoutClick, loading, buttonVariant }: Props) => {
  return (
    <CrewButton
      loading={loading}
      onClick={handleLogoutClick}
      variant={buttonVariant}
      endIcon={<CrewIcon hasInheritedStyles icon={faSignOut} />}
    >
      Logout
    </CrewButton>
  );
};

export default CrewLogoutButton;
