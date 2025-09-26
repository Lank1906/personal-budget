import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layouts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { logout, setUser } from '../store/slices/userSlice';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const TransactionPage = lazy(() => import('../pages/TransactionPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));

const AppRouter: React.FC = () => {
  const { user, info } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      const expireAt = localStorage.getItem('auth_expire_at');

      if (expireAt && Date.now() > Number(expireAt)) {
        dispatch(logout({ successFn: () => (window.location.href = '/login') }));
        dispatch(setUser(null));
      } else {
        dispatch(setUser({ user: currentUser, info }));
      }
    });

    return () => unsubscribe();
  }, []);
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
              <Route path="transactions" element={<TransactionPage />} />
              <Route path="categories" element={<CategoryPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
