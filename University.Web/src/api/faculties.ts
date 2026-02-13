import api from './axios';
import { type FacultyGetDto, type FacultyPostDto, type FacultyPutDto } from '../types';

// The API response for GetFaculties includes a wrapper with count, checking controller...
// "ActionResult<GetDtoWithCount<FacultyGetDto>>"
interface GetDtoWithCount<T> {
    items: T[];
    totalCount: number;
}

export const facultiesService = {
    getAll: async (filter?: any) => {
        const response = await api.get<GetDtoWithCount<FacultyGetDto>>('/Faculty', { params: filter });
        return response.data;
    },
    create: async (data: FacultyPostDto) => {
        const response = await api.post<FacultyGetDto>('/Faculty', data);
        return response.data;
    },
    update: async (data: FacultyPutDto) => {
        const response = await api.put<boolean>('/Faculty', data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete<boolean>(`/Faculty?facultyId=${id}`);
        return response.data;
    },
};
