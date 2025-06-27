'use client';
import React from 'react';
import './CrewMultiLink.scss';
import { CrewLink, CrewTypography } from '../../atoms';

interface CrewMultiLinkProps {
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
  linkVariant:
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
}

interface Link {
  name: string;
  url: string;
  target: string;
}

const CrewMultiLink = ({
  title,
  links,
  labelVariant = 'h6',
  fontWeight = 'bold',
  linkVariant = 'subtitle2',
  ...props
}: CrewMultiLinkProps) => {
  return (
    <div className="footer-card-container">
      <CrewTypography  className={'card-title'}variant={labelVariant} fontWeight={fontWeight}>
        {title}
      </CrewTypography>
      <div className="footer-card-links">
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <CrewLink href={link.url} variant={linkVariant} target={`_blank`}>
                {link.name}
              </CrewLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CrewMultiLink;
