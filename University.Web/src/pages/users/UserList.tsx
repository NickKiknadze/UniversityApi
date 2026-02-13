import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../../api/users';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { UserForm } from './UserForm';

export const UserList: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    const { data, isLoading } = useQuery({
        queryKey: ['users', searchTerm],
        queryFn: () => usersService.getAll({
            SearchText: searchTerm
        }),
    });

    const deleteMutation = useMutation({
        mutationFn: usersService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    const handleEdit = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedUser(null);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Students</h1>
                <button
                    onClick={handleCreate}
                    className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Student
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faculty</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data?.data?.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.faculty?.facultyName || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {(!data?.data || data.data.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                                        No students found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <UserForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedUser}
            />
        </div>
    );
};
