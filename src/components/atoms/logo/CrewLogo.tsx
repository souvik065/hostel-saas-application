import Image from 'next/image';
import { CrewLogoImageProps } from '@/types/CrewLogoImageProps';

const CrewLogo = ({ alt = 'Krewbee', height = 150, width = 200, src, ...props }: CrewLogoImageProps) => {
  return <Image alt={alt} height={height} width={width} src={src} priority />;
};

export default CrewLogo;
