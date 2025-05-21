import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Important for cookies/session
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    // Debug logging
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      withCredentials: config.withCredentials,
      data: config.data
    });

    // Get CSRF token from cookie if it exists
    const token = Cookies.get('XSRF-TOKEN');
    console.log('CSRF Token:', token);
    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }

    // Add auth token if it exists
    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken ? 'exists' : 'missing');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    // Log final headers
    console.log('Final Request Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response Success:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.log('Response Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });

    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('Handling 401 error - redirecting to login');
      originalRequest._retry = true;
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 419 CSRF token mismatch
    if (error.response?.status === 419) {
      try {
        // Get new CSRF token
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/sanctum/csrf-cookie`, {
          credentials: 'include',
        });
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    // Handle validation errors
    if (error.response?.status === 422) {
      const errors = error.response.data.errors;
      const errorMessage = Object.values(errors)
        .flat()
        .join('\n');
      error.message = errorMessage;
    }

    return Promise.reject(error);
  }
);

export default apiClient; 