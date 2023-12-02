import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const createHeaders = (adminToken?: string) => {
  const token = localStorage.getItem('token');
  const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;
  return {
    headers: { Authorization: authToken },
  };
};

export const get = async (url: string, authToken?: string) => {
  try {
    const response = await axios.get(`${baseURL}${url}`, createHeaders(authToken));
    console.log('GET Request Successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('GET Request Failed:', error);
    throw error;
  }
};

export const post = async (url: string, data: any, adminToken?: string) => {
  try {
    const response = await axios.post(`${baseURL}${url}`, data, createHeaders(adminToken));
    console.log('POST Request Successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('POST Request Failed:', error);
    throw error;
  }
};

export const remove = async (url: string, adminToken?: string) => {
  try {
    const response = await axios.delete(`${baseURL}${url}`, createHeaders(adminToken));
    console.log('DELETE Request Successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('DELETE Request Failed:', error);
    throw error;
  }
};