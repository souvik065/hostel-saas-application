import { CrewIcon, CrewTypography, CrewTypographyWithIcon } from '../../../components/atoms';
import { getThemeModeClass } from '../../../utils/ComponentHelper';
import { textTrim } from '../../../utils/getFontValue';
import { faImages, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Stack, useTheme } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import './CrewImageUpload.scss';
import { CrewIconProps } from '../../../types/CrewIconProps';
import { ImageUploaderProps, Image } from '@/types/FileInputProps';

const icon: CrewIconProps = {
  icon: faImages,
};

const CrewImageUpload = ({
  initialImages,
  onImagesChange,
  acceptMultiple,
  maximumFileAllowed = 5,
  maxSizeInMb = 1,
  error,
  errorMessage,
  label,
  labelVariant = 'body1',
}: ImageUploaderProps) => {
  const [images, setImages] = useState<Image[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorValue, setErrorMessage] = useState(errorMessage);
  const [hasError, setHasError] = useState(error);
  const theme = useTheme();

  useEffect(() => {
    onImagesChange(images);
  }, [images]);

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setErrorMessage('');
    setHasError(false);
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      const validFiles = filesArray.filter((file) => file.size <= maxSizeInMb * 1024 * 1024);

      if (images.length + files.length <= maximumFileAllowed) {
        if (validFiles.length > 0) {
          const newImages: Image[] = await Promise.all(
            Array.from(files).map(async (file) => {
              const id = null;
              // Convert image to base64
              const base64 = await convertToBase64(file);
              const imageUrl = base64;
              const filename = file.name;
              const isActive = true;

              return { id, imageUrl, filename, isActive };
            }),
          );

          setImages([...images, ...newImages]);
        } else {
          setHasError(true);
          setErrorMessage(`File size should be below ${maxSizeInMb} MB.`);
        }
      } else {
        setHasError(true);
        setErrorMessage(`Maximum ${maximumFileAllowed} file only allowed.`);
      }
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageDelete = (id: string | null) => {
    setImages((prevImages) =>
      id
        ? prevImages.map((image) => (image.id === id ? { ...image, isActive: false } : image))
        : prevImages.filter((image) => image.id !== null),
    );
  };

  const handleUploadImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setHasError(error);
    setErrorMessage(errorMessage);
  }, [error, errorMessage]);
  return (
    <div>
      <Stack spacing={1} className={`file-upload-container ${getThemeModeClass(theme.palette.mode)}`}>
        <CrewTypography variant={labelVariant}>{label}</CrewTypography>
        <Stack component={'div'} className="file-upload-wrapper">
          {images.length === 0 && (
            <>
              <Stack component={'div'} className="file-upload-button" onClick={handleUploadImageClick}>
                <input
                  className="file-input"
                  type="file"
                  accept="image/*"
                  multiple={acceptMultiple}
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                />
                <CrewTypographyWithIcon variant={labelVariant} icon={icon} iconPlacementPosition="right">
                  Upload Image
                </CrewTypographyWithIcon>
              </Stack>
            </>
          )}
          {images.length > 0 && (
            <>
              <Stack component={'div'} direction={'row'} className="file-upload-files">
                {images.map(
                  (image, index) =>
                    image.isActive && (
                      <Stack spacing={1} key={index}>
                        <Stack component={'div'} className="file-content">
                          <img src={image.imageUrl} alt={`Preview ${index}`} className="img-content" />
                        </Stack>
                        <Stack direction={'row'} display={'flex'} justifyContent={'space-between'}>
                          <CrewTypography variant="subtitle2">{textTrim(image.filename, 10)}</CrewTypography>
                          <Stack
                            component={'div'}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleImageDelete(image.id)}
                          >
                            <CrewIcon icon={faTrash} />
                          </Stack>
                        </Stack>
                      </Stack>
                    ),
                )}
              </Stack>
            </>
          )}
        </Stack>
        {images.length > 0 && acceptMultiple && (
          <Stack component={'div'} className="file-upload-button" onClick={handleUploadImageClick}>
            <input
              className="file-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
            <Stack component={'span'} className="upload-btn">
              <CrewTypographyWithIcon variant={labelVariant} icon={icon} iconPlacementPosition="right">
                Upload Image
              </CrewTypographyWithIcon>
            </Stack>
          </Stack>
        )}
        {hasError && <span style={{ color: 'red' }}>{errorValue}</span>}
      </Stack>
    </div>
  );
};

export default CrewImageUpload;
