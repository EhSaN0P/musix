// src/services/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2, // تلاش مجدد 2 بار
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
            staleTime: 0,
        },
        mutations: {
            retry: 1,
        },
    },
});
