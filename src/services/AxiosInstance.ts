import type { ApiResponse } from '@/schema/api';
import axios from 'axios'
import { getCookie, removeCookie } from '@/lib/cookies';

// define axiosInstance reuse for all api
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/crm-system/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor grant token if request authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//
axiosInstance.interceptors.response.use(
  (response) => {
    const apiResponse = response.data as ApiResponse<any>

    const isSuccess = apiResponse.code >= 200 && apiResponse.code < 300

    if (isSuccess) {
      return apiResponse.data
    } else {
      return Promise.reject({
        isApiError: true,
        code: apiResponse.code,
        message: apiResponse.message,
      })
    }
  },

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.warn('Unauthorized! Redirecting to login...')
          removeCookie('access_token')
          localStorage.removeItem('user')
          break
      }
    }

    const errorResponse = {
      isApiError: true,
      code: error.response?.status || 500,
      message:
        error.response?.data?.message || error.message || 'Đã có lỗi xảy ra.',
    }
    return Promise.reject(errorResponse)
  }
)
export default axiosInstance