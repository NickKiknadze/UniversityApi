import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../../api/users';
import { facultiesService } from '../../api/faculties';
import { coursesService } from '../../api/courses';
import { X, Check } from 'lucide-react';

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, initialData }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        age: 0,
        password: '',
        facultyId: 0,
    });
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const { data: faculties } = useQuery({ queryKey: ['faculties'], queryFn: () => facultiesService.getAll() });
    const { data: courses } = useQuery({ queryKey: ['courses'], queryFn: () => coursesService.getAll() });

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.userName || '',
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                age: initialData.age,
                password: '',
                facultyId: initialData.faculty?.id || 0,
            });
            setSelectedCourses(initialData.courses?.map((c: any) => c.id) || []);
        } else {
            setFormData({
                username: '',
                firstName: '',
                lastName: '',
                age: 18,
                password: '',
                facultyId: 0,
            });
            setSelectedCourses([]);
        }
    }, [initialData]);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const payload = {
                ...data,
                courseIds: selectedCourses,
            };
            if (initialData) {
                await usersService.update({ ...initialData, ...payload, id: initialData.id });
            } else {
                await usersService.create(payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    const toggleCourse = (id: number) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(selectedCourses.filter(c => c !== id));
        } else {
            setSelectedCourses([...selectedCourses, id]);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{initialData ? 'Edit Student' : 'Add Student'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {!initialData && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required={!initialData}
                                />
                            </div>
                        )}
                        {!initialData && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    required={!initialData}
                                />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Faculty</label>
                            <select
                                value={formData.facultyId}
                                onChange={(e) => setFormData({ ...formData, facultyId: Number(e.target.value) })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value={0}>Select Faculty</option>
                                {faculties?.items?.map((f: any) => (
                                    <option key={f.id} value={f.id}>{f.facultyName}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Assign Courses</label>
                        <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto p-2">
                            {courses?.map((course: any) => (
                                <div
                                    key={course.id}
                                    className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                    onClick={() => toggleCourse(course.id)}
                                >
                                    <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${selectedCourses.includes(course.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                        {selectedCourses.includes(course.id) && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <span>{course.courseName}</span>
                                </div>
                            ))}
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
