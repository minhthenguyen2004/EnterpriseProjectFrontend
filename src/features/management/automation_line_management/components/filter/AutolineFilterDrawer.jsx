import { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import { LINES, PRODUCT_TYPES } from '../../data/autolineMockData';
import DateTimeFilterGroup from './DateTimeFilterGroup';

const POPULAR_SUGGESTIONS = [
  'NVIDIA HGX H100',
  'NVIDIA HGX B200',
  'GB200 NVL72',
  'NVLink Switch Blade',
  'Titanium Power Shelf',
];

export default function AutolineFilterDrawer({
  isOpen,
  onClose,
  filter,
  onApplyFilter,
  onResetFilter,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // State tạm trong drawer trước khi nhấn "Áp Dụng"
  const [draftFilter, setDraftFilter] = useState(filter);

  const handleUpdateDraft = (changes) => {
    setDraftFilter((prev) => ({ ...prev, ...changes }));
  };

  const handleApply = () => {
    onApplyFilter(draftFilter);
    onClose();
  };

  const handleReset = () => {
    onResetFilter();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Backdrop mờ phía sau */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer trượt từ lề trái */}
      <div
        className={`relative z-50 w-96 max-w-[92vw] h-full flex flex-col shadow-2xl transition-all duration-300 ${
          isFoxconn
            ? 'bg-white border-r border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-r border-zinc-800 text-white backdrop-blur-xl'
        }`}
      >
        {/* Header Drawer */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <span className={`p-1.5 rounded-lg ${isFoxconn ? 'bg-blue-100 text-[#002766]' : 'bg-[#76B900]/20 text-[#76B900]'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </span>
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wide ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
                BỘ LỌC CHUYỀN THÔNG MINH
              </h2>
              <p className={`text-[10px] ${isFoxconn ? 'text-slate-400' : 'text-white'}`}>Cập nhật đồng bộ toàn bộ số liệu trang</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors cursor-pointer"
            title="Đóng bộ lọc"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nội dung các trường lọc (Cuộn độc lập) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Tiêu chí 1: Ngày & Giờ (Lọc theo ngày giờ trực tiếp, không dùng ca) */}
          <DateTimeFilterGroup
            enableDateTime={draftFilter.enableDateTime}
            startDate={draftFilter.startDate}
            endDate={draftFilter.endDate}
            onChange={handleUpdateDraft}
          />

          {/* Tiêu chí 2: Tên Sản Phẩm (Nhập Text) */}
          <div className={`p-4 rounded-2xl border ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'}`}>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${isFoxconn ? 'text-slate-700' : 'text-white'}`}>
              1. Tên Sản Phẩm (Nhập Text)
            </label>
            <p className={`text-[11px] mb-2 ${isFoxconn ? 'text-slate-400' : 'text-white'}`}>
              Nhập tên hoặc mã model linh kiện để lọc chuyền
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tên sản phẩm (vd: H100, B200, GB200, NVLink...)"
                value={draftFilter.productName || ''}
                onChange={(e) => handleUpdateDraft({ productName: e.target.value })}
                className={`w-full text-xs font-semibold px-3 py-2.5 rounded-xl border focus:outline-none transition-all ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800 focus:ring-1 focus:ring-blue-500'
                    : 'bg-zinc-800 border-zinc-700 text-white focus:ring-1 focus:ring-[#76B900]'
                }`}
              />
              {draftFilter.productName && (
                <button
                  type="button"
                  onClick={() => handleUpdateDraft({ productName: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white cursor-pointer"
                  title="Xóa chữ"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Tiêu chí 3: Tên Chuyền (Line Name) */}
          <div className={`p-4 rounded-2xl border ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'}`}>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isFoxconn ? 'text-slate-700' : 'text-white'}`}>
              2. Tên Chuyền Sản Xuất
            </label>
            <select
              value={draftFilter.lineId}
              onChange={(e) => handleUpdateDraft({ lineId: e.target.value })}
              className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              {LINES.map((line) => (
                <option key={line.id} value={line.id} className="text-black">
                  {line.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tiêu chí 4: Loại Sản Phẩm (Product Type) */}
          <div className={`p-4 rounded-2xl border ${isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-zinc-800'}`}>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isFoxconn ? 'text-slate-700' : 'text-white'}`}>
              3. Loại Sản Phẩm
            </label>
            <select
              value={draftFilter.productTypeId}
              onChange={(e) => handleUpdateDraft({ productTypeId: e.target.value })}
              className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer ${
                isFoxconn
                  ? 'bg-white border-slate-300 text-slate-800'
                  : 'bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type.id} value={type.id} className="text-black">
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer Drawer: Nút Áp dụng & Đặt lại */}
        <div className="p-4 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'
            }`}
          >
            Đặt Lại Mặc Định
          </button>

          <button
            type="button"
            onClick={handleApply}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer ${
              isFoxconn
                ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-950/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[#76B900]/25'
            }`}
          >
            Áp Dụng Bộ Lọc
          </button>
        </div>
      </div>
    </div>
  );
}
