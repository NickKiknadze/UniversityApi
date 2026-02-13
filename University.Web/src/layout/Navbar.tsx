import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
    const { logout } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-800">Admin Portal</h2>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-600">
                        <User className="w-5 h-5 mr-2" />
                        <span className="text-sm font-medium">Admin User</span>
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
