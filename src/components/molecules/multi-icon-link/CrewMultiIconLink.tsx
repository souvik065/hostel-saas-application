import React from 'react';
import './CrewMultiIconLink.scss';
import CrewTypography from '../../atoms/typography/CrewTypography';
import {faFacebook, faTwitter, faInstagram, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CrewIcon, CrewLink } from '../../atoms';

interface CrewIconLinkProps {
  title: string;
  links: Link[];
  labelVariant?:
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline';
  fontWeight?: 'bold' | 'normal';
}

interface Link {
  name: string;
  url: string;
  target: string;
}

const CrewMultiIconLink = ({ title, links, labelVariant = 'h6', fontWeight = 'bold', ...props }: CrewIconLinkProps) => {
  return (
    <>
      <div className="icon-link-main-container">
        <CrewTypography className={'icon-title'} variant={labelVariant} fontWeight={fontWeight}>
          {title}
        </CrewTypography>
        <div className="icon-link-items-container">
          {links.map((linksItem, index) => (
            <CrewLink
              key={index}
              href={linksItem.url}
              target={linksItem.target || '_blank'}
              className="social-media-buttons"
            >
              <CrewIcon icon={getIconByName(linksItem.name)} className="link-icon" hasInheritedStyles />
            </CrewLink>
          ))}
        </div>
      </div>
    </>
  );
};

const getIconByName = (name: string): IconProp => {
  switch (name.toLowerCase()) {
    case 'facebook':
      return faFacebook as IconProp;
    case 'twitter':
      return faTwitter as IconProp;
    case 'instagram':
      return faInstagram as IconProp;
    case 'linkedin':
      return faLinkedinIn as IconProp;
    default:
      return faFacebook as IconProp;
  }
};

export default CrewMultiIconLink;
