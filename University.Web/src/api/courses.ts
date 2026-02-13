import api from './axios';
import { type CourseGetDto, type CoursePostDto, type CoursePutDto, type ApiResponse, type GetDtoWithCount } from '../types';

export const coursesService = {
    getAll: async (filter?: any) => {
        const response = await api.get<ApiResponse<GetDtoWithCount<CourseGetDto[]>>>('/Course', { params: filter });
        return response.data.data!;
    },
    create: async (data: CoursePostDto) => {
        const response = await api.post<ApiResponse<CourseGetDto>>('/Course', data);
        return response.data.data;
    },
    update: async (data: CoursePutDto) => {
        const response = await api.put<ApiResponse<CourseGetDto>>('/Course', data);
        return response.data.data;
    },
    delete: async (id: number) => {
        const response = await api.delete<ApiResponse<boolean>>(`/Course?courseId=${id}`);
        return response.data;
    },
};
