import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '../utils/api';

const API_URL = '/api/out-pass';

export const getAlloutPassByHosteliteId = async (): Promise<any> => {
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

export const getAllOutPassByHostelId = async (hostelId: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/${hostelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const createOutPassData = async (toCreate: any): Promise<any> => {
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

export const updateOutPassData = async (toUpdate: any): Promise<any> => {
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

export const deleteOutPassById = async (toDeleteId: string): Promise<any> => {
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

// Get Out-Pass  Details by Hostelite ID
export const getOutPassDetailsByHosteliteId = async (id: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/parent-approve-out-pass/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

// Approve OutPass Details By Parent
export const ApproveOutPassFromParent = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/parent-approve-out-pass`, {
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

// Approve outpass Details By Warden
export const ApproveLeaveFromWarden = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/warden-approve-out-pass`, {
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
