import axios from './axios';
import type { ApiResponse, ClassSession, ClassSessionPostDto, ClassSessionPutDto, ScheduleGetFilter, GetDtoWithCount } from '../types';

const scheduleService = {
    getAll: async (filter: ScheduleGetFilter): Promise<ApiResponse<GetDtoWithCount<ClassSession[]>>> => {
        const response = await axios.get<ApiResponse<GetDtoWithCount<ClassSession[]>>>('/Schedule', { params: filter });
        return response.data;
    },

    getById: async (id: number): Promise<ApiResponse<ClassSession>> => {
        const response = await axios.get<ApiResponse<ClassSession>>(`/Schedule/${id}`);
        return response.data;
    },

    create: async (session: ClassSessionPostDto): Promise<ApiResponse<boolean>> => {
        const response = await axios.post<ApiResponse<boolean>>('/Schedule', session);
        return response.data;
    },

    update: async (session: ClassSessionPutDto): Promise<ApiResponse<boolean>> => {
        const response = await axios.put<ApiResponse<boolean>>('/Schedule', session);
        return response.data;
    },

    delete: async (id: number): Promise<ApiResponse<boolean>> => {
        const response = await axios.delete<ApiResponse<boolean>>(`/Schedule/${id}`);
        return response.data;
    }
};

export default scheduleService;
