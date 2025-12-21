import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    // interceptor to add JWT token
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('jwt_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Token expired 
          localStorage.removeItem('jwt_token');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );

    return () => {
        axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;