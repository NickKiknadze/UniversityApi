import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService } from '../../api/auth';
import { studentsService } from '../../api/students';
import { lecturersService } from '../../api/lecturers';
import { coursesService } from '../../api/courses';
import { facultiesService } from '../../api/faculties';
import { UserPlus, Check } from 'lucide-react';

type UserRole = 'None' | 'Student' | 'Lecturer';

export const AdminUserRegistration: React.FC = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        age: 18,
        facultyId: 0,
    });
    const [selectedRole, setSelectedRole] = useState<UserRole>('None');
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { data: faculties } = useQuery({
        queryKey: ['faculties'],
        queryFn: () => facultiesService.getAll(),
    });

    const { data: courses } = useQuery({
        queryKey: ['courses'],
        queryFn: () => coursesService.getAll(),
    });

    const registerMutation = useMutation({
        mutationFn: async (data: typeof formData & { role: UserRole; courseIds: number[] }) => {
            const userResponse = await authService.register({
                userName: data.userName,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                age: data.age,
                facultyId: data.facultyId,
            });

            const tokenStr = userResponse.accessToken;
            const payload = JSON.parse(atob(tokenStr.split('.')[1]));
            const userId = parseInt(payload["/identity/claims/sid"]);

            if (data.role === 'Student') {
                await studentsService.create({
                    userId: userId,
                    courseIds: data.courseIds,
                });
            } else if (data.role === 'Lecturer') {
                await lecturersService.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    age: data.age,
                    userId: userId,
                    courseIds: data.courseIds,
                });
            }

            return userResponse;
        },
        onSuccess: () => {
            setSuccess('User registered successfully!');
            setError('');
            setFormData({
                userName: '',
                password: '',
                firstName: '',
                lastName: '',
                age: 18,
                facultyId: 0,
            });
            setSelectedRole('None');
            setSelectedCourses([]);
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['students'] });
            queryClient.invalidateQueries({ queryKey: ['lecturers'] });
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || 'Registration failed');
            setSuccess('');
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.facultyId === 0) {
            setError('Please select a faculty');
            return;
        }

        if ((selectedRole === 'Student' || selectedRole === 'Lecturer') && selectedCourses.length === 0) {
            setError(`Please select at least one course for the ${selectedRole.toLowerCase()}`);
            return;
        }

        registerMutation.mutate({
            ...formData,
            role: selectedRole,
            courseIds: selectedCourses,
        });
    };

    const toggleCourse = (id: number) => {
        if (selectedCourses.includes(id)) {
            setSelectedCourses(selectedCourses.filter(c => c !== id));
        } else {
            setSelectedCourses([...selectedCourses, id]);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center mb-6">
                <UserPlus className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-2xl font-bold text-gray-800">Register New User</h1>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md text-green-700">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">User Account</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                value={formData.userName}
                                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                                minLength={6}
                            />
                        </div>
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
                                min={1}
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
                                <option value={0}>Select a faculty...</option>
                                {faculties?.data?.map((faculty: any) => (
                                    <option key={faculty.id} value={faculty.id}>
                                        {faculty.facultyName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-b pb-4">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">User Role</h2>
                    <div className="flex space-x-4">
                        {(['None', 'Student', 'Lecturer'] as UserRole[]).map((role) => (
                            <label key={role} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value={role}
                                    checked={selectedRole === role}
                                    onChange={(e) => {
                                        setSelectedRole(e.target.value as UserRole);
                                        setSelectedCourses([]);
                                    }}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">{role}</span>
                            </label>
                        ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Select "Student" or "Lecturer" to create a profile with course assignments
                    </p>
                </div>

                {(selectedRole === 'Student' || selectedRole === 'Lecturer') && (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            {selectedRole === 'Student' ? 'Enroll in Courses' : 'Assign Courses'}
                        </h2>
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
                                    <span>{course.courseName}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {registerMutation.isPending ? 'Registering...' : 'Register User'}
                    </button>
                </div>
            </form>
        </div>
    );
};
