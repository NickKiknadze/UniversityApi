import api from './axios';
import { type AuthModel, type AuthTokenResponse } from '../types';

export const authService = {
    login: async (credentials: AuthModel): Promise<AuthTokenResponse> => {
        const response = await api.post<AuthTokenResponse>('/Auth/login', credentials);
        return response.data;
    },
};
