import { StaticImageData } from 'next/image';

export interface CrewImageProps {
  className?: string;
  description: string;
  isGif?: boolean;
  source: string | StaticImageData;
}
