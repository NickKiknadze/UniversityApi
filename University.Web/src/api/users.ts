import api from './axios';
import { type UserGetDto, type UserPostDto, type UserPutDto, type ApiResponse, type GetDtoWithCount } from '../types';

export const usersService = {
    getAll: async (filter?: any) => {
        const response = await api.get<ApiResponse<GetDtoWithCount<UserGetDto[]>>>('/Users', { params: filter });
        return response.data.data!;
    },
    create: async (data: UserPostDto) => {
        await api.post<ApiResponse<void>>('/Users', data);
    },
    update: async (data: UserPutDto) => {
        await api.put<ApiResponse<void>>('/Users', data);
    },
    delete: async (id: number) => {
        await api.delete<ApiResponse<void>>(`/Users?userId=${id}`);
    },
};
