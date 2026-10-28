import useTheme from '../../../../../hooks/useTheme';

export default function LeftMachineFilterTabHandle({ onClick, isOpen, activeCount = 0 }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center py-4 px-1.5 rounded-r-2xl border-y border-r shadow-xl transition-all duration-300 cursor-pointer select-none group ${
        isOpen
          ? isFoxconn
            ? 'bg-[#002766] text-white border-blue-900 translate-x-0'
            : 'bg-[#76B900] text-black border-[#76B900] translate-x-0'
          : isFoxconn
            ? 'bg-[#002766] hover:bg-blue-900 border-blue-800 text-white shadow-blue-900/30 hover:translate-x-1'
            : 'bg-zinc-900/95 hover:bg-zinc-800 border-[#76B900]/50 text-[#76B900] shadow-[0_0_15px_rgba(118,185,0,0.25)] hover:translate-x-1'
      }`}
      title="Bấm để mở bảng lọc thông tin máy móc"
    >
      {/* Icon phễu lọc */}
      <div className="relative mb-2">
        <svg
          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
            isOpen ? 'rotate-180' : ''
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

        {/* Chấm tròn báo động số lượng filter đang áp dụng */}
        {activeCount > 0 && (
          <span
            className={`absolute -top-1.5 -right-2 text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center  ${
              isFoxconn
                ? 'bg-amber-400 text-slate-900 ring-2 ring-[#002766]'
                : 'bg-white text-black ring-2 ring-[#76B900]'
            }`}
          >
            {activeCount}
          </span>
        )}
      </div>

      {/* Chữ BỘ LỌC xoay dọc */}
      <span
        className="text-[10px] font-black uppercase tracking-widest leading-none my-1"
        style={{ writingMode: 'vertical-lr' }}
      >
        BỘ LỌC
      </span>

      {/* Mũi tên trượt */}
      <svg
        className={`w-3.5 h-3.5 mt-2 transition-transform duration-300 ${
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
