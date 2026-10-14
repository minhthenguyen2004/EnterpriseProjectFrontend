import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import MainLayout from '../components/layout/MainLayout';
import Loading from '../components/common/Loading';
import { NotFound } from '../features/misc';
import { publicRoutes, protectedRoutes } from './routesConfig';

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading fullScreen={true} text="Đang tải giao diện..." subtext="Khởi tạo module..." />}>
      <Routes>

      {publicRoutes.map(({ path, element, restricted }) => (
        <Route key={path} element={<PublicRoute restricted={restricted} />}>
          <Route path={path} element={element} />
        </Route>
      ))}


      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Route>


      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Suspense>
  );
}
