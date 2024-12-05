import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  withCredentials: true, // Include cookies (__auth)
});

// Utility to get the token
const getAuthToken = () => localStorage.getItem('authToken');

// Utility to set the token
const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Refresh-related state
let isRefreshing = false;
let requestQueue: ((token: string) => void)[] = [];

// Function to process the queue
const processQueue = (token: string | null, error: Error | null) => {
  requestQueue.forEach((callback) => {
    if (token) {
      callback(token);
    } else {
      callback('');
    }
  });
  requestQueue = [];
};

// Add a request interceptor to include the token
axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 and not a retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue the request
        return new Promise((resolve, reject) => {
          requestQueue.push((token: string | null) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosClient(originalRequest));
            } else {
              reject(error);
            }
          });
        });
      }

      originalRequest._retry = true; // Mark as a retry
      isRefreshing = true;

      try {
        // Request a new token
        const token = getAuthToken();
        const refreshResponse = await axios.get(
          `${import.meta.env.VITE_API_KEY}/auth/refresh`,
          { withCredentials: true,
            headers:{
                Authorization:`Bearer ${token}`
            }
           }
        );
        console.log(refreshResponse)
        const newToken = refreshResponse.data?.data.access_token;
        console.log(newToken)

        // Save the new token
        setAuthToken(newToken);

        // Update queued requests with the new token
        processQueue(newToken, null);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh failure
        setAuthToken(null); // Clear the token
        processQueue(null, refreshError); // Reject all queued requests
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError); // Reject the original request
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors, reject as usual
    return Promise.reject(error);
  }
);

export default axiosClient;
