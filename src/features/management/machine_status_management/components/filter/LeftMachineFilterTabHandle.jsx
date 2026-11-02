import useTheme from '../../../../../hooks/useTheme';
import useSidebar from '../../../../../hooks/useSidebar';

export default function LeftMachineFilterTabHandle({ onClick, onToggle, isOpen, activeCount = 0 }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const { isOpen: isSidebarOpen } = useSidebar();
  const handleClick = onClick || onToggle;

  // Tính toán vị trí linh hoạt: không bị Sidebar che khuất, trượt ra mép Drawer khi mở
  const positionClass = isOpen
    ? 'left-[min(100vw,24rem)] sm:left-[28rem] z-[60]'
    : isSidebarOpen
      ? 'left-0 lg:left-72 z-40'
      : 'left-0 z-40';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`fixed top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-9 sm:w-10 py-4.5 sm:py-5 rounded-r-2xl border-y border-r shadow-2xl transition-[left,transform,background-color,border-color] duration-300 ease-in-out cursor-pointer select-none group ${positionClass} ${
        isOpen
          ? isFoxconn
            ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700 shadow-rose-900/30'
            : 'bg-zinc-900 hover:bg-zinc-800 text-rose-400 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.35)]'
          : isFoxconn
            ? 'bg-[#002766] hover:bg-[#003893] text-white border-blue-900 shadow-blue-950/40 hover:translate-x-1'
            : 'bg-zinc-900/95 hover:bg-zinc-800 border-[#76B900]/60 text-[#76B900] shadow-[0_0_18px_rgba(118,185,0,0.3)] hover:translate-x-1'
      }`}
      title={isOpen ? 'Đóng bảng lọc máy móc' : 'Mở bảng lọc máy móc (Tìm kiếm, Trạng thái, Chuyền, Tầng)'}
      aria-label={isOpen ? 'Đóng bộ lọc' : 'Mở bộ lọc trạng thái máy móc'}
    >
      {/* Vùng đệm hitbox mở rộng sang phải để bấm cực nhạy */}
      <span className="absolute -right-4 inset-y-0 w-8 pointer-events-auto" aria-hidden="true" />

      {/* Icon: Đóng hoặc Phễu lọc */}
      {isOpen ? (
        <svg
          className="w-4 h-4 mb-1.5 pointer-events-none transition-transform group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <div className="relative mb-1.5 pointer-events-none">
          <svg
            className="w-4 h-4 transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {activeCount > 0 && (
            <span
              className={`absolute -top-2 -right-2.5 text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs ${
                isFoxconn ? 'bg-amber-400 text-slate-900 ring-2 ring-[#002766]' : 'bg-[#76B900] text-black ring-2 ring-zinc-900'
              }`}
            >
              {activeCount}
            </span>
          )}
        </div>
      )}

      {/* Chữ BỘ LỌC hoặc ĐÓNG xoay dọc */}
      <span
        className="text-[10px] font-black uppercase tracking-widest pointer-events-none select-none my-1"
        style={{ writingMode: 'vertical-lr' }}
      >
        {isOpen ? 'ĐÓNG' : 'BỘ LỌC'}
      </span>

      {/* Mũi tên trượt */}
      <svg
        className={`w-3.5 h-3.5 mt-1.5 pointer-events-none transition-transform duration-300 ${
          isOpen ? 'rotate-180' : 'group-hover:translate-x-0.5'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
