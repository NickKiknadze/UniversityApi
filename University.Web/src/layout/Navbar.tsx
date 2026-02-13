import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { logout, user, role } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {role === 'Admin' ? 'Admin Portal' : role === 'Lecturer' ? 'Lecturer Portal' : 'Student Portal'}
                </h2>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                        {user?.Avatar ? (
                            <img
                                src={`${import.meta.env.VITE_API_URL}${user.Avatar}`}
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover mr-2 border border-gray-200"
                            />
                        ) : (
                            <User className="w-5 h-5 mr-2" />
                        )}
                        <span className="text-sm font-medium">{user?.unique_name || user?.sub || 'User'}</span>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center px-3 py-2 text-sm text-red-600 transition-colors rounded-md hover:bg-red-50"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};
