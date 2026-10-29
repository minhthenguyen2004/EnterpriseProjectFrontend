import { useState, useRef, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';

export default function MachineConfigToolbar({
  searchQuery,
  onSearchChange,
  onOpenCreateModal,
  onOpenExcelModal,
  onExportCsv
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [isExcelDropdownOpen, setIsExcelDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsExcelDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut F2 or Ctrl+N to open create modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'F2' || (e.ctrlKey && e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        onOpenCreateModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenCreateModal]);

  return (
    <div className={`relative z-30 p-4 rounded-2xl border transition-all ${
      isFoxconn
        ? 'bg-white border-slate-200/80 shadow-xs'
        : 'bg-zinc-900/80 border-zinc-800 shadow-md backdrop-blur-md'
    }`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Instant Search Box */}
        <div className="relative w-full md:w-96 lg:w-105">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên máy, IP, hostname, chuyền, sản phẩm..."
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all outline-none border ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-100'
                : 'bg-zinc-950 border-zinc-800 placeholder-zinc-500 focus:ring-2 focus:ring-[#76B900]/20'
            }`}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"
              title="Xóa tìm kiếm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Right: Actions Group */}
        <div className="flex items-center gap-2.5 flex-wrap self-end md:self-auto">
          {/* Excel Import / Export Menu */}
          <div className="relative z-50" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsExcelDropdownOpen(!isExcelDropdownOpen)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer shadow-xs ${
                isFoxconn
                  ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  : 'bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300'
              }`}
            >
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Import / Export Excel</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${isExcelDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isExcelDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-xl z-50 py-1.5 transition-all ${
                isFoxconn
                  ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/80'
                  : 'bg-zinc-900 border-zinc-700 text-white shadow-2xl backdrop-blur-xl'
              }`}>
                <button
                  type="button"
                  onClick={() => {
                    setIsExcelDropdownOpen(false);
                    onOpenExcelModal();
                  }}
                  className={`w-full px-4 py-2.5 text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isFoxconn ? 'hover:bg-blue-50 text-slate-700 hover:text-blue-700' : 'hover:bg-zinc-800 text-zinc-200 hover:text-[#76B900]'
                  }`}
                >
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <div>
                    <div className="font-bold">Nhập từ Excel (.xlsx)</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">Kéo thả file & kiểm tra cú pháp</div>
                  </div>
                </button>

                <div className={`my-1 border-t ${isFoxconn ? 'border-slate-100' : 'border-zinc-800'}`} />

                <button
                  type="button"
                  onClick={() => {
                    setIsExcelDropdownOpen(false);
                    onExportCsv();
                  }}
                  className={`w-full px-4 py-2.5 text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isFoxconn ? 'hover:bg-emerald-50 text-slate-700 hover:text-emerald-700' : 'hover:bg-zinc-800 text-zinc-200 hover:text-emerald-400'
                  }`}
                >
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <div>
                    <div className="font-bold">Xuất dữ liệu Excel/CSV</div>
                    <div className="text-[10px] text-slate-400 dark:text-zinc-500">Tải file danh sách đã lọc</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Create Machine Button */}
          <button
            type="button"
            onClick={onOpenCreateModal}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[#76B900]/25'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Thêm Máy Mới</span>
            <kbd className={`hidden sm:inline-block px-1.5 py-0.5 text-[9px] rounded font-mono font-bold ${
              isFoxconn ? 'bg-white/20 text-white' : 'bg-black/20 text-black'
            }`}>
              F2
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}
