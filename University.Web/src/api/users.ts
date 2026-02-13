import api from './axios';
import { type UserGetDto, type UserPostDto, type UserPutDto } from '../types';

interface GetDtoWithCount<T> {
    items: T[];
    totalCount: number;
}

export const usersService = {
    getAll: async (filter?: any) => {
        const response = await api.get<GetDtoWithCount<UserGetDto>>('/Management/Users', { params: filter });
        return response.data;
    },
    create: async (data: UserPostDto) => {
        const response = await api.post<UserGetDto>('/Management/Users', data);
        return response.data;
    },
    update: async (data: UserPutDto) => {
        const response = await api.put<boolean>('/Management/Users', data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete<boolean>(`/Management/Users?userId=${id}`);
        return response.data;
    },
};
