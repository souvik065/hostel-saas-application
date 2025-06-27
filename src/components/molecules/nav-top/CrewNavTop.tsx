import React from 'react';
import './CrewNavTop.scss';
import { CrewButton } from '@/components/atoms';

export interface NavLink {
  isActive?: boolean;
  dropdownMenu?: NavLink[];
  text?: string | null;
  iconPrefix?: string | null;
  icon?: string | null;
  url?: string | null;
  isButton?: boolean | null;
  openInSeparateTab?: boolean | null;
  event?: Function | null;
  showDropdownOnMobileOnly?: boolean | null;
}

export interface CrewNavTopProps {
  singleColor?: boolean;
  notifications?: Array<React.ReactNode>;
  hasSubnav?: boolean;
  buttonText?: string | null;
  onButtonClick?: () => void;
}
const CrewNavTop = ({ buttonText, onButtonClick, ...props }: CrewNavTopProps) => {
  return (
    <div className="nav-top">
      <div className="nav-container">
        <div className="nav-top-inner">
          {props.notifications &&
            props.notifications.map((notification, index) => (
              <span
                className={`notification ${
                  typeof notification === 'string' && notification.includes('50% OFF') ? 'discount-text' : ''
                }`}
                key={index}
              >
                {notification}
              </span>
            ))}
          {props.hasSubnav && (
            <div className="subnav-items">
              {buttonText && onButtonClick && (
                <button className="nav-button" onClick={onButtonClick}>
                  {buttonText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrewNavTop;
