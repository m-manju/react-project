// import axios from 'axios';

// const baseURL = process.env.REACT_APP_API_BASE_URL;

// const createHeaders = (adminToken?: string) => {
//   const token = localStorage.getItem('token');
//   const authToken = adminToken ? `Bearer ${adminToken}` : `Bearer ${token}`;
//   return {
//     headers: { Authorization: authToken },
//   };
// };
// export const get = async (url: string, authToken?: string) => {
//   try {
//     const response = await axios.get(`${baseURL}${url}`, createHeaders(authToken));
//     return response.data;
//   } catch (error) {
//     console.error('GET Request Failed:', error);
//     throw error;
//   }
// };

// export const post = async (url: string, data: any, adminToken?: string) => {
//   try {
//     const response = await axios.post(`${baseURL}${url}`, data, createHeaders(adminToken));
//     return response.data;
//   } catch (error) {
//     console.error('POST Request Failed:', error);
//     throw error;
//   }
// };

// export const remove = async (url: string, adminToken?: string) => {
//   try {
//     const response = await axios.delete(`${baseURL}${url}`, createHeaders(adminToken));
//     return response.data;
//   } catch (error) {
//     console.error('DELETE Request Failed:', error);
//     throw error;
//   }
// };

import axios from "./axiosInstance";


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