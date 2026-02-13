import api from './axios';
import { type FacultyGetDto, type FacultyPostDto, type FacultyPutDto, type ApiResponse, type GetDtoWithCount } from '../types';

export const facultiesService = {
    getAll: async (filter?: any) => {
        const response = await api.get<ApiResponse<GetDtoWithCount<FacultyGetDto[]>>>('/Faculty', { params: filter });
        return response.data.data!;
    },
    create: async (data: FacultyPostDto) => {
        const response = await api.post<ApiResponse<FacultyGetDto>>('/Faculty', data);
        return response.data.data!;
    },
    update: async (data: FacultyPutDto) => {
        const response = await api.put<ApiResponse<boolean>>('/Faculty', data);
        return response.data.data!;
    },
    delete: async (id: number) => {
        const response = await api.delete<ApiResponse<boolean>>(`/Faculty?facultyId=${id}`);
        return response.data.data!;
    },
};
