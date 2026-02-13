import axios from './axios';
import type { ApiResponse, Grade, GetDtoWithCount } from '../types';

export interface GradePostDto {
    assignmentId: number;
    userId: number;
    points: number;
    feedback?: string;
}

export interface GradeGetFilter {
    assignmentId?: number;
    userId?: number;
    offset?: number;
    limit?: number;
}

const gradesService = {
    getAll: async (filter: GradeGetFilter): Promise<ApiResponse<GetDtoWithCount<Grade[]>>> => {
        const response = await axios.get<ApiResponse<GetDtoWithCount<Grade[]>>>('/Grades', { params: filter });
        return response.data;
    },

    createOrUpdate: async (grade: GradePostDto): Promise<void> => {
        await axios.post('/Grades', grade);
    },
};

export default gradesService;
