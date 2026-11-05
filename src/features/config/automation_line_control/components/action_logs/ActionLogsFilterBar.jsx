import useTheme from '../../../../../hooks/useTheme';
import {
  ACTION_TYPES,
  SUBSYSTEMS,
} from '../../constants/actionLogsConstants';

/**
 * ActionLogsFilterBar
 * Khung chứa các trường thông tin lọc kiểm toán:
 * Từ ngày, đến ngày, hành động, phân hệ, ô text tìm kiếm và các nút chức năng.
 */
export default function ActionLogsFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  onExportReport,
  totalRecords,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm text-slate-800'
          : 'bg-zinc-900/80 border-zinc-800 text-zinc-100 shadow-lg'
      }`}
    >
      {/* Hàng 1: Tiêu đề bộ lọc & Nút xuất báo cáo */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b ${
          isFoxconn ? 'border-slate-200/80' : 'border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`p-1.5 rounded-lg ${
              isFoxconn
                ? 'bg-blue-50 text-blue-600'
                : 'bg-[#76B900]/10 text-[#76B900]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isFoxconn ? 'text-slate-800' : 'text-zinc-100'
              }`}
            >
              Khung Lọc Kiểm Toán Hành Động
            </span>
            <span
              className={`ml-2 text-[11px] font-semibold ${
                isFoxconn ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              (Lọc theo thời gian, loại hành động, phân hệ & từ khóa)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFilters}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
            title="Làm sạch bộ lọc về mặc định"
          >
            <span>🧹</span>
            <span>Làm Sạch</span>
          </button>
          <button
            type="button"
            onClick={onExportReport}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              isFoxconn
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
            }`}
            title="Xuất danh sách nhật ký hiện tại ra file CSV"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Xuất Báo Cáo (CSV)</span>
          </button>
        </div>
      </div>

      {/* Hàng 2: Lưới 5 trường lọc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
        {/* Trường 1: Từ Ngày */}
        <div>
          <label
            className={`block font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
          >
            📅 Từ Ngày
          </label>
          <input
            type="datetime-local"
            value={filters.fromDate}
            onChange={(e) => onFilterChange('fromDate', e.target.value)}
            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950/80 border-zinc-700 text-zinc-100'
            }`}
          />
        </div>

        {/* Trường 2: Đến Ngày */}
        <div>
          <label
            className={`block font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
          >
            📅 Đến Ngày
          </label>
          <input
            type="datetime-local"
            value={filters.toDate}
            onChange={(e) => onFilterChange('toDate', e.target.value)}
            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950/80 border-zinc-700 text-zinc-100'
            }`}
          />
        </div>

        {/* Trường 3: Hành Động (Dropdown) */}
        <div>
          <label
            className={`block font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
          >
            ⚡ Hành Động
          </label>
          <select
            value={filters.actionType}
            onChange={(e) => onFilterChange('actionType', e.target.value)}
            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950/80 border-zinc-700 text-zinc-100'
            }`}
          >
            {ACTION_TYPES.map((act) => (
              <option
                key={act.id}
                value={act.id}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {act.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 4: Phân Hệ (Dropdown) */}
        <div>
          <label
            className={`block font-bold mb-1 ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
          >
            🏢 Phân Hệ
          </label>
          <select
            value={filters.subsystem}
            onChange={(e) => onFilterChange('subsystem', e.target.value)}
            className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950/80 border-zinc-700 text-zinc-100'
            }`}
          >
            {SUBSYSTEMS.map((sys) => (
              <option
                key={sys.id}
                value={sys.id}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {sys.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 5: Ô Text Tìm Kiếm Chi Tiết */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              className={`font-bold ${
                isFoxconn ? 'text-slate-700' : 'text-zinc-200'
              }`}
            >
              🔍 Tìm Kiếm
            </label>
            {filters.keyword && (
              <button
                type="button"
                onClick={() => onFilterChange('keyword', '')}
                className={`text-[10px] font-bold transition-all cursor-pointer ${
                  isFoxconn ? 'text-slate-400 hover:text-red-500' : 'text-zinc-400 hover:text-rose-400'
                }`}
              >
                Xóa ✕
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => onFilterChange('keyword', e.target.value)}
              placeholder="Mã thẻ, SN, Carrier, bảng..."
              className={`w-full pl-2.5 pr-8 py-1.5 rounded-xl border text-xs transition-all font-mono ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800'
                  : 'bg-zinc-950/80 border-zinc-700 text-zinc-100'
              }`}
            />
            <div
              className={`absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none ${
                isFoxconn ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
