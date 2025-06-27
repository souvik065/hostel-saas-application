import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';

const API_URL = '/api/assign-warden';
const API_ALL_WARDEN_ID_NAME = '/api/all-wardenId-and-name';

export const getAllAssignWardenByHostelId = async (id: string): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(`${API_URL}?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch assign warden details of Hostel ${id}`);
    }
  } catch (error) {
    throw error;
  }
};

export const getAllWardens = async (): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(`${API_ALL_WARDEN_ID_NAME}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch warden details`);
    }
  } catch (error) {
    throw error;
  }
};

export const createAssignWarden = async (toCreate: any): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(toCreate), // Make sure to stringify your data
    });

    if (response.ok) {
      return response.json();
    } else if (response.status === 400) {
      return response.json();
    } else if (response.status === 404) {
      let responseJson = await response.json();
      return responseJson;
    } else if (response.status === 500) {
      return response.json();
    } else {
      throw new Error('Failed to create rooms');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteAssignWardenById = async (id: string): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({ id: id }), // Make sure to stringify your data
    });
    if (response.ok) {
      return response.json();
    } else if (response.status === 204) {
      let responseJson = await response.json();
      return responseJson;
    } else if (response.status === 400) {
      return response.json();
    } else if (response.status === 404) {
      let responseJson = await response.json();
      return responseJson;
    } else if (response.status === 500) {
      return response.json();
    } else {
      throw new Error('Failed to delete floor');
    }
  } catch (error) {
    throw error;
  }
};
