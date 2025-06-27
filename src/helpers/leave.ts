import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';
import { handleApiResponse } from '../utils/api';

const API_URL = '/api/leave';
const API_SETTING_LEAVE_URL = '/api/settings-leave';

export const getAllLeavesByHosteliteId = async (): Promise<any> => {
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

export const getAllLeavesByHostelId = async (hostelId: string): Promise<any> => {
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

export const getAllLeaveTypesByHostelId = async (hostelId: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_SETTING_LEAVE_URL}/${hostelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

export const createLeaveData = async (toCreate: any): Promise<any> => {
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

export const updateLeaveData = async (toUpdate: any): Promise<any> => {
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

export const deleteLeaveById = async (toDeleteId: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
    body: JSON.stringify({ id: toDeleteId, remarks: '' }), // Make sure to stringify your data
  });

  const res = await response.json();
  return await handleApiResponse(res);
};

// Get Hostelite Details by Parent ID
export const getHosteliteDetailsByParentId = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/parent-approve-leave`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

// Get Leave Stauts Details
export const getStatusDetails = async (): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

// Get Leave  Details by Hostelite ID
export const getLeaveDetailsByHosteliteId = async (id: string): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/parent-approve-leave/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
    },
  });
  const res = await response.json();
  return await handleApiResponse(res);
};

// Approve Leave Details By Parent
export const ApproveLeaveFromParent = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/parent-approve-leave`, {
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

// Approve Leave Details By Warden
export const ApproveLeaveFromWarden = async (toUpdate: any): Promise<any> => {
  const session = await getSession();
  const response = await fetchRetry(`${API_URL}/warden-approve-leave`, {
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
