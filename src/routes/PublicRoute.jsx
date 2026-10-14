import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Component xử lý Route công khai (ví dụ: /login).
 * @param {boolean} restricted - Nếu true (như trang login), user đã đăng nhập sẽ bị đẩy về /dashboard.
 * @param {string} redirectPath - Đường dẫn chuyển hướng khi đã đăng nhập (mặc định: /dashboard).
 */

export default function PublicRoute({ restricted = false, redirectPath = '/dashboard' }) {
  const isAuthenticated = useSelector((state) => Boolean(state.auth?.jwtToken));

  if (isAuthenticated && restricted) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />; //Outlet is considered as a placeholder for child components
}
