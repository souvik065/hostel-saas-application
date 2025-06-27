import { CreateDocumentRegistration } from '../../../helpers/document-registration';
import CrewMultiInputSelectDateAndFileUpload from '../../../components/organisms/multi-input-select-date-and-fileupload/CrewMultiInputSelectDateAndFileUpload';
import { AssignDocumentError, AssignDocumentFormError } from '../../../types/CrewRegistration';
import { CrewFile } from '../../../types/FileInputProps';
import { Grid, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import * as Yup from 'yup';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { CrewTypography } from '../../../components/atoms';
import { formatDateForBackend } from '../../../utils/DateHelper';
import { getErrorClassName } from '../../../utils/ComponentHelper';

const validationSchema = Yup.object().shape({
  documents: Yup.array().of(
    Yup.object().shape({
      documentName: Yup.string()
        .max(255, errorMessage.max('Document name', 255))
        .required(errorMessage.inputField('Document name'))
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
      documentType: Yup.string().required(errorMessage.selectionDropdown('Document Type')),
      expiryDate: Yup.string().required(errorMessage.selectionDropdown('Expiry Date')),
      documet: Yup.array().min(1, errorMessage.selectionDropdown('At leaset 1 File')),
    }),
  ),
});

const RegistrationDocument = () => {
  const [_formData, setFormData] = useState({
    documents: [{ id: '', documentName: '', documentType: '', expiryDate: new Date(), document: [] as CrewFile[] }],
  });

  const [errors, setErrors] = useState<AssignDocumentFormError>({});
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const handleSaveOrUpdate = async (item: any, index: number) => {
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        const data = {
          id: item.id === '' ? null : item.id,
          hosteliteId: sessionStorage.getItem('hosteliteId'),
          name: item.documentName,
          number: null,
          type: item.documentType,
          expiryDate: formatDateForBackend(item.expiryDate),
          document: item.document?.[0].fileUrl,
          isUpdateDocument: true,
        };
        console.log('data', item);
        if (data.id === '' || data.id === null) {
          CreateDocumentRegistration(data)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                setFormData((prev) => ({
                  ...prev,
                  documents: [
                    { id: '', documentName: '', documentType: '', expiryDate: new Date(), document: [] as CrewFile[] },
                  ],
                }));
                setFormData((prev) => {
                  const updatedDocuments = [...prev.documents]; // Clone the documents array
                  // Update the documet field for the specified index
                  updatedDocuments[index] = {
                    ...updatedDocuments[index], // Preserve other fields
                    id: '',
                    documentName: '',
                    documentType: '',
                    expiryDate: new Date(),
                    document: [] as CrewFile[],
                  };
                  return { ...prev, documents: updatedDocuments }; // Return the updated state
                });
              } else if (result && result.status === 400) {
                const formattedErrors: ApiErrorItem[] = result.errors.map((errorItem: any) => {
                  return {
                    propertyName: errorItem.propertyName,
                    errorMessage: errorItem.errorMessage,
                  };
                });
                setApiErrors({
                  title: 'Warning',
                  errors: formattedErrors,
                });
              } else if (result && result.status === 404) {
                setApiErrors({
                  title: 'Not Found',
                  errors: [{ propertyName: 'Error', errorMessage: result?.detail }],
                });
              } else if (result && result.status === 500) {
                setApiErrors({
                  title: 'Error',
                  errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                });
              }
            })
            .catch((err: any) => {});
        }
      })
      .catch((err: Yup.ValidationError) => {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: AssignDocumentFormError = {};
          let documentError: AssignDocumentError = {};
          err.inner.forEach((error) => {
            if (error.path && error.path.startsWith('documents')) {
              const documentIndex = Number(error.path.split('[')[1]?.split(']')[0]);
              if (error.path.endsWith('documentName')) {
                documentError.documentName = error.message;
              } else if (error.path.endsWith('documentType')) {
                documentError.documentType = error.message;
              } else if (error.path.endsWith('expiryDate')) {
                documentError.expiryDate = error.message;
              } else if (error.path.endsWith('documet')) {
                documentError.documet = error.message;
              }

              validationErrors.documents = validationErrors.documents || [];
              validationErrors.documents[documentIndex] = documentError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  return (
    <Stack component={'section'}>
      <CrewMultiInputSelectDateAndFileUpload
        labelVariant="body1"
        namePrefix="document"
        dateLabel="Expiry Date"
        dateName="expiryDate"
        fileName="document"
        fileUploadLabel="Documet"
        inputLabel="Document Name"
        inputName="documentName"
        errors={errors.documents || []}
        itemButton
        acceptMultiple={false}
        minDate={new Date()}
        items={_formData.documents}
        menuItems={[
          { value: 'driving-licence', label: 'Driving Licence' },
          { value: 'aadhaar-card', label: 'Aadhaar Card' },
          { value: 'pan-card', label: 'PAN Card' },
          { value: 'voter-id', label: 'Voter Id' },
          { value: 'employee-id', label: 'Employee Id' },
          { value: 'student-id', label: 'Student Id' },
          { value: 'passport', label: 'Passport' },
        ]}
        onChange={(updatedDocuments) => {
          console.log('updatedDocuments', updatedDocuments);
          setFormData((prevData) => ({ ...prevData, documents: updatedDocuments }));
        }}
        onSetErrors={(receivedErrors: AssignDocumentError) => {
          setErrors((prevErrors) => ({ ...prevErrors, documents: receivedErrors as AssignDocumentError[] }));
        }}
        onHandleDelete={(id) => console.log(id)}
        onSaveOrUpdate={handleSaveOrUpdate}
        selectLabel="Document Type"
        selectName="documentType"
        lg={3}
        md={3}
        sm={6}
        xl={3}
        xs={12}
      />
      <Grid container>
        <Grid item>
          {apiErrors && apiErrors.errors.length > 0 && (
            <Stack>
              <CrewTypography className={getErrorClassName(apiErrors.title.toLowerCase())}>
                {apiErrors?.title}:
              </CrewTypography>
              <ul>
                {apiErrors?.errors.map((errorItem, index) => (
                  <li key={index} className={getErrorClassName(apiErrors.title.toLowerCase())}>
                    <CrewTypography className={getErrorClassName(apiErrors.title.toLowerCase())} variant="body2">
                      {`${errorItem.propertyName}: ${errorItem.errorMessage}`}
                    </CrewTypography>
                  </li>
                ))}
              </ul>
            </Stack>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default RegistrationDocument;
