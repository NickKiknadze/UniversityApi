import axios from './axios';
import type { ApiResponse, Assignment } from '../types';

export interface AssignmentPostDto {
    title: string;
    description?: string;
    courseId: number;
    maxPoints: number;
    dueDate?: string;
}

export interface AssignmentPutDto extends AssignmentPostDto {
    id: number;
}

export interface AssignmentGetFilter {
    id?: number;
    title?: string;
    courseId?: number;
    offset?: number;
    limit?: number;
}

const assignmentsService = {
    getAll: async (filter: AssignmentGetFilter): Promise<ApiResponse<Assignment[]>> => {
        const response = await axios.get<ApiResponse<Assignment[]>>('/Assignments', { params: filter });
        return response.data;
    },

    getById: async (id: number): Promise<Assignment> => {
        const response = await axios.get<Assignment>(`/Assignments/${id}`);
        return response.data;
    },

    create: async (assignment: AssignmentPostDto): Promise<void> => {
        await axios.post('/Assignments', assignment);
    },

    update: async (assignment: AssignmentPutDto): Promise<void> => {
        await axios.put('/Assignments', assignment);
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`/Assignments/${id}`);
    },
};

export default assignmentsService;
