export interface Image {
  id: string | null;
  imageUrl: string;
  filename: string;
  isActive: boolean;
}
export interface CrewFile {
  id: string | null;
  fileUrl: string;
  filename: string;
  isActive: boolean;
}

export interface ImageUploaderProps {
  initialImages: Image[];
  acceptMultiple: boolean;
  onImagesChange: (updatedImages: Image[]) => void;
  maximumFileAllowed?: number;
  maxSizeInMb?: number;
  errorMessage?: string;
  error?: boolean;
  name?: string;
  label: string;
  labelVariant?: 'caption' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'overline';
}
