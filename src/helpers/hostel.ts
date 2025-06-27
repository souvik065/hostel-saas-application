import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '../utils/api';

const API_URL = '/api/hostel';
const API_URL_GET_ALL_HOSTELID_AND_NAME = '/api/all-hostelid-and-name';

export const getAllHostels = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const getAllHostelIdAndName = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL_GET_ALL_HOSTELID_AND_NAME, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const getAllHostelIdAndNameByWarden = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL_GET_ALL_HOSTELID_AND_NAME}/warden`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const createHostelData = async (toCreate: any): Promise<any> => {
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

export const updateHostelData = async (toUpdate: any): Promise<any> => {
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

export const deleteHostelDataById = async (toDeleteId: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ id: toDeleteId }), // Make sure to stringify your data
  });

  const res = await response.json();
  return await handleApiResponse(res);
};
