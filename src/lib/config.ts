import axios from 'axios';

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const API_ENDPOINTS = {
  books: `${API_BASE_URL}/books`,
  users: `${API_BASE_URL}/users`,
  login: `${API_BASE_URL}/login`,
};

// Configure axios defaults
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('Request data:', config.data);
    console.log('Request headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axios.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    // Direct logging of error properties
    console.log('Error type:', typeof error);
    console.log('Error keys:', Object.keys(error));
    console.log('Error response exists:', !!error.response);
    console.log('Error response type:', error.response ? typeof error.response : 'none');
    console.log('Error response keys:', error.response ? Object.keys(error.response) : 'none');
    
    // Basic error logging
    if (error.response) {
      console.error('Response error - Status:', error.response.status);
      console.error('Response error - Data:', error.response.data);
      console.error('Response error - URL:', error.config?.url);
    } else if (error.request) {
      console.error('Request error - No response received');
      console.error('Request error - URL:', error.config?.url);
    } else {
      console.error('Error message:', error.message);
    }

    return Promise.reject(error);
  }
); 