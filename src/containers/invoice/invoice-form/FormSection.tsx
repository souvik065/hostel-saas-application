import { InvoiceFormError, InvoiceProps } from '../../../types/CrewInvoice';
import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import React, { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { CrewRenderFormField } from '../../../components/molecules';
import { CrewButton, CrewTypography } from '../../../components/atoms';
import { getErrorClassName } from '../../../utils/ComponentHelper';
import { getFeeTypeDetailsByHostelId } from '../../../helpers/fee-type';
import * as Yup from 'yup';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { compareDates, formatDateForBackend } from '../../../utils/DateHelper';
import {
  createInvoiceData,
  createNegativeInvoiceData,
  getAllStudentIdAndName,
} from '../../../helpers/invoice-hostelite';
import { getCookie } from 'cookies-next';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required('Hostel must be selected'),
  hosteliteId: Yup.string().required('Hostelite must be selected'),
  amount: Yup.string().required(errorMessage.selectionDropdown('Amount')),
  dueDate: Yup.date()
    .test('is-greater', 'Due Date must be after Today Date', function (value) {
      if (value) {
        const todayDate = new Date();
        const toDate: Date = value instanceof Date ? value : new Date(value);
        const fromDateObj: Date = todayDate instanceof Date ? todayDate : new Date(todayDate);
        return compareDates(fromDateObj, toDate, 'after');
      }
      return false;
    })
    .required(errorMessage.inputField('To Date')),
});

