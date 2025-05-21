import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const API_ENDPOINTS = {
  books: `${API_BASE_URL}/books`,
  users: `${API_BASE_URL}/users`,
  login: `${API_BASE_URL}/login`,
  students: `${API_BASE_URL}/students`,
  borrower: `${API_BASE_URL}/borrower`,
} as const;

export { API_ENDPOINTS, API_BASE_URL };

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // For cookies/Sanctum
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request details (dev only)
    if (process.env.NODE_ENV === 'development') {
      console.log('→ Request:', config.method?.toUpperCase(), config.url);
      console.log('Headers:', config.headers);
      if (config.data) console.log('Data:', config.data);
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('← Response:', response.status, response.config.url);
      console.log('Data:', response.data);
    }
    return response;
  },
  (error) => {
    // Enhanced error handling
    if (error.response) {
      console.error('API Error:', {
        Status: error.response.status,
        Message: error.response.data?.message || 'No error message',
        URL: error.config.url,
        Data: error.response.data
      });

      // Auto-logout on 401 Unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        window.location.href = '/login'; // Redirect to login
      }
    } else {
      console.error('Network Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axios;