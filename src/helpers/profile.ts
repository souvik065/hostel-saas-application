import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '../utils/api';

const WARDEN_URL = '/api/warden';
const API_URL_WARDEN = '/api/warden/warden-detail';
const API_URL_PARENT = '/api/registration/parent';
const API_URL_HOSTLITE = '/api/registration/hostelite';

export const getWardenProfileDetailById = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL_WARDEN}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const getParentProfileDetailById = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL_PARENT}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const getHosteliteProfileDetailById = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL_HOSTLITE}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const updateWardenData = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(WARDEN_URL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(toUpdate), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const updateParentData = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL_PARENT, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(toUpdate), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const updateHosteliteData = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL_HOSTLITE, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify(toUpdate), // Make sure to stringify your data
  });
  const res = await response.json();
  return await handleApiResponse(res);
};
