import React from 'react';
import Image from 'next/image';
import { CrewImageProps } from '@/types/CrewImageProps';
import './CrewImage.scss';
const CrewImage = ({ className, source, description, isGif, ...props }: CrewImageProps) => {
  return (
    <Image
      fill
      data-test="crew-image"
      src={source}
      alt={description}
      loading={isGif ? 'lazy' : 'eager'}
      className={`${className || ''} img-fluid`}
    />
  );
};

export default CrewImage;

