import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './layout/Layout';
import { Login } from './pages/Login';
import { UserType } from './types';
import { Dashboard } from './pages/Dashboard';
import { FacultyList } from './pages/faculties/FacultyList';
import { CourseList } from './pages/courses/CourseList';
import { UserList } from './pages/users/UserList';
import { LecturerDashboard } from './pages/LecturerDashboard';
import { GradeGradebook } from './pages/grades/GradeGradebook';
import { StudentGrades } from './pages/grades/StudentGrades';
import { Timetable } from './pages/schedule/Timetable';
import { AdminUserRegistration } from './pages/admin/AdminUserRegistration';
import { AssignmentList } from './pages/assignments/AssignmentList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/faculties" element={<FacultyList />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/students" element={<UserList title="Students" requiredRole={UserType.Student} />} />
                <Route path="/lecturers" element={<UserList title="Lecturers" requiredRole={UserType.Lecturer} />} />
                <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
                <Route path="/gradebook" element={<GradeGradebook />} />
                <Route path="/my-grades" element={<StudentGrades />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/admin/register-user" element={<AdminUserRegistration />} />
                <Route path="/assignments" element={<AssignmentList />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
