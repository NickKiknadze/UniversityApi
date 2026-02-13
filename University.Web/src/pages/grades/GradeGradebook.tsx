import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';
import assignmentsService from '../../api/assignments';
import gradesService from '../../api/grades';
import { coursesService } from '../../api/courses';

export const GradeGradebook: React.FC = () => {
    const { user } = useAuth();
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<number | null>(null);

    const { data: courses, isLoading: coursesLoading } = useQuery({
        queryKey: ['lecturerCourses', user?.id],
        queryFn: async () => {
            const response = await coursesService.getAll();
            return response;
        },
        enabled: !!user,
    });

    const { data: assignments } = useQuery({
        queryKey: ['assignments', selectedCourseId],
        queryFn: async () => {
            if (!selectedCourseId) return [];
            const response = await assignmentsService.getAll({ courseId: selectedCourseId });
            return response.data;
        },
        enabled: !!selectedCourseId,
    });

    const { data: grades, isLoading: gradesLoading } = useQuery({
        queryKey: ['grades', selectedAssignmentId],
        queryFn: async () => {
            if (!selectedAssignmentId) return [];
            const response = await gradesService.getAll({ assignmentId: selectedAssignmentId });
            return response.data;
        },
        enabled: !!selectedAssignmentId,
    });

    if (coursesLoading) return <div>Loading courses...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gradebook</h1>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Course</label>
                <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => setSelectedCourseId(Number(e.target.value))}
                    value={selectedCourseId || ''}
                >
                    <option value="">Select a course</option>
                    {courses?.data?.map((course: any) => (
                        <option key={course.id} value={course.id}>{course.courseName}</option>
                    ))}
                </select>
            </div>

            {selectedCourseId && (
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Assignment</label>
                    <select
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={(e) => setSelectedAssignmentId(Number(e.target.value))}
                        value={selectedAssignmentId || ''}
                    >
                        <option value="">Select an assignment</option>
                        {assignments?.map((assignment) => (
                            <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
                        ))}
                    </select>
                </div>
            )}

            {selectedAssignmentId && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Grades</h2>
                    {gradesLoading ? (
                        <div>Loading grades...</div>
                    ) : (
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Student
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Points
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Feedback
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades?.map((grade) => (
                                    <tr key={grade.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {grade.studentName}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {grade.points}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {grade.feedback}
                                        </td>
                                    </tr>
                                ))}
                                {grades?.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                            No grades found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};
