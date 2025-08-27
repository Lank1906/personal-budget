import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const HomePage = lazy(() => import('../pages/HomePage'));

const AppRouter: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  let userRole = 'no login';
  useEffect(() => {
    if (!user?.email) userRole = 'user';
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute element={<LoginPage />} allowedRoles={['admin']} userRole={userRole} />
            }
          />
          <Route
            path="/user"
            element={
              <Routes>
                <Route
                  path=""
                  element={
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  }
                />
              </Routes>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
