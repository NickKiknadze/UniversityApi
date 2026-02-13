import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usersService } from '../api/users';
import { coursesService } from '../api/courses';
import { type UserGetDto, type CourseGetDto } from '../types';
import { jwtDecode } from 'jwt-decode';
import { GraduationCap, BookOpen, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DecodedToken {
    "/identity/claims/sid"?: string;
    [key: string]: any;
}

export const StudentDashboard: React.FC = () => {
    const { token } = useAuth();
    const [student, setStudent] = useState<UserGetDto | null>(null);
    const [courses, setCourses] = useState<CourseGetDto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                const userId = decoded["/identity/claims/sid"];
                if (!userId) return;

                const usersResponse = await usersService.getAll({ UserId: parseInt(userId) });
                const myStudent = usersResponse.data[0];

                if (myStudent) {
                    setStudent(myStudent);
                    const coursesResponse = await coursesService.getAll({ UserId: myStudent.id });
                    setCourses(coursesResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch student dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>;
    }

    if (!student) {
        return (
            <div className="text-center py-10">
                <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-700">Student profile not found</h2>
                <p className="text-gray-500 mt-2">Please contact an administrator to set up your profile.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {student.firstName} {student.lastName}!</h1>
                <p className="text-gray-600 mt-2">Student Dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center mb-4 text-blue-600">
                        <BookOpen className="h-6 w-6 mr-2" />
                        <h3 className="font-semibold text-lg">My Courses</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{courses.length}</p>
                    <p className="text-sm text-gray-500 mt-1">Enrolled this semester</p>
                </div>

                <Link to="/timetable" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4 text-green-600">
                        <Clock className="h-6 w-6 mr-2" />
                        <h3 className="font-semibold text-lg">My Schedule</h3>
                    </div>
                    <p className="text-sm text-gray-500">View your weekly class sessions and locations.</p>
                    <span className="text-green-600 text-sm font-medium mt-4 inline-block italic">View Timetable →</span>
                </Link>

                <Link to="/my-grades" className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4 text-purple-600">
                        <Award className="h-6 w-6 mr-2" />
                        <h3 className="font-semibold text-lg">My Grades</h3>
                    </div>
                    <p className="text-sm text-gray-500">Track your academic progress and assignment feedback.</p>
                    <span className="text-purple-600 text-sm font-medium mt-4 inline-block italic">View Gradebook →</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">My Enrolled Courses</h2>
                </div>
                <div className="p-6">
                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <div key={course.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group">
                                    <h4 className="font-bold text-gray-800 group-hover:text-blue-700">{course.courseName}</h4>
                                    <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2">
                                        {course.lecturers.map(l => (
                                            <span key={l.id} className="bg-white px-2 py-1 rounded shadow-sm">
                                                {l.firstName} {l.lastName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">You are not enrolled in any courses yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
