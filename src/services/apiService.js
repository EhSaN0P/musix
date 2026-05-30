// src/services/apiService.js
import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor برای مدیریت خطاها
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'خطایی رخ داده است';

        // می‌تونی اینجا toast یا notification اضافه کنی
        console.error('API Error:', errorMessage);

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

export default apiService;
