import { Outlet } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

export default function MainLayout() {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`min-h-full flex-1 flex flex-col font-sans transition-colors duration-300 ${
        isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'
      }`}
    >
      {/* Nội dung chính của trang */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer
        className={`py-4 px-5 text-center text-xs transition-colors border-t ${
          isFoxconn
            ? 'bg-slate-50 border-slate-200 text-slate-500'
            : 'bg-zinc-950 border-zinc-800 text-zinc-400'
        }`}
      >
        Foxconn & NVIDIA Station Management System © 2026. All rights reserved.
      </footer>
    </div>
  );
}
