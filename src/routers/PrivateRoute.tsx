import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
  userRole: string | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, allowedRoles, userRole }) => {
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  return element;
};

export default PrivateRoute;
