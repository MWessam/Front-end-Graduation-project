import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0) {
    // Check if user has ANY of the allowed roles
    const userRoles = Array.isArray(user.roles) ? user.roles : [user.role];
    const hasAccess = allowedRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      // User is logged in but doesn't have the right role
      // Redirect based on their primary role
      const primaryRole = user.role || userRoles[0];
      if (primaryRole === 'admin') return <Navigate to="/admin" replace />;
      if (primaryRole === 'teacher') return <Navigate to="/teacher/dashboard" replace />;
      return <Navigate to="/student" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
