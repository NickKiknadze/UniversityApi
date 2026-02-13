import api from './axios';
import { type AuthModel, type AuthTokenResponse } from '../types';

export const authService = {
    login: async (credentials: AuthModel): Promise<AuthTokenResponse> => {
        const response = await api.post<AuthTokenResponse>('/Auth/login', credentials);
        return response.data;
    },
    register: async (data: any): Promise<AuthTokenResponse> => {
        const response = await api.post<AuthTokenResponse>('/Auth/register', data);
        return response.data;
    },
};
