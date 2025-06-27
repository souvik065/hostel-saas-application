import { CrewFile } from '@/types/FileInputProps';
import { CrewIcon, CrewInputField } from '../../../components/atoms';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Stack, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './CrewFileUpload.scss';
import { FileUploadProps } from '@/types/CrewForm';

const CrewFileUpload = ({
  initialFiles,
  acceptMultiple,
  onFilesChange,
  maxSizeInMb,
  maximumFileAllowed,
  error,
  errorMessage,
  label,
  labelVariant,
  placeholder,
  acceptedFileTypes = '*/*',
}: FileUploadProps) => {
  const [files, setFiles] = useState<CrewFile[]>(initialFiles);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorValue, setErrorMessage] = useState(errorMessage);
  const [hasError, setHasError] = useState(error);
  const theme = useTheme();

  useEffect(() => {
    onFilesChange(files);
  }, [files]);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    setErrorMessage('');
    setHasError(false);

    if (selectedFiles && selectedFiles.length > 0) {
      const filesArray = Array.from(selectedFiles);
      const validFiles = filesArray.filter((file) => file.size <= maxSizeInMb * 1024 * 1024);
      if (acceptedFileTypes === '*/*') {
        handleValidFiles(validFiles);
      } else {
        const filteredFiles = filesArray.filter((file) =>
          acceptedFileTypes.includes(file.name.toLowerCase().split('.').pop()?.toLowerCase() || ''),
        );

        if (filteredFiles.length > 0) {
          handleValidFiles(validFiles);
        } else {
          setFiles([]);
          setHasError(true);
          setErrorMessage(`Only files of type ${acceptedFileTypes} are allowed.`);
        }
      }
    }
  };

  const handleValidFiles = async (validFiles: File[]) => {
    if (validFiles.length > 0) {
      if (files.length + validFiles.length > maximumFileAllowed) {
        setFiles([]);
      }

      const newFiles: CrewFile[] = await Promise.all(
        validFiles.map(async (file) => {
          const id = null;
          const base64 = await convertToBase64(file);
          const fileUrl = base64;
          const filename = file.name;
          const isActive = true;

          return { id, fileUrl, filename, isActive };
        }),
      );

      setFiles(newFiles);
    } else {
      setHasError(true);
      setErrorMessage(`File size should be below ${maxSizeInMb} MB.`);
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

  const handleFileDelete = (id: string | null) => {
    setFiles((prevFiles) =>
      id
        ? prevFiles.map((file) => (file.id === id ? { ...file, isActive: false } : file))
        : prevFiles.filter((file) => file.id !== null),
    );
  };

  const handleUploadFileClick = () => {
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
      <div className="file-upload-container">
        <input
          className="file-input"
          type="file"
          accept={acceptedFileTypes}
          multiple={acceptMultiple}
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
        <div className="input-like-file">
          <CrewInputField
            type="text"
            placeholder={placeholder}
            value={files.length > 0 ? files.map((file) => file.filename).join(', ') : ''}
            readOnly
            onClick={handleUploadFileClick}
            error={hasError}
            errorMessage={errorValue}
            label={label}
            labelVariant={labelVariant}
            endIcon={
              <Stack className="icon" component={'span'} onClick={handleUploadFileClick}>
                <CrewIcon hasInheritedStyles icon={faArrowUpFromBracket} />
              </Stack>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CrewFileUpload;
