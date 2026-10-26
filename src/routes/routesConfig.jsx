import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import AutomationLineManagement from '../features/automation_line_management/AutomationLineManagement';
import MachineStatusManagement from '../features/machine_status_management/MachineStatusManagement';

const Login = lazy(() => import('../features/auth/login/Login'));


// CONFIG routes
const RackConfigPage = lazy(() => import('../features/rack/RackConfigPage'));
const RackOverviewConfigPage = lazy(() => import('../features/rack/RackOverviewConfigPage'));
const CarrierConfigPage = lazy(() => import('../features/carrier/CarrierConfigPage'));
const MachineConfigPage = lazy(() => import('../features/machine/MachineConfigPage'));
const AutomationLineControlPage = lazy(() => import('../features/automation_line_control/AutomationLineControlPage'));
const StationLayoutControlPage = lazy(() => import('../features/station-layout/StationLayoutControlPage'));

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
    // Chuyển hướng mặc định về Chuyền Tự Động
  {
    path: '/',
    element: <Navigate to="/autoline-management" replace />,
  },
  {
    path: '/autoline-management',
    element: <AutomationLineManagement />,
  },
  {
    path: '/autoline',
    element: <Navigate to="/autoline-management" replace />,
  },
  {
    path: '/models',
    element: <Navigate to="/autoline-management" replace />,
  },
  {
    path: '/machine-status',
    element: <MachineStatusManagement />,

  },

  // Nhóm CONFIG routes
  {
    path: '/config/rack',
    element: <RackConfigPage />,
  },
  {
    path: '/config/rack-overview',
    element: <RackOverviewConfigPage />,
  },
  {
    path: '/config/carrier',
    element: <CarrierConfigPage />,
  },
  {
    path: '/config/machine',
    element: <MachineConfigPage />,
  },
  {
    path: '/config/automation-line',
    element: <AutomationLineControlPage />,
  },
  {
    path: '/config/station-layout',
    element: <StationLayoutControlPage />,
  },
];
