import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';

const API_URL = '/api/facilities';

export const getAllFacilities = async (): Promise<any> => {
  const session = await getSession();
  try {
    const response = await fetchRetry(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch facilities data');
    }
  } catch (error) {
    throw error;
  }
};

export const createFacilityData = async (toCreate: any): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(toCreate), // Make sure to stringify your data
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
      throw new Error('Failed to create facility data');
    }
  } catch (error) {
    throw error;
  }
};

export const updateFacilityData = async (toUpdate: any): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(toUpdate), // Make sure to stringify your data
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
      throw new Error('Failed to update facility data');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteFacilityDataById = async (toDeleteId: string): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({ id: toDeleteId }), // Make sure to stringify your data
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
      throw new Error('Failed to delete facility data');
    }
  } catch (error) {
    throw error;
  }
};
