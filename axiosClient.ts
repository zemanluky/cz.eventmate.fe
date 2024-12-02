import axios from 'axios';

// Initialize Axios instance
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_KEY, // API base URL
    withCredentials: true, // Send cookies with requests
});

// Request interceptor (e.g., attach Authorization header)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        if (error.response?.status === 401) {
            console.log('401 Unauthorized detected. Attempting token refresh...');

            try {
                // Make a request to refresh the token
                const refreshResponse = await axios.get(
                    `${import.meta.env.VITE_API_KEY}/auth/refresh`,
                    { withCredentials: true } // Cookies sent here
                );

                const { access_token } = refreshResponse.data;

                // Save the new token to localStorage
                localStorage.setItem('authToken', access_token);

                console.log('Token refreshed. Retrying failed request...');

                // Retry the original request with the new token
                error.config.headers.Authorization = `Bearer ${access_token}`;
                return axios(error.config); // Re-run the original request
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);

                // Clear localStorage and redirect to login
                localStorage.removeItem('authToken');
                // window.location.href = '/auth'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // Propagate other errors
    }
);

export default axiosClient;