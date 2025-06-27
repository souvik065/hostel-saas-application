import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '@/utils/api';

const API_URL_PLAN_TYPE = '/api/settings/plan-type';
const API_URL = '/api/registration/hostelite';

export const getPlanTypesByHostelId = async (id: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL_PLAN_TYPE}?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const CreateHosteliteRegistration = async (toCreate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(toCreate), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};
