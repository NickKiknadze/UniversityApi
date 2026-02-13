import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../../api/users';
import { facultiesService } from '../../api/faculties';
import { coursesService } from '../../api/courses';
import fileService from '../../api/files';
import { UserType } from '../../types';
import { X, Check, Upload, User as UserIcon } from 'lucide-react';

interface UserFormProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
}

export const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, initialData }) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<{
        username: string;
        firstName: string;
        lastName: string;
        age: number;
        password?: string;
        facultyId: number;
        userType: UserType;
    }>({
        username: '',
        firstName: '',
        lastName: '',
        age: 18,
        password: '',
        facultyId: 0,
        userType: UserType.Student,
    });
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [selectedLecturers, setSelectedLecturers] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const { data: faculties } = useQuery({ queryKey: ['faculties'], queryFn: () => facultiesService.getAll() });
    const { data: courses } = useQuery({ queryKey: ['courses'], queryFn: () => coursesService.getAll() });
    const { data: lecturers } = useQuery({
        queryKey: ['users', 'lecturers'],
        queryFn: () => usersService.getAll({ UserType: UserType.Lecturer }),
        enabled: formData.userType === UserType.Student
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                username: initialData.userName || '',
                firstName: initialData.firstName,
                lastName: initialData.lastName,
                age: initialData.age,
                password: '',
                facultyId: initialData.faculty?.id || 0,
                userType: initialData.userType ?? UserType.Student,
            });
            setSelectedCourses(initialData.courses?.map((c: { id: number }) => c.id) || []);
            setSelectedLecturers(initialData.lecturers?.map((l: { id: number }) => l.id) || []);
            setPreviewUrl(initialData.profilePictureUrl ? `${import.meta.env.VITE_API_URL}${initialData.profilePictureUrl}` : null);
        } else {
            setFormData({
                username: '',
                firstName: '',
                lastName: '',
                age: 18,
                password: '',
                facultyId: 0,
                userType: UserType.Student,
            });
            setSelectedCourses([]);
            setSelectedLecturers([]);
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            let profilePictureUrl = initialData?.profilePictureUrl;

            if (selectedFile) {
                try {
                    const uploadResponse = await fileService.upload(selectedFile);
                    if (uploadResponse.success && uploadResponse.data) {
                        profilePictureUrl = uploadResponse.data;
                    }
                } catch (error) {
                    console.error("File upload failed", error);
                    alert("File upload failed, but saving user data...");
                }
            }

            const payload: any = {
                ...data,
                courseIds: selectedCourses,
                lecturerIds: formData.userType === UserType.Student ? selectedLecturers : undefined,
                profilePictureUrl
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

    const toggleLecturer = (id: number) => {
        if (selectedLecturers.includes(id)) {
            setSelectedLecturers(selectedLecturers.filter(l => l !== id));
        } else {
            setSelectedLecturers([...selectedLecturers, id]);
        }
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">{initialData ? 'Edit User' : 'Add User'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Profile Picture Upload */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 text-white">
                                <Upload className="w-4 h-4" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>

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
                                {faculties?.data?.map((f: any) => (
                                    <option key={f.id} value={f.id}>{f.facultyName}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">User Role</label>
                            <select
                                value={formData.userType}
                                onChange={(e) => setFormData({ ...formData, userType: Number(e.target.value) as UserType })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                disabled={!!initialData}
                            >
                                <option value={UserType.Student}>Student</option>
                                <option value={UserType.Lecturer}>Lecturer</option>
                                <option value={UserType.Admin}>Admin</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Assign Courses</label>
                            <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto p-2">
                                {courses?.data?.map((course: any) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleCourse(course.id)}
                                    >
                                        <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${selectedCourses.includes(course.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                            {selectedCourses.includes(course.id) && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-sm">{course.courseName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {formData.userType === UserType.Student && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Assign Lecturers</label>
                                <div className="border border-gray-300 rounded-md max-h-48 overflow-y-auto p-2">
                                    {lecturers?.data?.map((lecturer: any) => (
                                        <div
                                            key={lecturer.id}
                                            className="flex items-center p-2 hover:bg-gray-50 cursor-pointer"
                                            onClick={() => toggleLecturer(lecturer.id)}
                                        >
                                            <div className={`w-4 h-4 mr-3 border rounded flex items-center justify-center ${selectedLecturers.includes(lecturer.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                                                {selectedLecturers.includes(lecturer.id) && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            <span className="text-sm">{lecturer.firstName} {lecturer.lastName}</span>
                                        </div>
                                    ))}
                                    {(!lecturers?.data || lecturers.data.length === 0) && (
                                        <div className="text-center py-4 text-xs text-gray-400">No lecturers available</div>
                                    )}
                                </div>
                            </div>
                        )}
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
