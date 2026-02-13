import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { LecturerDashboard } from './LecturerDashboard';
import { StudentDashboard } from './StudentDashboard';

export const Dashboard: React.FC = () => {
    const { role } = useAuth();

    switch (role) {
        case 'Admin':
            return <AdminDashboard />;
        case 'Lecturer':
            return <LecturerDashboard />;
        case 'Student':
            return <StudentDashboard />;
        default:
            return (
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="mt-4 text-gray-600">Welcome to the University Management System.</p>
                    <p className="mt-2 text-gray-500 italic">No specific role dashboard available for your account.</p>
                </div>
            );
    }
};
