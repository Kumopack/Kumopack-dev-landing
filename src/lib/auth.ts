/**
 * Simple mock auth helper for Kumopack.
 * In a real app, this would use cookies (js-cookie) and a real backend.
 */

export const AUTH_TOKEN_KEY = 'kumopack_auth_token';

export const auth = {
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    },

    clearToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(AUTH_TOKEN_KEY);
    },

    isAuthenticated: (): boolean => {
        const token = auth.getToken();
        if (!token) return false;

        // Mock validation: check if token is "not expired"
        // In this mock, we just check if it exists
        return !!token;
    },

    logout: (): void => {
        auth.clearToken();
        window.location.href = '/';
    }
};
