import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { coursesService } from '../../api/courses';
import { facultiesService } from '../../api/faculties';
import { lecturersService } from '../../api/lecturers';
import { X, Check } from 'lucide-react';

interface CourseFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export const CourseForm: React.FC<CourseFormProps> = ({ isOpen, onClose, initialData }) => {
    const queryClient = useQueryClient();
    const [name, setName] = useState('');
    const [selectedFaculties, setSelectedFaculties] = useState<number[]>([]);
    const [selectedLecturers, setSelectedLecturers] = useState<number[]>([]);

    // Fetch options
    const { data: faculties } = useQuery({
        queryKey: ['faculties'],
        queryFn: () => facultiesService.getAll(),
    });

    const { data: lecturers } = useQuery({
        queryKey: ['lecturers'],
        queryFn: () => lecturersService.getAll(),
    });

    useEffect(() => {
        if (initialData) {
            setName(initialData.courseName);
            setSelectedFaculties(initialData.faculties?.map((f: any) => f.id) || []);
            setSelectedLecturers(initialData.lecturers?.map((l: any) => l.id) || []);
        } else {
            setName('');
            setSelectedFaculties([]);
            setSelectedLecturers([]);
        }
    }, [initialData]);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                ...data,
                facultyIds: selectedFaculties,
                lecturerIds: selectedLecturers,
            };
            if (initialData) {
                await coursesService.update({ ...initialData, ...payload, courseName: data.courseName });
            } else {
                await coursesService.create(payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            onClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ courseName: name });
    };

    const toggleSelection = (id: number, currentList: number[], setList: (ids: number[]) => void) => {
        if (currentList.includes(id)) {
            setList(currentList.filter(item => item !== id));
        } else {
            setList([...currentList, id]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{initialData ? 'Edit Course' : 'Add Course'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Faculties</label>
                            <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto p-2">
                                {faculties?.items?.map((faculty: any) => (
                                    <div
                                        key={faculty.id}
                                        className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleSelection(faculty.id, selectedFaculties, setSelectedFaculties)}
                                    >
                                        <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${selectedFaculties.includes(faculty.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                            {selectedFaculties.includes(faculty.id) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span>{faculty.facultyName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Lecturers</label>
                            <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto p-2">
                                {lecturers?.items?.map((lecturer: any) => (
                                    <div
                                        key={lecturer.id}
                                        className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleSelection(lecturer.id, selectedLecturers, setSelectedLecturers)}
                                    >
                                        <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${selectedLecturers.includes(lecturer.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                            {selectedLecturers.includes(lecturer.id) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span>{lecturer.name} {lecturer.surName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {mutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
