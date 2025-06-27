import { getSession } from 'next-auth/react';
import { fetchRetry } from './fetchExtension';

const API_URL = '/api/building';

export const getBuidingDetailsByHostelId = async (id: string): Promise<any> => {
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
    } else if (response.status === 400) {
      return response.json();
    } else if (response.status === 404) {
      let responseJson = await response.json();
      return responseJson;
    } else if (response.status === 500) {
      return response.json();
    } else {
      throw new Error('Failed to create hostel');
    }
  } catch (error) {
    throw error;
  }
};

export const createBuilding = async (toCreate: any): Promise<any> => {
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
      throw new Error('Failed to create hostel');
    }
  } catch (error) {
    throw error;
  }
};

export const deleteBuildingDataByHostelId = async (buildingId: string, hostelId: string): Promise<any> => {
  try {
    const session = await getSession();
    const response = await fetchRetry(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({ buildingId: buildingId, hotelId: hostelId }), // Make sure to stringify your data
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
      throw new Error('Failed to create hostel');
    }
  } catch (error) {
    throw error;
  }
};
