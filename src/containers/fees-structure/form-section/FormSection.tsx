import { ApiErrorItem, ApiErrorResponse } from '../../../types/CrewBuilding';
import { HandleFieldChange, InputFieldProps } from '../../../types/CrewForm';
import React, { useEffect, useState } from 'react';
import { getPlanTypesByHostelId } from '../../../helpers/hostelite-registration';
import { getFeeTypeDetailsByHostelId } from '../../../helpers/fee-type';
import { Grid, Stack } from '@mui/material';
import { CrewRenderFormField, CrewTwoInputWithDate } from '../../../components/molecules';
import { CrewButton, CrewTypography } from '../../../components/atoms';
import { getErrorClassName } from '../../../utils/ComponentHelper';
import {
  AssignFeesStructureFormError,
  AssignInstallmentError,
  FeeStructureProps,
  Installment,
} from '../../../types/CrewFeesStructure';
import { getGeneralSettingByHostelId } from '../../../helpers/general-setting';
import * as Yup from 'yup';
import { errorMessage } from '../../../constants/app-hostel-constants';
import { createFeesStructure, updateFeesStructure } from '../../../helpers/fees-struture';
import { getCookie } from 'cookies-next';
import { formatDateForBackend } from '../../../utils/DateHelper';
import './FormSection.scss';

const validationSchema = Yup.object().shape({
  hostelId: Yup.string().required(errorMessage.selectionDropdown('Hostel')),
  name: Yup.string().required(errorMessage.inputField('Name')),
  planTypeId: Yup.string().required(errorMessage.selectionDropdown('Plan Type')),
  feeTypeId: Yup.string().required(errorMessage.selectionDropdown('Fee Type')),
  amount: Yup.string().required(errorMessage.inputField('Amount')),
  noOfInstallments: Yup.string().required(errorMessage.selectionDropdown('No Of Installment')),
  installments: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .max(255, errorMessage.max('Name', 255))
        .required(errorMessage.inputField('Name'))
        .matches(/^[a-zA-Z0-9\s]+$/, 'Name should contain only letters and numbers'),
      amount: Yup.string().required(errorMessage.inputField('Amount')),
    }),
  ),
});

