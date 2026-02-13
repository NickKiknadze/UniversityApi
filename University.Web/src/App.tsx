import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { Layout } from './layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { FacultyList } from './pages/faculties/FacultyList';
import { CourseList } from './pages/courses/CourseList';
import { UserList } from './pages/users/UserList';
import { LecturerList } from './pages/lecturers/LecturerList';

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
                <Route path="/lecturers" element={<LecturerList />} />
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
