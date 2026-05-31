import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// قبل از ارسال هر درخواست
apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// مدیریت خطاها
apiService.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage =
            error.response?.data?.message ||
            error.message ||
            'خطایی رخ داده است';

        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }

        console.error('API Error:', errorMessage);

        return Promise.reject({
            message: errorMessage,
            status: error.response?.status,
            data: error.response?.data,
        });
    }
);

export default apiService;