import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Login = lazy(() => import('../features/auth/login/Login'));
const Dashboard = lazy(() => import('../features/dashboard/Dashboard'));
const MachineManagementPage = lazy(() => import('../features/machines/MachineManagementPage'));

/**
 * Danh sách Route công khai
 * `restricted: true` nghĩa là nếu user đã login thì sẽ bị chuyển hướng về trang chính.
 */
export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
    restricted: true,
  },
];

export const protectedRoutes = [
  {
    path: '/',
    element: <Navigate to="/models" replace />,
  },
  {
    path: '/models',
    element: <MachineManagementPage />,
  },
  {
    path: '/machines',
    element: <MachineManagementPage />,
  },
  {
    path: '/machine-models',
    element: <MachineManagementPage />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
];
