import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, Building2, Users, UserSquare2 } from 'lucide-react';

export const Sidebar: React.FC = () => {
    const navItems = [
        { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/faculties', icon: Building2, label: 'Faculties' },
        { to: '/courses', icon: GraduationCap, label: 'Courses' },
        { to: '/users', icon: Users, label: 'Students' },
        { to: '/lecturers', icon: UserSquare2, label: 'Lecturers' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen hidden md:block">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-blue-600">University App</h1>
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
