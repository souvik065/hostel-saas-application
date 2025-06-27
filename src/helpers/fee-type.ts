import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '../utils/api';

const API_URL = '/api/settings/fee-type';

export const getFeeTypeDetailsByHostelId = async (id: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const createFeeType = async (toCreate: any): Promise<any> => {
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

export const updateFeeType = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(toUpdate), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const deleteFeeTypeDataById = async (id: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ id: id }), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};
