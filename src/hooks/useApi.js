// src/hooks/useApi.js
import { useQuery, useMutation } from '@tanstack/react-query';
import apiService from '../services/apiService';

// برای GET requests
export const useApiQuery = (key, url, params = {}, options = {}) => {
    return useQuery({
        queryKey: Array.isArray(key) ? key : [key],
        queryFn: async () => {
            const response = await apiService.get(url, { params });
            return response.data;
        },
        ...options,
    });
};

// برای POST, PUT, DELETE requests
export const useApiMutation = (method = 'post', url, options = {}) => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await apiService[method](url, data);
            return response.data;
        },
        ...options,
    });
};
