import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import MachineStatusRectCard from './MachineStatusRectCard';

export default function MachineCardGrid({
  machines = [],
  allCount = 0,
  filters,
  onResetFilters,
  onSelectMachine,
  sortBy,
  onSortChange,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';
  const [viewMode, setViewMode] = useState('standard'); // 'standard' | 'compact'

  return (
    <div className="space-y-3.5">
      {/* Thanh công cụ phụ trên đầu lưới (Result Count, Bộ chuyển chế độ xem, Sắp xếp) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-1">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`font-bold ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
            Danh Sách Trạm Máy:
          </span>
          <span
            className={`font-bold text-[11px] px-2 py-0.5 rounded-full ${
              isFoxconn ? 'bg-slate-200 text-slate-800' : 'bg-zinc-800 text-[#76B900]'
            }`}
          >
            {machines.length} / {allCount} máy
          </span>

          {/* Nếu đang tìm kiếm text thì hiển thị chip từ khóa */}
          {filters?.searchQuery && (
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                isFoxconn ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-zinc-800 border-zinc-700 text-[#76B900]'
              }`}
            >
              <span>Từ khóa: "{filters.searchQuery}"</span>
            </span>
          )}
        </div>

        {/* Nhóm công cụ bên phải: Chuyển đổi View Mode & Sắp xếp */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          {/* Bộ chuyển đổi chế độ xem: Tiêu chuẩn vs Thu gọn */}
          <div
            className={`flex items-center p-0.5 rounded-xl border text-xs font-bold ${
              isFoxconn
                ? 'bg-slate-100 border-slate-200 text-slate-600'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <button
              type="button"
              onClick={() => setViewMode('standard')}
              title="Chế độ xem Tiêu chuẩn (Đầy đủ thông tin)"
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                viewMode === 'standard'
                  ? isFoxconn
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'bg-zinc-800 text-white shadow-xs'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Tiêu chuẩn</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('compact')}
              title="Chế độ xem Thu gọn (Ít chữ, xem nhiều máy)"
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-[11px] ${
                viewMode === 'compact'
                  ? isFoxconn
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'bg-zinc-800 text-white shadow-xs'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              <span>Thu gọn</span>
            </button>
          </div>

          {/* Bộ sắp xếp nhanh */}
          <div className="flex items-center gap-1.5">
            <select
              value={sortBy}
              onChange={(e) => onSortChange && onSortChange(e.target.value)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-900 border-zinc-700 text-white'
              }`}
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="name">Tên máy (A → Z)</option>
              <option value="ip">Địa chỉ IP</option>
              <option value="status">Ưu tiên máy lỗi (ERROR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lưới các ô hình chữ nhật: Tự động co giãn / cuộn dòng theo kích thước màn hình và mức zoom */}
      {machines.length > 0 ? (
        <div
          className={`grid ${viewMode === 'compact' ? 'gap-2.5' : 'gap-3.5'} transition-all duration-300`}
          style={{
            gridTemplateColumns:
              viewMode === 'compact'
                ? 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))'
                : 'repeat(auto-fill, minmax(min(100%, 210px), 1fr))',
          }}
        >
          {machines.map((machine) => (
            <MachineStatusRectCard
              key={machine.id}
              machine={machine}
              onSelect={onSelectMachine}
              compact={viewMode === 'compact'}
            />
          ))}
        </div>
      ) : (
        /* Empty State khi không tìm thấy máy phù hợp */
        <div
          className={`p-12 rounded-3xl border text-center flex flex-col items-center justify-center space-y-3 ${
            isFoxconn ? 'bg-white border-slate-200 shadow-2xs' : 'bg-zinc-900/90 border-zinc-800 text-white'
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
              isFoxconn ? 'bg-slate-100 text-slate-400' : 'bg-zinc-800 text-zinc-500'
            }`}
          >
            🔍
          </div>
          <div>
            <h3 className={`text-base font-black ${isFoxconn ? 'text-slate-800' : 'text-white'}`}>
              Không Tìm Thấy Máy Nào Phù Hợp
            </h3>
            <p className={`text-xs mt-1 max-w-sm ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
              Không có máy nào thỏa mãn các tiêu chí lọc hoặc từ khóa tìm kiếm hiện tại. Bạn vui lòng thử lại với tiêu chí khác.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-blue-900 text-white'
                : 'bg-[#76B900] hover:bg-[#86D400] text-black font-black'
            }`}
          >
            Đặt Lại Bộ Lọc Mặc Định
          </button>
        </div>
      )}
    </div>
  );
}
