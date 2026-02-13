import React from 'react';

export const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="mt-4 text-gray-600">Welcome to the University Management System.</p>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Statistics cards can go here */}
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Courses</h3>
                    <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
                </div>
            </div>
        </div>
    );
};
