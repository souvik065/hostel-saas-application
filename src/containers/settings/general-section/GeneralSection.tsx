import { CrewButton, CrewInputField, CrewTypography } from '@/components/atoms';
import { getGeneralSettingByHostelId, updateGeneralSetting } from '@/helpers/general-setting';
import { ApiErrorItem, ApiErrorResponse } from '@/types/CrewBuilding';
import { Grid, Stack } from '@mui/material';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

const getErrorClass = (title: string) => {
  return title.toLowerCase() === 'warning' ? 'warning' : title.toLowerCase() === 'error' ? 'error' : 'notfound';
};

const GeneralSection = () => {
  const [_formData, setFormData] = useState({
    hostelId: getCookie('HostelId'),
    id: '',
    jsonData: '',
  });

  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse>();

  const getAllGenralSettingByHostelId = async (id: string) => {
    try {
      await getGeneralSettingByHostelId(id)
        .then((result) => {
          if ((result && result.status === 200) || result.staus === 'Success') {
            setFormData((prev) => ({
              ...prev,
              id: result.data.id,
              jsonData: result.data.settingsJson,
            }));
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
        .catch((err: any) => {
          setBtnLoading(false);
        });
    } catch (error) {
      console.error('Error fetching fee types:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBtnLoading(true);
    //api call goes here
    const dataToCreate = {
      id: _formData.id,
      hostelId: _formData.hostelId,
      settingsJson: _formData.jsonData,
    };
    console.log('dataToCreate', dataToCreate);
    updateGeneralSetting(dataToCreate)
      .then((result) => {
        if ((result && result.status === 200) || result.status === 'Success') {
          setBtnLoading(false);
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
      .catch((err: any) => {
        console.log(err);
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    if (_formData.hostelId) getAllGenralSettingByHostelId(_formData.hostelId);
  }, []);

  useEffect(() => {
    if (_formData.hostelId) {
      getAllGenralSettingByHostelId(_formData.hostelId);
    }
  }, [_formData.hostelId]);

  useEffect(() => {
    const handleHostelChange = (event: CustomEvent<{ selectedHostel: string }>) => {
      const newHostelId = event.detail.selectedHostel;
      setFormData((preview) => ({ ...preview, hostelId: newHostelId }));
    };
    document.addEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    return () => {
      document.removeEventListener('hostelChange', handleHostelChange as EventListenerOrEventListenerObject);
    };
  }, []);

  return (
    <Stack component={'section'}>
      <form onSubmit={handleSubmit}>
        <CrewInputField
          className="complaint-text-area"
          labelVariant={'body1'}
          label={'Genera Setting'}
          type={'input'}
          placeholder={'Type note'}
          value={_formData.jsonData}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              jsonData: value,
            }))
          }
          radius={8}
          fullWidth
          multiline
          rows={5}
        />
        <Grid container>
          <Grid item>
            {apiErrors && apiErrors.errors.length > 0 && (
              <Stack>
                <CrewTypography className={getErrorClass(apiErrors.title.toLowerCase())}>
                  {apiErrors?.title}
                </CrewTypography>
                <ul>
                  {apiErrors?.errors.map((errorItem, index) => (
                    <li key={index} className={getErrorClass(apiErrors.title.toLowerCase())}>
                      <CrewTypography className={getErrorClass(apiErrors.title.toLowerCase())} variant="body2">
                        {`${errorItem.propertyName}: ${errorItem.errorMessage}`}
                      </CrewTypography>
                    </li>
                  ))}
                </ul>
              </Stack>
            )}
          </Grid>
        </Grid>
        <Grid mt={2} container px={1}>
          <Grid item xl={3} lg={4} md={4} sm={6} xs={12}>
            <CrewButton loading={btnLoading} type="submit" fullWidth variant="contained" radius={10}>
              Submit
            </CrewButton>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

export default GeneralSection;
