import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, UserSquare2, BookOpen, Building2, UserPlus, ClipboardList } from 'lucide-react';
import { usersService } from '../api/users';
import { coursesService } from '../api/courses';
import { facultiesService } from '../api/faculties';
import { UserType } from '../types';
import { Link } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        users: 0,
        students: 0,
        lecturers: 0,
        courses: 0,
        faculties: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [usersRes, studentsRes, lecturersRes, coursesRes, facultiesRes] = await Promise.all([
                    usersService.getAll({ Limit: 1 }),
                    usersService.getAll({ Limit: 1, UserType: UserType.Student }),
                    usersService.getAll({ Limit: 1, UserType: UserType.Lecturer }),
                    coursesService.getAll({ Limit: 1 }),
                    facultiesService.getAll({ Limit: 1 }),
                ]);

                setStats({
                    users: usersRes.count || 0,
                    students: studentsRes.count || 0,
                    lecturers: lecturersRes.count || 0,
                    courses: coursesRes.count || 0,
                    faculties: facultiesRes.count || 0,
                });
            } catch (error) {
                console.error('Failed to fetch admin stats', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', link: '/users' },
        { label: 'Total Students', value: stats.students, icon: GraduationCap, color: 'text-green-600', bg: 'bg-green-100', link: '/students' },
        { label: 'Total Lecturers', value: stats.lecturers, icon: UserSquare2, color: 'text-purple-600', bg: 'bg-purple-100', link: '/lecturers' },
        { label: 'Total Courses', value: stats.courses, icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-100', link: '/courses' },
        { label: 'Total Faculties', value: stats.faculties, icon: Building2, color: 'text-red-600', bg: 'bg-red-100', link: '/faculties' },
    ];

    if (loading) {
        return <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>;
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">University Management Overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <Link key={index} to={card.link} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${card.bg} p-3 rounded-lg`}>
                                <card.icon className={`h-6 w-6 ${card.color}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{card.label}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link to="/admin/register-user" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <UserPlus className="h-10 w-10 text-blue-500 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Register User</h4>
                                <p className="text-sm text-gray-500">Create new credentials</p>
                            </div>
                        </Link>
                        <Link to="/students" className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <GraduationCap className="h-10 w-10 text-green-500 mr-4" />
                            <div>
                                <h4 className="font-bold text-gray-800">Manage Students</h4>
                                <p className="text-sm text-gray-500">View and edit profiles</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <ClipboardList className="h-5 w-5 mr-2 text-blue-600" />
                        System Status
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg text-green-700">
                            <span className="font-medium">API Service</span>
                            <span className="flex items-center">
                                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                                Online
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg text-blue-700">
                            <span className="font-medium">Database</span>
                            <span className="flex items-center">
                                <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                                Connected
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
