import api from './axios';
import { type LecturerGetDto, type LecturerPostDto, type LecturerPutDto, type ApiResponse, type GetDtoWithCount } from '../types';

export const lecturersService = {
    getAll: async (filter?: any) => {
        const response = await api.get<ApiResponse<GetDtoWithCount<LecturerGetDto[]>>>('/Management/Lecturers', { params: filter });
        return response.data.data!;
    },
    create: async (data: LecturerPostDto) => {
        const response = await api.post<ApiResponse<LecturerGetDto>>('/Management/Lecturers', data);
        return response.data.data!;
    },
    update: async (data: LecturerPutDto) => {
        const response = await api.put<ApiResponse<boolean>>('/Management/Lecturers', data);
        return response.data.data!;
    },
    delete: async (id: number) => {
        const response = await api.delete<ApiResponse<boolean>>(`/Management/Lecturers?lecturerId=${id}`);
        return response.data.data!;
    },
};
