import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Component bảo vệ các Route nội bộ (cần đăng nhập).
 * Nếu chưa đăng nhập (không có jwtToken), tự động chuyển hướng về trang /login.
 * @param {string} redirectPath - Đường dẫn chuyển hướng khi chưa login (mặc định: /login).
 */

export default function ProtectedRoute({ redirectPath = '/login' }) {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => Boolean(state.auth?.jwtToken));

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
