import useTheme from '../../../../../hooks/useTheme';

export default function LeftFilterTabHandle({ isOpen, onToggle, activeCount = 0 }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center w-8 py-4 rounded-r-2xl border-y border-r shadow-xl transition-all duration-300 cursor-pointer group ${
        isOpen
          ? isFoxconn
            ? 'bg-[#002766] text-white border-blue-800 translate-x-0'
            : 'bg-[#76B900] text-black border-[#76B900] translate-x-0'
          : isFoxconn
            ? 'bg-[#002766] hover:bg-[#003893] text-white border-blue-900 shadow-blue-950/30 hover:translate-x-1'
            : 'bg-zinc-900/95 hover:bg-zinc-800 border-[#76B900]/50 text-[#76B900] shadow-[0_0_15px_rgba(118,185,0,0.25)] hover:translate-x-1'
      }`}
      title="Mở Bộ Lọc Chuyền (Ngày/Giờ, Sản Phẩm, Chuyền)"
      aria-label="Mở bộ lọc chuyền tự động"
    >
      {/* Icon Phễu lọc */}
      <svg
        className={`w-4 h-4 mb-2 transition-transform duration-300 ${
          isOpen ? 'rotate-90' : 'group-hover:scale-110'
        }`}
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

      {/* Chữ xoay dọc */}
      <span
        className="text-[10px] font-black uppercase tracking-widest select-none"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        BỘ LỌC
      </span>

      {/* Badge đếm số tiêu chí đang lọc */}
      {activeCount > 0 && (
        <span
          className={`mt-2 w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-sm ${
            isFoxconn
              ? 'bg-amber-400 text-slate-900 font-bold'
              : isOpen
                ? 'bg-black text-[#76B900]'
                : 'bg-[#76B900] text-black font-black'
          }`}
        >
          {activeCount}
        </span>
      )}
    </button>
  );
}
