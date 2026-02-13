import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lecturersService } from '../../api/lecturers';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { LecturerForm } from './LecturerForm';

export const LecturerList: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLecturer, setSelectedLecturer] = useState<any>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['lecturers', searchTerm],
        queryFn: () => lecturersService.getAll({
            SearchText: searchTerm
        }),
    });

    const deleteMutation = useMutation({
        mutationFn: lecturersService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lecturers'] });
        },
    });

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this lecturer?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleEdit = (lecturer: any) => {
        setSelectedLecturer(lecturer);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedLecturer(null);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lecturers</h1>
                <button
                    onClick={handleCreate}
                    className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Lecturer
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                        type="text"
                        placeholder="Search lecturers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data?.map((lecturer: any) => (
                                <tr key={lecturer.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{lecturer.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lecturer.name} {lecturer.surName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lecturer.age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lecturer.courses?.length || 0}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(lecturer)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(lecturer.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!data?.data || data.data.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No lecturers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <LecturerForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedLecturer}
            />
        </div>
    );
};
