import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CommentsPage from '../pages/CommentsPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route
        path="/comments"
        element={
          <ProtectedRoute>
            <Layout>
              <CommentsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/comments" replace />} />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
