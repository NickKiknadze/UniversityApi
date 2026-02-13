import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import gradesService from '../../api/grades';

export const StudentGrades: React.FC = () => {
    const { user } = useAuth();

    const { data: grades, isLoading } = useQuery({
        queryKey: ['myGrades', user?.id],
        queryFn: async () => {
            if (!user?.id) return [];
            const response = await gradesService.getAll({ studentId: user.id });
            return response.data;
        },
        enabled: !!user?.id,
    });

    if (isLoading) return <div>Loading grades...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Grades</h1>
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Assignment
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Points
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Feedback
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {grades?.map((grade) => (
                        <tr key={grade.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {grade.assignmentTitle}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {grade.points}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {grade.feedback}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                {new Date(grade.gradedDate).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {grades?.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                You have no grades yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
