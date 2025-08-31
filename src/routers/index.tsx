import React, { Suspense, lazy } from 'react';
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
  const userRole = user?.email ? 'user' : 'no login';

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute allowedRoles={['admin']} userRole={userRole} />}>
            <Route path="/admin" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>

          <Route element={<PrivateRoute allowedRoles={['user', 'admin']} userRole={userRole} />}>
            <Route path="/user" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
