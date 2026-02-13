import React from 'react';
import { useQuery } from '@tanstack/react-query';
import scheduleService from '../../api/schedule';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { ScheduleGetFilter, ClassSession } from '../../types';

export const Timetable: React.FC = () => {
    const { user, role } = useAuth();


    const filter: ScheduleGetFilter = {
        limit: 100
    };

    if (role === 'Student' && user?.userId) {
        filter.studentId = user.userId;
    } else if (role === 'Lecturer' && user?.userId) {
        filter.lecturerId = user.userId;
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['schedule', role, user?.userId],
        queryFn: () => scheduleService.getAll(filter),
        enabled: !!user,
    });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const getDayName = (dayOfWeek: number) => days[dayOfWeek];

    if (isLoading) return <div className="p-6 text-center">Loading schedule...</div>;
    if (error) return <div className="p-6 text-center text-red-600">Error loading schedule.</div>;

    const sessions = data?.data?.data || [];

    const sessionsByDay = sessions.reduce((acc: Record<number, ClassSession[]>, session: ClassSession) => {
        const day = session.dayOfWeek;
        if (!acc[day]) acc[day] = [];
        acc[day].push(session);
        return acc;
    }, {} as Record<number, ClassSession[]>);

    const sortedDays = Object.keys(sessionsByDay).map(Number).sort((a: number, b: number) => a - b);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="mr-2" />
                My Timetable
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedDays.length === 0 ? (
                    <p className="text-gray-500">No classes scheduled.</p>
                ) : (
                    sortedDays.map(day => (
                        <div key={day} className="bg-white rounded-lg shadow p-4 border-t-4 border-blue-500">
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">{getDayName(day)}</h2>
                            <div className="space-y-4">
                                {sessionsByDay[day]
                                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                                    .map(session => (
                                        <div key={session.id} className="bg-gray-50 rounded p-3 hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-lg text-blue-900">{session.courseName}</h3>
                                            <div className="flex items-center text-gray-600 mt-2">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{session.startTime.substring(0, 5)} - {session.endTime.substring(0, 5)}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mt-1">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                <span>{session.location}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
