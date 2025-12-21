import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Wait for auth redirecting
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/login" replace />;
  if (role && user.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

export default PrivateRoute;
