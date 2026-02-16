import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Building2, Users, UserSquare2, Calendar, UserPlus, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
    const { role } = useAuth();

    const allNavItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['Admin', 'Lecturer', 'Student'] },
        { to: '/faculties', icon: Building2, label: 'Faculties', roles: ['Admin'] },
        { to: '/courses', icon: GraduationCap, label: 'Courses', roles: ['Admin'] },
        { to: '/users', icon: Users, label: 'Users', roles: ['Admin'] },
        { to: '/students', icon: GraduationCap, label: 'Students', roles: ['Admin'] },
        { to: '/lecturers', icon: UserSquare2, label: 'Lecturers', roles: ['Admin'] },
        { to: '/admin/register-user', icon: UserPlus, label: 'Register User', roles: ['Admin'] },
        { to: '/timetable', icon: Calendar, label: 'Timetable', roles: ['Admin', 'Lecturer', 'Student'] },
        { to: '/my-grades', icon: GraduationCap, label: 'My Grades', roles: ['Student'] },
        { to: '/gradebook', icon: GraduationCap, label: 'Gradebook', roles: ['Lecturer'] },
        { to: '/assignments', icon: FileText, label: 'Assignments', roles: ['Admin', 'Lecturer', 'Student'] },
    ];

    const navItems = allNavItems.filter(item => !item.roles || (role && item.roles.includes(role)));

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
            <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-2 text-blue-600" />
                    University App
                </h1>
                {role && (
                    <div className="mt-1 flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${role === 'Admin' ? 'bg-indigo-500' : role === 'Lecturer' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{role} Portal</p>
                    </div>
                )}
            </div>
            <nav className="mt-6">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
