import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  allowedRoles: string[];
  userRole: string | null;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  userRole,
  redirectPath = '/login',
}) => {
  if (!userRole) {
    return <Navigate to={redirectPath} replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
