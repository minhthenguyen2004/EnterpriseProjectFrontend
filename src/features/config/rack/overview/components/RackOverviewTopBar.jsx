import useTheme from '../../../../../hooks/useTheme';
import {
  LOCATION_OPTIONS,
  PRODUCT_LINE_OPTIONS,
  GROUP_NAME_OPTIONS
} from '../constants/rackOverviewConstants';

export default function RackOverviewTopBar({
  location,
  onLocationChange,
  productLine,
  onProductLineChange,
  selectedGroupName,
  onGroupNameChange,
  onOpenStructureModal,
  onSaveLayout,
  onAddNewFace,
  onReloadDatabase
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* Left Side: 3 Dropdowns + Structure Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* 1. Dropdown Vị trí (Location) */}
          <div className="flex flex-col min-w-[170px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1 flex items-center gap-1">
              <span>📍</span> Vị trí (Location)
            </span>
            <select
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border outline-hidden transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            >
              {LOCATION_OPTIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Dropdown Dòng sản phẩm (Product Line) */}
          <div className="flex flex-col min-w-[150px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1 flex items-center gap-1">
              <span>🏷️</span> Dòng sản phẩm
            </span>
            <select
              value={productLine}
              onChange={(e) => onProductLineChange(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border outline-hidden transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            >
              {PRODUCT_LINE_OPTIONS.map((prod) => (
                <option key={prod} value={prod}>
                  {prod}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Dropdown Group Name */}
          <div className="flex flex-col min-w-[150px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1 flex items-center gap-1">
              <span>👥</span> Group Name
            </span>
            <select
              value={selectedGroupName}
              onChange={(e) => onGroupNameChange(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border outline-hidden transition-colors cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-[#002766]'
                  : 'bg-zinc-950 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
              }`}
            >
              {GROUP_NAME_OPTIONS.map((grp) => (
                <option key={grp} value={grp}>
                  {grp}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Nút Cấu trúc */}
          <div className="flex flex-col justify-end self-end">
            <button
              type="button"
              onClick={onOpenStructureModal}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
                isFoxconn
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                  : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border-zinc-700 hover:border-zinc-600 shadow-2xs'
              }`}
              title="Xem toàn bộ sơ đồ cấu trúc cây Face > Group > Rack > Slot"
            >
              <span className="text-sm">🌳</span>
              <span>Cấu trúc</span>
            </button>
          </div>
        </div>

        {/* Right Side: 3 Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 self-end xl:self-auto justify-end">
          {/* Nút Tải lại từ database */}
          <button
            type="button"
            onClick={onReloadDatabase}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200/80'
                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
            }`}
            title="Tải lại dữ liệu từ database"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="hidden sm:inline">Tải lại từ database</span>
            <span className="sm:hidden">Tải lại</span>
          </button>

          {/* Nút Thêm mới */}
          <button
            type="button"
            onClick={() => onAddNewFace()}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer ${
              isFoxconn
                ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200/90 shadow-2xs'
                : 'bg-zinc-800 hover:bg-zinc-700 text-[#76B900] border-zinc-700 shadow-2xs'
            }`}
            title="Thêm mới Face / Mặt tủ"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm mới</span>
          </button>

          {/* Nút Lưu layout (Primary Action) */}
          <button
            type="button"
            onClick={onSaveLayout}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20 active:scale-98'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[0_0_15px_rgba(118,185,0,0.3)] active:scale-98'
            }`}
            title="Lưu bố cục layout (Ctrl + S)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
            <span>Lưu layout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