const FormSection = ({ ...props }: FeeStructureProps) => {
  const [_formData, setFormData] = useState(props.feesStructureDate);
  const [errors, setErrors] = useState<AssignFeesStructureFormError>({});
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const [planTypeData, setPlanTypeData] = useState<{ label: string; value: string }[]>([]);
  const [feeTypeData, setFeeTypeData] = useState<{ label: string; value: string }[]>([]);
  const [noOfInstallemtData, setNoOfInstallemtData] = useState<{ label: string; value: string }[]>([]);
  const [generalDateValue, setGeneralDateValue] = useState<Date>(new Date());
  const [disabledInstallmentField, setDisabledInstallmentField] = useState<boolean>(true);

  const getAllPlanTypesByHostelId = async (id: string) => {
    try {
      const res = await getPlanTypesByHostelId(id);
      const data = res.data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
      setPlanTypeData(data);
    } catch (error) {
      console.error('Error fetching plan Type:', error);
    }
  };

  const getAllFeeTypesByHostelId = async (id: string) => {
    try {
      const res = await getFeeTypeDetailsByHostelId(id);
      const data = res.data.map((item: any) => ({
        label: item.type,
        value: item.id,
      }));
      setFeeTypeData(data);
    } catch (error) {
      console.error('Error fetching plan Type:', error);
    }
  };

  const getAllGenralSettingByHostelId = async (id: string) => {
    try {
      const res = await getGeneralSettingByHostelId(id);
      const data = JSON.parse(res?.data?.settingsJson);
      const dueDayOfMonth = parseInt(data?.DueDate);
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      setGeneralDateValue(new Date(year, month + 1, dueDayOfMonth));
    } catch (error) {
      console.error('Error fetching General Settings:', error);
    }
  };

  const inputs: InputFieldProps[] = [
    {
      type: 'input',
      name: 'name',
      id: 'name',
      label: 'Name',
      details: {
        inputType: 'text',
        placeholder: 'Enter Name',
        lableVariant: 'body1',
        value: _formData?.name,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
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
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'dropdown',
      name: 'planTypeId',
      id: 'planTypeId',
      label: 'Plan Type',
      details: {
        items: planTypeData,
        lableVariant: 'body1',
        value: _formData?.planTypeId,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'amount',
      id: 'amount',
      label: 'Amount( Full year )',
      details: {
        inputType: 'number',
        placeholder: 'Enter Amount',
        lableVariant: 'body1',
        value: _formData?.amount,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
    {
      type: 'input',
      name: 'noOfInstallments',
      id: 'noOfInstallments',
      label: 'No Of Installement',
      details: {
        inputType: 'number',
        placeholder: 'Enter No Of Installement',
        lableVariant: 'body1',
        value: _formData?.noOfInstallments,
        disabled: disabledInstallmentField,
      },
      gridValues: { xs: 12, md: 4, lg: 4, xl: 4, sm: 6, px: 1 },
    },
  ];

  const handleFieldChange: HandleFieldChange = (value, input) => {
    const { name } = input;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    if (name === 'amount') {
      setDisabledInstallmentField(false);
    }
    if (name === 'noOfInstallments') {
      handleNoOfInstallmentsChange(value as string);
    }
  };

  useEffect(() => {
    if (_formData?.hostelId) {
      getAllFeeTypesByHostelId(_formData.hostelId);
      getAllPlanTypesByHostelId(_formData.hostelId);
      getAllGenralSettingByHostelId(_formData.hostelId);
    }
  }, []);

  const handleNoOfInstallmentsChange = (value: string) => {
    const numInstallments = parseInt(value);
    console.log('value', numInstallments);
    if (numInstallments > 0 && _formData && _formData?.amount !== '') {
      const totalAmount: number = parseInt(_formData?.amount ?? '');
      const amountPerInstallment = totalAmount / numInstallments;
      const newInstallments: Installment[] = [];
      const startDate = new Date(generalDateValue);

      for (let i = 0; i < numInstallments; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i);
        newInstallments.push({
          id: '',
          name: `Installment ${i + 1}`,
          dueDate,
          amount: amountPerInstallment.toString(),
          isActive: true,
        });
      }

      // Update the state with the new installment array
      setFormData((prevFormData) => ({
        ...prevFormData,
        installments: newInstallments,
      }));
    }
  };

  const handleInputFieldValueChange = (index: number, value: string) => {
    setFormData((prevFormData) => {
      const newInstallments = [...prevFormData.installments];
      newInstallments[index].amount = value;
      const totalInstallmentAmount = calculateTotalInstallmentAmount();
      const difference = parseFloat(_formData.amount || '0') - totalInstallmentAmount;
      const remainingInstallments = newInstallments.slice(index + 1);
      const remainingInstallmentsCount = remainingInstallments.length;
      const distributedDifference = remainingInstallmentsCount !== 0 ? difference / remainingInstallmentsCount : 0;
      remainingInstallments.forEach((installment) => {
        installment.amount = (parseFloat(installment.amount || '0') + distributedDifference).toString();
      });

      return {
        ...prevFormData,
        installments: [...newInstallments],
      };
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.installments && newErrors.installments[index]) {
        newErrors.installments[index].amount = '';
      }
      return newErrors;
    });
  };

  const handleInputField1ValueChange = (index: number, value: string) => {
    setFormData((prevFormData) => {
      const newInstallments = [...prevFormData.installments];
      newInstallments[index].name = value;
      return {
        ...prevFormData,
        installments: newInstallments,
      };
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.installments && newErrors.installments[index]) {
        newErrors.installments[index].name = '';
      }
      return newErrors;
    });
  };

  const handleDateFieldValueChange = (index: number, value: Date) => {
    setFormData((prevFormData) => {
      const newInstallments = [...prevFormData.installments];
      newInstallments[index].dueDate = value;
      for (let i = index + 1; i < newInstallments.length; i++) {
        const nextDueDate = new Date(value);
        nextDueDate.setMonth(nextDueDate.getMonth() + (i - index));
        newInstallments[i].dueDate = nextDueDate;
      }

      return {
        ...prevFormData,
        installments: newInstallments,
      };
    });
  };

  const calculateTotalInstallmentAmount = () => {
    return _formData.installments.reduce((total, installment) => total + parseFloat(installment.amount || '0'), 0);
  };

  const CheckInstallmentAmountEqualsToTotalAmount = () => {
    let total = 0;
    for (const installment of _formData.installments) {
      const amount = parseFloat(installment.amount || '0');
      if (amount < 0) {
        return false; // Return false if any amount is negative
      }
      total += amount;
    }
    return total; // Return the total amount if all amounts are valid
  };

  const isSubmitButtonEnabled = () => {
    // Calculate the total amount of installments
    const totalInstallmentAmount = CheckInstallmentAmountEqualsToTotalAmount();
    console.log('totalInstallmentAmount', totalInstallmentAmount);
    // Compare with the main amount
    console.log('_formData.amount', _formData.amount);
    return parseFloat(_formData.amount || '0') === totalInstallmentAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    await validationSchema
      .validate(_formData, { abortEarly: false })
      .then(() => {
        if (_formData?.id === null || _formData?.id === '') {
          try {
            const dataToCreate = {
              id: null,
              name: _formData?.name,
              planTypeId: _formData?.planTypeId,
              feeTypeId: _formData?.feeTypeId,
              amount: parseInt(_formData?.amount ?? '0'),
              noOfInstallments: parseInt(_formData.noOfInstallments ?? '0'),
              hostelId: _formData.hostelId,
              installments: _formData.installments.map((installment) => ({
                ...installment,
                id: null,
                amount: parseInt(installment.amount),
                dueDate: formatDateForBackend(installment.dueDate),
              })),
            };
            createFeesStructure(dataToCreate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  props?.getFeesList?.(dataToCreate?.hostelId ?? '');
                  setFormData({
                    id: '',
                    hostelId: getCookie('HostelId'),
                    planTypeId: '',
                    feeTypeId: '',
                    amount: '',
                    dueDate: new Date(),
                    noOfInstallments: '',
                    installments: [] as Installment[],
                  });
                  props?.closeModal?.();
                } else if (result && result.status === 400) {
                  const formattedErrors: ApiErrorItem[] = result?.detail?.errors.map((errorItem: any) => {
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
                    errors: [{ propertyName: 'Error', errorMessage: result?.detail?.detail }],
                  });
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }

                setBtnLoading(false);
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error:', error);
          }
        } else {
          try {
            const dataToUpdate = {
              id: _formData?.id,
              name: _formData?.name,
              planTypeId: _formData?.planTypeId,
              feeTypeId: _formData?.feeTypeId,
              amount: _formData?.amount,
              noOfInstallments: _formData.noOfInstallments,
              hostelId: _formData.hostelId,
              installments: _formData.installments.map((installment) => ({
                ...installment,
                amount: parseInt(installment.amount),
                dueDate: formatDateForBackend(installment.dueDate),
              })),
            };
            updateFeesStructure(dataToUpdate)
              .then((result) => {
                if ((result && result.status === 'Success') || result.status === 200) {
                  props?.getFeesList?.(dataToUpdate?.hostelId ?? '');
                  setFormData({
                    id: '',
                    hostelId: getCookie('HostelId'),
                    planTypeId: '',
                    feeTypeId: '',
                    amount: '',
                    dueDate: new Date(),
                    noOfInstallments: '',
                    installments: [] as Installment[],
                  });
                  props.closeModal?.();
                } else if (result && result.status === 400) {
                  // Process validation errors
                  const formattedErrors: ApiErrorItem[] = result.data.errors.map((errorItem: any) => {
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
                } else {
                  setApiErrors({
                    title: 'Error',
                    errors: [{ propertyName: 'Error', errorMessage: 'Server Error' }],
                  });
                }
                setBtnLoading(false);
              })
              .catch((err) => {
                setBtnLoading(false);
                console.log(err);
              });
          } catch (error) {
            setBtnLoading(false);
            console.error('Error:', error);
          }
        }
      })
      .catch((err: Yup.ValidationError) => {
        if (err instanceof Yup.ValidationError) {
          const validationErrors: AssignFeesStructureFormError = {};
          let installmentError: AssignInstallmentError = {};
          err.inner.forEach((error) => {
            console.log('validation failed', error.path);
            if (error.path === 'hostelId') {
              validationErrors.hostelId = error.message;
            } else if (error.path === 'name') {
              validationErrors.name = error.message;
            } else if (error.path === 'planTypeId') {
              validationErrors.planTypeId = error.message;
            } else if (error.path === 'feeTypeId') {
              validationErrors.feeTypeId = error.message;
            } else if (error.path === 'amount') {
              validationErrors.amount = error.message;
            } else if (error.path === 'noOfInstallments') {
              validationErrors.noOfInstallments = error.message;
            } else if (error.path && error.path.startsWith('installment')) {
              const installmentIndex = Number(error.path.split('[')[1]?.split(']')[0]);
              if (error.path.endsWith('name')) {
                installmentError.name = error.message;
              }
              if (error.path.endsWith('amount')) {
                installmentError.amount = error.message;
              }
              if (error.path.endsWith('dueDate')) {
                installmentError.dueDate = error.message;
              }
              validationErrors.installments = validationErrors.installments || [];
              validationErrors.installments[installmentIndex] = installmentError;
            }
          });
          setErrors(validationErrors);
        }
      });
  };

  return (
    <Stack component={'section'}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={6} className="form-section">
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
                  handleFieldChange={(value, input) => handleFieldChange(value, input)}
                  errors={errors}
                />
              </Grid>
            ))}
          </Grid>

          {_formData.installments.map((_, index) => (
            <Grid container key={index}>
              <CrewTwoInputWithDate
                labelVariant="subtitle1"
                dateLable={`Due Date ${index + 1}`}
                inputLabel2="Amount"
                inputLabel1="Name"
                minDate={new Date()}
                dateFieldValue={_formData.installments?.[index].dueDate}
                inputFieldValue1={_formData.installments?.[index].name}
                inputFieldValue2={_formData.installments?.[index].amount}
                inputError1={errors?.installments?.[index]?.name}
                inputError2={errors?.installments?.[index]?.amount}
                onInputField1ValueChange={(value: string) => handleInputField1ValueChange(index, value)}
                onInputField2ValueChange={(value: string) => handleInputFieldValueChange(index, value)}
                onDateFieldValueChange={(value: Date) => handleDateFieldValueChange(index, value)}
                xl={3}
                lg={4}
                md={4}
                sm={6}
                xs={12}
              />
            </Grid>
          ))}

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
            <CrewButton
              size="large"
              loading={btnLoading}
              type="submit"
              variant="contained"
              stylebutton
              disabled={!isSubmitButtonEnabled()}
            >
              Submit
            </CrewButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default FormSection;
