import axios from 'axios';

const getResponseData = (statusCode: number, data: any) => {
  return new Response(JSON.stringify(data), {
    status: statusCode,
  });
};

export const handleApiMethod = async (
  method: string,
  baseUrl: string,
  endpointPath: string,
  headers: any,
  data?: any,
) => {
  const apiEndPoint = `${baseUrl}${endpointPath}`;
  let response: any;
  try {
    switch (method) {
      case 'GET':
        response = await axios.get(`${apiEndPoint}`, {
          headers,
        });
        break;
      case 'DELETE':
        response = await axios.delete(`${apiEndPoint}`, {
          data: data,
          headers,
        });
        break;
      case 'POST':
        response = await axios.post(`${apiEndPoint}`, data, {
          headers,
        });
        break;
      case 'PUT':
        response = await axios.put(`${apiEndPoint}`, data, {
          headers,
        });
        break;
      case 'PATCH':
        response = await axios.patch(`${apiEndPoint}`, data, {
          headers,
        });
        break;
      default:
        response = await axios.get(`${apiEndPoint}`, {
          headers,
        });
        break;
    }
    if (response && response.status === 200) {
      return getResponseData(200, response?.data);
    } else if (response.status == 204) {
      return Response.json({ status: response.status, data: 'success' });
    } else {
      return getResponseData(500, response?.data);
    }
  } catch (error: any) {
    switch (error?.response?.status) {
      case 400:
        return getResponseData(400, error?.response?.data);
        break;
      case 401:
        return getResponseData(401, error?.response?.data);
        break;
      case 403:
        return getResponseData(403, error?.response?.data);
        break;
      case 404:
        return getResponseData(404, error?.response?.data);
        break;
      default:
        return getResponseData(500, error);
        break;
    }
  }
};

export const handleApiResponse = (response: any) => {
  if ((response.status >= 200 && response.status < 300) || response.status === 'Success') {
    // Success
    return handleSuccess(response.data);
  } else {
    // Failure
    return handleFailure(response.status, response);
  }
};

const handleSuccess = (data: any) => {
  //success handling logic here
  return { success: true, type: 'Success', title: 'Request successful', status: 200, data };
};

const handleFailure = (status: number, res: any) => {
  // error handling logic based on status code

  switch (status) {
    case 400:
      console.error('Bad Request:', res);
      return {
        success: false,
        type: 'Bad Request',
        title: 'Invalid request',
        status,
        detail: res || 'Bad request.',
      };
      break;
    case 401:
      console.error('Unauthorized:', res);
      return {
        success: false,
        type: 'Unauthorized',
        title: 'Authentication failed',
        status,
        detail: res || 'Unauthorized access.',
      };
      break;
    case 403:
      console.error('Forbidden:', res);
      return {
        success: false,
        type: 'Forbidden',
        title: 'Access forbidden',
        status,
        detail: res || 'Access forbidden.',
      };
      break;
    case 404:
      console.error('Not Found:', res);
      return {
        success: false,
        type: 'Not Found',
        title: 'Resource not found',
        status,
        detail: res?.detail || 'Resource not found.',
      };
      break;
    case 409:
      return {
        success: false,
        type: 'Already Exists',
        title: 'Resource already exists',
        status,
        detail: res?.detail || 'Conflict occurred.',
      };
      break;
    case 500:
      console.error('Internal Server Error:', res);
      return {
        success: false,
        type: 'Internal Server Error',
        title: 'Something went wrong',
        status,
        detail: res || 'Internal server error.',
      };
      break;
    // Add more cases as needed
    default:
      console.error(`Unhandled Status Code: ${status}`, res);
      return {
        success: false,
        type: 'Unknown Error',
        title: 'Unknown error',
        status,
        detail: res || 'Unknown error occurred.',
      };
      break;
  }

  return { success: false, status, res };
};
