import api from './axios';
import { type UserGetDto, type UserPostDto, type UserPutDto, type ApiResponse, type GetDtoWithCount } from '../types';

export const usersService = {
    getAll: async (filter?: any) => {
        const response = await api.get<ApiResponse<GetDtoWithCount<UserGetDto[]>>>('/Management/Users', { params: filter });
        return response.data.data!;
    },
    create: async (data: UserPostDto) => {
        const response = await api.post<ApiResponse<UserGetDto>>('/Management/Users', data);
        return response.data.data!;
    },
    update: async (data: UserPutDto) => {
        const response = await api.put<ApiResponse<boolean>>('/Management/Users', data);
        return response.data.data!;
    },
    delete: async (id: number) => {
        const response = await api.delete<ApiResponse<boolean>>(`/Management/Users?userId=${id}`);
        return response.data.data!;
    },
};
