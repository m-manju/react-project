import axios from "./axios";

export const get = async (url: string, authToken?: string) => {
  try {
    const response = await axios.get(`${url}`);
    return response.data;
  } catch (error) {
    console.error('GET Request Failed:', error);
    throw error;
  }
};

export const post = async (url: string, data: any, adminToken?: string) => {
  try {
    const response = await axios.post(`${url}`, data);
    return response.data;
  } catch (error) {
    console.error('POST Request Failed:', error);
    throw error;
  }
};

export const remove = async (url: string, adminToken?: string) => {
  try {
    const response = await axios.delete(`${url}`);
    return response.data;
  } catch (error) {
    console.error('DELETE Request Failed:', error);
    throw error;
  }
};