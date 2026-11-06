import useTheme from '../../../../hooks/useTheme';
import {
  AREAS,
  CONTROLLERS,
  ACTIONS,
  CLIENT_IPS,
  TOP_LIMIT_OPTIONS,
} from '../constants/apiRequestHistoryConstants';

/**
 * ApiRequestFilterBar
 * Khung chứa các trường lọc được xếp theo hàng ngang:
 * 1. Date & Time (Bấm chọn lịch và thời gian)
 * 2. Area (Dropdown menu)
 * 3. Controller (Dropdown menu)
 * 4. Action (Dropdown menu)
 * 5. Client IP (Dropdown menu)
 * 6. Select Top (Dropdown menu)
 * 7. Nút Query Data & Nút Làm Sạch
 */
export default function ApiRequestFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  onExecuteQuery,
  isQuerying,
  onExportCsv,
  totalRecords,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm text-slate-800'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-lg'
      }`}
    >
      {/* Thanh Tiêu Đề Bộ Lọc & Các Thao Tác Phụ */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 pb-3 mb-3.5 border-b ${
          isFoxconn ? 'border-slate-200/80' : 'border-zinc-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl ${
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
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${
                isFoxconn ? 'text-slate-800' : 'text-zinc-100'
              }`}
            >
              Bộ Lọc Nhật Ký Yêu Cầu API (Filter Parameters)
            </h3>
            <p
              className={`text-[11px] font-semibold ${
                isFoxconn ? 'text-slate-500' : 'text-zinc-400'
              }`}
            >
              Lọc theo thời gian, phân khu, API Controller, phương thức hành động và trạm IP
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút Làm Sạch */}
          <button
            type="button"
            onClick={onResetFilters}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
            title="Khôi phục các trường lọc về mặc định"
          >
            <span>🧹</span>
            <span>Làm Sạch</span>
          </button>

          {/* Nút Xuất Báo Cáo CSV (Nếu đã có dữ liệu) */}
          {totalRecords > 0 && (
            <button
              type="button"
              onClick={onExportCsv}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                isFoxconn
                  ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-[#76B900] border-zinc-700'
              }`}
              title="Xuất bảng dữ liệu hiện tại ra tệp CSV"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Xuất CSV</span>
            </button>
          )}
        </div>
      </div>

      {/* Khung Các Trường Lọc Hàng Ngang (Single Responsive Horizontal Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 text-xs items-end">
        {/* Trường 1: Date & Time (Lịch & Thời Gian) */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Date & Time"
          >
            📅 Date & Time
          </label>
          <input
            type="datetime-local"
            value={filters.dateTime}
            onChange={(e) => onFilterChange('dateTime', e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-mono font-medium transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          />
        </div>

        {/* Trường 2: Area (Khu Vực) */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Area"
          >
            🏭 Area
          </label>
          <select
            value={filters.area}
            onChange={(e) => onFilterChange('area', e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {AREAS.map((a) => (
              <option
                key={a.id}
                value={a.id}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 3: Controller */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Controller"
          >
            🎮 Controller
          </label>
          <select
            value={filters.controller}
            onChange={(e) => onFilterChange('controller', e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {CONTROLLERS.map((c) => (
              <option
                key={c.id}
                value={c.id}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 4: Action */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Action"
          >
            ⚡ Action
          </label>
          <select
            value={filters.action}
            onChange={(e) => onFilterChange('action', e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {ACTIONS.map((act) => (
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

        {/* Trường 5: Client IP */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Client IP"
          >
            🖥️ Client IP
          </label>
          <select
            value={filters.clientIp}
            onChange={(e) => onFilterChange('clientIp', e.target.value)}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-mono font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 text-slate-800 focus:border-blue-500'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {CLIENT_IPS.map((ip) => (
              <option
                key={ip.id}
                value={ip.id}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {ip.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 6: Select Top */}
        <div className="space-y-1">
          <label
            className={`block font-bold truncate ${
              isFoxconn ? 'text-slate-700' : 'text-zinc-200'
            }`}
            title="Select Top"
          >
            🔝 Select Top
          </label>
          <select
            value={filters.topLimit}
            onChange={(e) => onFilterChange('topLimit', Number(e.target.value))}
            className={`w-full px-2.5 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
              isFoxconn
                ? 'bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-zinc-950 border-zinc-700 text-zinc-100'
            }`}
          >
            {TOP_LIMIT_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className={isFoxconn ? 'bg-white text-slate-800' : 'bg-zinc-900 text-zinc-100'}
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Trường 7: Nút Query Data */}
        <div className="space-y-1">
          <label className="block text-transparent select-none font-bold">
            Action
          </label>
          <button
            type="button"
            onClick={onExecuteQuery}
            disabled={isQuerying}
            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md active:scale-98 disabled:opacity-50 ${
              isFoxconn
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/20'
            }`}
          >
            {isQuerying ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Querying...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Query Data</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
