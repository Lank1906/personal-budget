import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const LoginPage = lazy(() => import('../pages/common/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/common/NotFoundPage'));

const getUserRole = () => {
  return localStorage.getItem('role');
};

const AppRouter: React.FC = () => {
  const userRole = getUserRole();

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element />
          <Route path="/login" element={<LoginPage />} />

          {}
          <Route
            path="/admin"
            element={
              <PrivateRoute element={<LoginPage />} allowedRoles={['admin']} userRole={userRole} />
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute
                element={<NotFoundPage />}
                allowedRoles={['user', 'admin']}
                userRole={userRole}
              />
            }
          />

          {}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
