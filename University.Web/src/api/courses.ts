import api from './axios';
import { type CourseGetDto, type CoursePostDto, type CoursePutDto } from '../types';

export const coursesService = {
    getAll: async (filter?: any) => {
        const response = await api.get<CourseGetDto[]>('/Course', { params: filter });
        return response.data;
    },
    create: async (data: CoursePostDto) => {
        const response = await api.post<CourseGetDto>('/Course', data);
        return response.data;
    },
    update: async (data: CoursePutDto) => {
        const response = await api.put<CourseGetDto>('/Course', data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete<boolean>(`/Course?courseId=${id}`);
        return response.data;
    },
};
