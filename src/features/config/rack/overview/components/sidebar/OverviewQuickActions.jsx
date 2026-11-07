import useTheme from '../../../../../../hooks/useTheme';

export default function OverviewQuickActions({
  onAddFace,
  onAddGroup,
  onAddRack
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800 shadow-xl'
      }`}
    >
      <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-slate-100 dark:border-zinc-800">
        <span className="text-base">⚡</span>
        <h4 className={`text-xs font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-800' : 'text-zinc-200'}`}>
          Thao Tác Nhanh
        </h4>
      </div>

      <div className="space-y-2.5">
        {/* Nút Thêm Face */}
        <button
          type="button"
          onClick={() => onAddFace()}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer group ${
            isFoxconn
              ? 'bg-blue-50/70 hover:bg-blue-100/90 text-blue-900 border-blue-200/80 shadow-2xs'
              : 'bg-[#76B900]/10 hover:bg-[#76B900]/20 text-[#76B900] border-[#76B900]/30 shadow-2xs'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-xs bg-white/60 dark:bg-zinc-900/60">
              🔲
            </span>
            <span>Thêm Face</span>
          </span>
          <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">+</span>
        </button>

        {/* Nút Thêm Group */}
        <button
          type="button"
          onClick={() => onAddGroup()}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer group ${
            isFoxconn
              ? 'bg-purple-50/70 hover:bg-purple-100/90 text-purple-900 border-purple-200/80 shadow-2xs'
              : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30 shadow-2xs'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-xs bg-white/60 dark:bg-zinc-900/60">
              👥
            </span>
            <span>Thêm Group</span>
          </span>
          <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">+</span>
        </button>

        {/* Nút Thêm Rack */}
        <button
          type="button"
          onClick={() => onAddRack()}
          className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer group ${
            isFoxconn
              ? 'bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 border-amber-200/80 shadow-2xs'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-2xs'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-xs bg-white/60 dark:bg-zinc-900/60">
              🗄️
            </span>
            <span>Thêm Rack</span>
          </span>
          <span className="text-sm font-bold group-hover:translate-x-0.5 transition-transform">+</span>
        </button>
      </div>
    </div>
  );
}

