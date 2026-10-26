import useTheme from '../../../../hooks/useTheme';

export default function ConveyorConnector({ isActive = true }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div className="flex flex-col items-center justify-center px-0.5 shrink-0 select-none">
      {/* Icon băng tải và mũi tên luồng di chuyển */}
      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
          isFoxconn
            ? 'bg-white border-blue-200 text-blue-700 shadow-xs'
            : 'bg-zinc-900 border-[#76B900]/40 text-[#76B900] shadow-[0_0_8px_rgba(118,185,0,0.2)]'
        }`}
        title="Băng tải chuyển phôi tự động (Conveyor Flow)"
      >
        <svg
          className={`w-3 h-3 ${isActive ? 'animate-pulse' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>

      {/* Đường nối nét đứt */}
      <div className="w-4 h-0.5 border-t border-dashed border-slate-300 dark:border-zinc-700 mt-0.5"></div>
    </div>
  );
}
