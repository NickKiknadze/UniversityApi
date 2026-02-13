import axios from './axios';
import type { ApiResponse } from '../types';

const fileService = {
    upload: async (file: File): Promise<ApiResponse<string>> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post<ApiResponse<string>>('/Files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};

export default fileService;