const FormSection = ({ ...props }: InvoiceProps) => {
  const [_formData, setFormData] = useState(props.invoiceData);
  const [errors, setErrors] = useState<InvoiceFormError>({});
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();
  const [btnLoading, setBtnLoading] = useState<boolean>(false);

  const [feeTypeData, setFeeTypeData] = useState<{ label: string; value: string }[]>([]);
  const [studentData, setStudentData] = useState<{ label: string; value: string }[]>([]);

  const getAllFeeTypesByHostelId = async (id: string) => {
    try {
      const feeTypeData = await getFeeTypeDetailsByHostelId(id);
      if (feeTypeData !== null) {
        if (feeTypeData.data.length > 0) {
          const data = feeTypeData.data.map((item: any) => ({
            label: item.type,
            value: item.id,
          }));
          setFeeTypeData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching fee types:', error);
    }
  };

  const getAllStudentListByHostelId = async (id: string) => {
    try {
      const studentData = await getAllStudentIdAndName(id);
      if (studentData !== null) {
        if (studentData.data.length > 0) {
          const data = studentData.data.map((item: any) => ({
            label: item.name,
            value: item.hosteliteId,
          }));
          setStudentData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching fee types:', error);
    }
  };
  const inputs: InputFieldProps[] = [
    {
      type: 'date-picker',
      name: 'date',
      id: 'date',
      label: 'Date',
      details: {
        placeholder: 'Date',
        lableVariant: 'body1',
        initialDate: _formData?.date ? new Date(_formData?.date) : new Date(),
        maxDate: new Date(),
        minDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    // {
    //   type: 'input',
    //   name: 'invoiceNumber',
    //   id: 'invoiceNumber',
    //   label: 'Invoice Number',
    //   details: {
    //     inputType: 'text',
    //     placeholder: 'Invoice Number',
    //     lableVariant: 'body1',
    //     value: _formData?.invoiceNumber,
    //   },
    //   gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    // },
    {
      type: 'dropdown',
      name: 'hosteliteId',
      id: 'hosteliteId',
      label: 'Select Student',
      details: {
        items: studentData,
        lableVariant: 'body1',
        value: _formData?.hosteliteId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    // {
    //   type: 'input',
    //   name: 'address',
    //   id: 'address',
    //   label: 'Address',
    //   details: {
    //     inputType: 'text',
    //     placeholder: 'Type address',
    //     lableVariant: 'body1',
    //     value: _formData?.address,
    //   },
    //   gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    // },
    // {
    //   type: 'input',
    //   name: 'roomNumber',
    //   id: 'roomNumber',
    //   label: 'Room Number',
    //   details: {
    //     inputType: 'text',
    //     placeholder: 'Type Room Number',
    //     lableVariant: 'body1',
    //     value: _formData?.roomNumber,
    //   },
    //   gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    // },
    // {
    //   type: 'mobile-number',
    //   name: 'mobile',
    //   id: 'mobile',
    //   label: 'Phone Number',
    //   details: {
    //     inputType: 'number',
    //     placeholder: 'Type contact',
    //     lableVariant: 'body1',
    //     phoneNumberValue: _formData?.mobile,
    //     countryCodeValue: _formData?.countryCodeValue,
    //   },
    //   gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    // },
    {
      type: 'dropdown',
      name: 'feeTypeId',
      id: 'feeTypeId',
      label: 'Fee Type',
      details: {
        items: feeTypeData,
        lableVariant: 'body1',
        value: _formData?.feeTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 3, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'amount',
      id: 'amount',
      label: 'Amount',
      details: {
        inputType: 'number',
        placeholder: 'Enter Amount',
        lableVariant: 'body1',
        value: _formData?.amount,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'date-picker',
      name: 'dueDate',
      id: 'dueDate',
      label: 'Due Date',
      details: {
        placeholder: 'Due Date',
        lableVariant: 'body1',
        initialDate: _formData?.dueDate ? new Date(_formData?.dueDate) : new Date(),
        minDate: new Date(),
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    // {
    //   type: 'input',
    //   name: 'accounts',
    //   id: 'accounts',
    //   label: 'Account Detail',
    //   details: {
    //     inputType: 'text',
    //     placeholder: 'Enter Account Detail',
    //     lableVariant: 'body1',
    //     value: _formData?.accounts,
    //   },
    //   gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    // },
  ];

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    setApiErrors({ title: '', errors: [] });
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        //api call goes here
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              id: null,
              hostelId: _formData?.hostelId,
              hosteliteId: _formData?.hosteliteId,
              dueDate: formatDateForBackend(_formData?.dueDate),
              feeTypeId: _formData?.feeTypeId,
              amount: _formData?.amount,
              date: formatDateForBackend(_formData?.date),
            };
            createInvoiceData(dataToCreate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  getAllFeeTypesByHostelId(dataToCreate?.hostelId ?? '');
                  props?.getInvoiceListByHostelId?.(dataToCreate?.hostelId ?? '');
                  setFormData((props) => ({
                    ...props,
                    id: '',
                    date: new Date(),
                    invoiceNumber: '',
                    hosteliteId: '',
                    address: '',
                    roomNumber: '',
                    mobile: '',
                    countryCodeValue: 'in',
                    feeTypeId: '',
                    amount: '',
                    dueDate: new Date(),
                    accounts: '',
                    hostelId: getCookie('HostelId'),
                  }));
                  props?.closeModal?.();
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
                setBtnLoading(false);
              })
              .catch((err: any) => {
                setBtnLoading(false);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error fetching Hostels:', error);
          }
        } else {
          try {
            const dataToCreateNegative = {
              id: _formData?.id,
              hostelId: _formData?.hostelId,
              hosteliteId: _formData?.hosteliteId,
              dueDate: formatDateForBackend(_formData?.dueDate),
              feeTypeId: _formData?.feeTypeId,
              amount: _formData?.amount,
              date: formatDateForBackend(_formData?.date),
            };
            createNegativeInvoiceData(dataToCreateNegative, _formData?.id ?? '')
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  getAllFeeTypesByHostelId(dataToCreateNegative?.hostelId ?? '');
                  props?.getInvoiceListByHostelId?.(dataToCreateNegative?.hostelId ?? '');
                  setFormData((props) => ({
                    ...props,
                    id: '',
                    date: new Date(),
                    invoiceNumber: '',
                    hosteliteId: '',
                    address: '',
                    roomNumber: '',
                    mobile: '',
                    countryCodeValue: 'in',
                    feeTypeId: '',
                    amount: '',
                    dueDate: new Date(),
                    accounts: '',
                    hostelId: getCookie('HostelId'),
                  }));
                  props?.closeModal?.();
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
                setBtnLoading(false);
              })
              .catch((err: any) => {
                setBtnLoading(false);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error fetching Hostels:', error);
          }
        }

        try {
          const dataToCreate = {
            id: null,
            hostelId: _formData?.hostelId,
            hosteliteId: _formData?.hosteliteId,
            dueDate: formatDateForBackend(_formData?.dueDate),
            feeTypeId: _formData?.feeTypeId,
            amount: _formData?.amount,
            date: formatDateForBackend(_formData?.date),
          };
          createInvoiceData(dataToCreate)
            .then((result) => {
              if ((result && result.status === 'Success') || result.status === 200) {
                getAllFeeTypesByHostelId(dataToCreate?.hostelId ?? '');
                props?.getInvoiceListByHostelId?.(dataToCreate?.hostelId ?? '');
                setFormData((props) => ({
                  ...props,
                  id: '',
                  date: new Date(),
                  invoiceNumber: '',
                  hosteliteId: '',
                  address: '',
                  roomNumber: '',
                  mobile: '',
                  countryCodeValue: 'in',
                  feeTypeId: '',
                  amount: '',
                  dueDate: new Date(),
                  accounts: '',
                  hostelId: getCookie('HostelId'),
                }));
                props?.closeModal?.();
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
              setBtnLoading(false);
            })
            .catch((err: any) => {
              setBtnLoading(false);
            });
        } catch (error) {
          setBtnLoading(false);
          console.error('Error fetching Hostels:', error);
        }
      })
      .catch((err: Yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          validationErrors[error.path || ''] = error.message;
          if (error.path === 'hostelId') {
            validationErrors.hostelId = error.message;
            setApiErrors({
              title: 'Error',
              errors: [{ propertyName: 'Error', errorMessage: error?.message }],
            });
          }
        });
        setErrors(validationErrors);
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    if (_formData?.hostelId) {
      getAllFeeTypesByHostelId(_formData.hostelId);
      getAllStudentListByHostelId(_formData.hostelId);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={6} className="form-container">
        <Grid container rowSpacing={2}>
          {inputs.map((item, index) => (
            <Grid
              item
              xl={item?.gridValues?.xl}
              lg={item?.gridValues?.lg}
              md={item?.gridValues?.md}
              sm={item?.gridValues?.sm}
              xs={item?.gridValues?.xs}
              px={item?.gridValues?.px}
              key={index}
            >
              <CrewRenderFormField
                index={index}
                input={item}
                handleFieldChange={(value, input, option) => handleFieldChange(value, input, option)}
                errors={errors}
              />
            </Grid>
          ))}
        </Grid>
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
        <Stack className={`modal-footer-container`}>
          {!props.isModal && (
            <CrewButton size="large" loading={btnLoading} type="submit" variant="contained" stylebutton>
              Submit
            </CrewButton>
          )}
          {props.isModal && (
            <Stack direction={'row'} spacing={2} className="content">
              <CrewButton fullWidth variant="contained" onClick={props.closeModal}>
                Cancel
              </CrewButton>
              <CrewButton loading={btnLoading} type="submit" fullWidth variant="contained">
                Save
              </CrewButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default FormSection;
