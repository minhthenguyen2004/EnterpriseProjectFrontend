import { BrowserRouter, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './context/ThemeProvider';
import SidebarProvider from './context/SidebarProvider';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isLoginPage && <Header />}
      <div className="flex-1 flex relative">
        {!isLoginPage && <Sidebar />}
        <div className="flex-1 min-w-0 flex flex-col transition-all duration-300 ease-in-out">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <AppContent />
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
