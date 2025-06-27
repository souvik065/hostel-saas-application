import { StaticImageData } from "next/image";

export interface CrewLogoImageProps {
  theme?: any; // Include the theme prop
  height?: number; // Height prop
  width?: number; // Width prop
  src: StaticImageData; // Src prop
  alt?: string;
}
