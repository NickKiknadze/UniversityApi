import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from "jwt-decode";
import { GraduationCap } from 'lucide-react';
import { usersService } from '../api/users';
import { coursesService } from '../api/courses';
import { type UserGetDto } from '../types';

interface DecodedToken {
    "/identity/claims/sid"?: string;
    [key: string]: any;
}

const CourseItem: React.FC<{ course: any }> = ({ course }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`border rounded-xl transition-all duration-200 overflow-hidden ${isExpanded ? 'border-blue-200 ring-4 ring-blue-50' : 'border-gray-100 hover:border-blue-200 hover:shadow-sm'}`}
        >
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left px-5 py-4 flex items-center justify-between group"
            >
                <div>
                    <h3 className={`font-bold text-lg transition-colors ${isExpanded ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'}`}>
                        {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                        {course.users?.length || 0} Students enrolled
                    </p>
                </div>
                <div className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
                    <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {isExpanded && (
                <div className="px-5 pb-5 bg-white border-t border-blue-50">
                    <div className="pt-4">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Enrolled Students</h4>
                        {course.users && course.users.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {course.users.map((student: any) => (
                                    <div key={student.id} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3">
                                            {student.firstName?.[0]}{student.lastName?.[0]}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {student.firstName} {student.lastName}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic">No students enrolled in this course yet.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export const LecturerDashboard: React.FC = () => {
    const { token } = useAuth();
    const [lecturer, setLecturer] = useState<UserGetDto | null>(null);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;

            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const userId = decoded["/identity/claims/sid"];

                if (!userId) {
                    console.error("User ID not found in token");
                    return;
                }

                const usersResponse = await usersService.getAll({ UserId: parseInt(userId) });
                const myLecturer = usersResponse.data[0];

                if (myLecturer) {
                    setLecturer(myLecturer);

                    const coursesResponse = await coursesService.getAll({ LecturerIds: [myLecturer.id] });
                    setCourses(coursesResponse.data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <div className="text-center py-10">Loading Dashboard...</div>;
    }

    if (!lecturer) {
        return (
            <div className="text-center py-10">
                <h2 className="text-xl text-red-600">Lecturer profile not found.</h2>
                <p>Please contact an administrator to link your account.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {lecturer.firstName} {lecturer.lastName}
                </h1>
                <p className="text-gray-600 mt-2">Lecturer Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <a
                    href="/lecturer/assignments"
                    className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Assignments</h3>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-blue-100">Manage course assignments</p>
                </a>

                <a
                    href="/lecturer/schedule"
                    className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Schedule</h3>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <p className="text-green-100">Manage class schedule</p>
                </a>

                <a
                    href="/gradebook"
                    className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold">Gradebook</h3>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-purple-100">Grade student work</p>
                </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                    My Courses
                </h2>
                {courses.length > 0 ? (
                    <div className="space-y-4">
                        {courses.map((course) => (
                            <CourseItem key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">You are not assigned to any courses yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
