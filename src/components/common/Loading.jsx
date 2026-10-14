import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * Component Loading hiện đại chuẩn công nghiệp (Foxconn & NVIDIA Theme)
 * 
 * @param {boolean} fullScreen - Hiển thị che toàn màn hình (dùng cho chuyển trang / Auth)
 * @param {string} text - Tiêu đề loading
 * @param {string} subtext - Dòng ghi chú phụ bên dưới
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} minHeight - Chiều cao tối thiểu khi hiển thị trong card (mặc định: 'min-h-[280px]')
 * @param {string} className - Class CSS tuỳ biến thêm
 */
export default function Loading({
  fullScreen = false,
  text = 'Đang đồng bộ dữ liệu...',
  subtext = 'Hệ thống đang kết nối máy chủ...',
  size = 'md',
  minHeight = 'min-h-[260px]',
  className = '',
}) {
  // Đọc theme một cách an toàn (không bị crash nếu dùng ngoài ThemeProvider)
  const themeContext = useContext(ThemeContext);
  const isFoxconn = themeContext ? themeContext.brand === 'foxconn' : true;

  
  const sizeMap = {
    sm: {
      outer: 'w-10 h-10',
      middle: 'w-7 h-7',
      core: 'w-3 h-3',
      text: 'text-xs',
      subtext: 'text-[10px]',
      gap: 'gap-2.5',
    },
    md: {
      outer: 'w-16 h-16',
      middle: 'w-11 h-11',
      core: 'w-5 h-5',
      text: 'text-sm',
      subtext: 'text-xs',
      gap: 'gap-4',
    },
    lg: {
      outer: 'w-24 h-24',
      middle: 'w-16 h-16',
      core: 'w-7 h-7',
      text: 'text-base',
      subtext: 'text-xs',
      gap: 'gap-5',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex flex-col items-center justify-center ${currentSize.gap} p-6 select-none`}>
      {/* Vòng xoay đa tầng phong cách công nghệ cao (High-Tech Orbital Spinner) */}
      <div className={`relative flex items-center justify-center ${currentSize.outer}`}>
        
        {/* Vòng tròn hào quang phát sáng nền */}
        <div
          className={`absolute inset-0 rounded-full blur-md opacity-40 animate-pulse ${
            isFoxconn ? 'bg-blue-500' : 'bg-[#76B900]'
          }`}
        />

        {/* Vòng quay ngoài cùng (Clockwise) */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-transparent animate-spin ${
            isFoxconn
              ? 'border-t-blue-600 border-r-indigo-500'
              : 'border-t-[#76B900] border-r-emerald-400'
          }`}
          style={{ animationDuration: '1.2s' }}
        />

        {/* Vòng nét đứt ngược chiều kim đồng hồ (Counter-Clockwise) */}
        <div
          className={`absolute ${currentSize.middle} rounded-full border-2 border-dashed border-transparent animate-spin ${
            isFoxconn
              ? 'border-b-cyan-500 border-l-blue-400'
              : 'border-b-lime-400 border-l-[#76B900]'
          }`}
          style={{ animationDirection: 'reverse', animationDuration: '2s' }}
        />

        {/* Nhân trung tâm (Core chip/pulse) */}
        <div
          className={`rounded-full shadow-lg animate-ping opacity-75 ${currentSize.core} ${
            isFoxconn ? 'bg-blue-600 shadow-blue-500/50' : 'bg-[#76B900] shadow-[#76B900]/50'
          }`}
          style={{ animationDuration: '2s' }}
        />

        {/* Biểu tượng chip vi mạch ở giữa */}
        <div
          className={`absolute rounded-full flex items-center justify-center ${currentSize.core} ${
            isFoxconn ? 'bg-blue-700 text-white' : 'bg-zinc-900 text-[#76B900] border border-[#76B900]/60'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        </div>
      </div>

      {/* Dòng chữ trạng thái với hiệu ứng sóng text */}
      <div className="text-center space-y-1">
        <p
          className={`font-bold tracking-tight flex items-center justify-center gap-1 ${currentSize.text} ${
            isFoxconn ? 'text-slate-800' : 'text-zinc-100'
          }`}
        >
          <span>{text}</span>
          <span className="flex gap-0.5">
            <span
              className={`w-1 h-1 rounded-full animate-bounce ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`}
              style={{ animationDelay: '0ms' }}
            />
            <span
              className={`w-1 h-1 rounded-full animate-bounce ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`}
              style={{ animationDelay: '150ms' }}
            />
            <span
              className={`w-1 h-1 rounded-full animate-bounce ${isFoxconn ? 'bg-blue-600' : 'bg-[#76B900]'}`}
              style={{ animationDelay: '300ms' }}
            />
          </span>
        </p>

        {subtext && (
          <p
            className={`font-mono ${currentSize.subtext} ${
              isFoxconn ? 'text-slate-400' : 'text-zinc-500'
            }`}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );

  // Chế độ Full-screen (Overlay toàn màn hình khi đổi route hoặc đăng nhập)
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-black/70 backdrop-blur-md transition-all duration-300">
        <div
          className={`rounded-3xl p-6 sm:p-8 border shadow-2xl transition-all duration-300 ${
            isFoxconn
              ? 'bg-white/95 border-slate-200/80 shadow-blue-500/10'
              : 'bg-zinc-950/90 border-zinc-800 shadow-black/80'
          }`}
        >
          {content}
        </div>
      </div>
    );
  }

  // Chế độ nhúng bên trong thẻ Widget / Chart / Table
  return (
    <div
      className={`w-full flex items-center justify-center rounded-2xl transition-colors ${minHeight} ${className}`}
    >
      {content}
    </div>
  );
}

/**
 * Skeleton Loader hỗ trợ giao diện khung chờ (placeholder) cực mượt
 */
export function Skeleton({ className = '' }) {
  const themeContext = useContext(ThemeContext);
  const isFoxconn = themeContext ? themeContext.brand === 'foxconn' : true;

  return (
    <div
      className={`animate-pulse rounded-xl ${
        isFoxconn
          ? 'bg-slate-200/80 dark:bg-slate-700/50'
          : 'bg-zinc-800/80'
      } ${className}`}
    />
  );
}
