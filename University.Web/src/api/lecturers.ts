import api from './axios';
import { type LecturerGetDto, type LecturerPostDto, type LecturerPutDto } from '../types';

// Controller returns "ActionResult" for Get (might be void or wrapped? Checking controller code...)
// Controller: public async Task<ActionResult> GetLecturersAsync... return Ok(await ...Get...)
// Service likely returns GetDtoWithCount<LecturerGetDto> based on pattern.

interface GetDtoWithCount<T> {
    items: T[];
    totalCount: number;
}

export const lecturersService = {
    getAll: async (filter?: any) => {
        const response = await api.get<GetDtoWithCount<LecturerGetDto>>('/Management/Lecturers', { params: filter });
        return response.data;
    },
    create: async (data: LecturerPostDto) => {
        const response = await api.post<LecturerGetDto>('/Management/Lecturers', data);
        return response.data;
    },
    update: async (data: LecturerPutDto) => {
        const response = await api.put<boolean>('/Management/Lecturers', data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete<boolean>(`/Management/Lecturers?lecturerId=${id}`);
        return response.data;
    },
};
