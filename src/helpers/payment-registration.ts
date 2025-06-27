import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '@/utils/api';

const API_URL = '/api/registration/payment';

export const CreatePaymentRegistration = async (toCreate: any): Promise<any> => {
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
