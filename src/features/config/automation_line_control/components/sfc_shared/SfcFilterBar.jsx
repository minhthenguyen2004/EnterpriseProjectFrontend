import useTheme from '../../../../../hooks/useTheme';
import { PRODUCT_FAMILIES, STATION_GROUPS } from '../../constants/sfcControlConstants';

/**
 * Thanh lọc 5 trường xếp hàng ngang:
 * 1. Tìm theo trường text nhưng có thể tìm theo SN/Carrier
 * 2. Dòng sản phẩm (Dropdown menu)
 * 3. Trạm / Group (Dropdown menu)
 * 4. Host (Trường text)
 * 5. Station IP (Trường text)
 */
export default function SfcFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  onSearch,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.();
    }
  };

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isFoxconn
          ? 'bg-slate-50/80 border-slate-200/80 text-slate-800'
          : 'bg-zinc-950/60 border-zinc-800 text-zinc-100'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className={`text-xs font-bold uppercase tracking-wider ${ isFoxconn ? "text-slate-600" : "text-white"}`}>
            Bộ Lọc Thông Tin Truy Vấn SFC
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              isFoxconn
                ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            Đặt lại
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Trường 1: Tìm theo SN / Carrier */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 flex items-center justify-between">
            <span>Tìm theo SN / Carrier:</span>
            <span className="text-[10px] text-blue-500 font-mono">SN/CR</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập SN hoặc Carrier..."
              className={`w-full pl-8 pr-3 py-2 text-xs rounded-xl font-mono border transition-all outline-none ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800 focus:ring-1 focus:ring-blue-500'
                  : 'bg-zinc-900 border-zinc-700 text-white focus:ring-1 focus:ring-[#76B900]'
              }`}
            />
            <svg
              className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Trường 2: Dòng sản phẩm (Dropdown) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
            Dòng sản phẩm:
          </label>
          <select
            value={filters.productFamily}
            onChange={(e) => onFilterChange('productFamily', e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-xl border transition-all outline-none font-medium cursor-pointer ${
              isFoxconn
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-zinc-900 border-zinc-700 text-white'
            }`}
          >
            {PRODUCT_FAMILIES.map((model) => (
              <option key={model.id} value={model.id} className="dark:bg-zinc-900">
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 3: Trạm (Group) (Dropdown) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
            Trạm (Group):
          </label>
          <select
            value={filters.stationGroup}
            onChange={(e) => onFilterChange('stationGroup', e.target.value)}
            className={`w-full px-3 py-2 text-xs rounded-xl border transition-all outline-none font-medium cursor-pointer ${
              isFoxconn
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-zinc-900 border-zinc-700 text-white'
            }`}
          >
            {STATION_GROUPS.map((group) => (
              <option key={group.id} value={group.id} className="dark:bg-zinc-900">
                {group.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 4: Host (Trường text) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
            Host:
          </label>
          <input
            type="text"
            value={filters.host}
            onChange={(e) => onFilterChange('host', e.target.value)}
            placeholder="Host SFC / Server..."
            className={`w-full px-3 py-2 text-xs rounded-xl font-mono border transition-all outline-none ${
              isFoxconn
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-zinc-900 border-zinc-700 text-white'
            }`}
          />
        </div>

        {/* Trường 5: Station IP (Trường text) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400">
            Station IP:
          </label>
          <input
            type="text"
            value={filters.stationIp}
            onChange={(e) => onFilterChange('stationIp', e.target.value)}
            placeholder="IP Trạm máy..."
            className={`w-full px-3 py-2 text-xs rounded-xl font-mono border transition-all outline-none ${
              isFoxconn
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-zinc-900 border-zinc-700 text-white'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
