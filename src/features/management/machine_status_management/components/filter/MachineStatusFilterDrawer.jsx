import { useState, useEffect } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import {
  FACTORIES,
  FLOORS,
  AREAS,
  STATUS_FILTER_OPTIONS,
  DEFAULT_FILTERS,
} from '../../constants/machineStatusConstants';

export default function MachineStatusFilterDrawer({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  activeCount = 0,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Draft filters để chỉnh sửa trước khi bấm Áp Dụng
  const [draftFilters, setDraftFilters] = useState(filters);

  // Đồng bộ draftFilters khi filters từ bên ngoài thay đổi
  useEffect(() => {
    setDraftFilters(filters);
  }, [filters, isOpen]);

  const handleChange = (key, value) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApplyFilters && onApplyFilters(draftFilters);
    onClose && onClose();
  };

  const handleReset = () => {
    setDraftFilters(DEFAULT_FILTERS);
    onResetFilters && onResetFilters();
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop mờ phía sau */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel trượt ra từ lề trái */}
      <div
        className={`fixed inset-y-0 left-0 max-w-full flex pl-0 z-50 animate-slide-right ${
          isFoxconn ? 'text-slate-900' : 'text-white'
        }`}
      >
        <div
          className={`w-screen max-w-sm sm:max-w-md h-full flex flex-col shadow-2xl border-r transition-all ${
            isFoxconn
              ? 'bg-white border-slate-200'
              : 'bg-zinc-900/95 border-zinc-800 backdrop-blur-xl'
          }`}
        >
          {/* 1. Header Drawer */}
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                  isFoxconn ? 'bg-blue-100 text-[#002766]' : 'bg-[#76B900]/20 text-[#76B900]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.2"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div>
                <h3 className={`text-sm font-black uppercase tracking-wider ${isFoxconn ? 'text-slate-900' : 'text-white'}`}>
                  BỘ LỌC TRẠNG THÁI MÁY
                </h3>
                <p className={`text-[10px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {activeCount > 0
                    ? `Đang áp dụng ${activeCount} tiêu chí lọc`
                    : 'Chưa áp dụng tiêu chí lọc nào'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                isFoxconn
                  ? 'hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                  : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title="Đóng bảng lọc"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 2. Thân Drawer: 5 Tiêu Chí Lọc */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* TIÊU CHÍ 1: TÌM KIẾM THEO TÊN MÁY HOẶC IP (NHẬP TEXT) */}
            <div className="space-y-1.5">
              <label className={`font-bold flex items-center justify-between ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Tìm kiếm theo Tên máy hoặc Địa chỉ IP:</span>
                </span>
                {draftFilters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleChange('searchQuery', '')}
                    className="text-[10px] text-rose-500 hover:underline cursor-pointer"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={draftFilters.searchQuery}
                  onChange={(e) => handleChange('searchQuery', e.target.value)}
                  placeholder="Nhập tên máy (vd: SMT #01) hoặc IP (vd: 192.168)..."
                  className={`w-full text-xs px-3 py-2.5 rounded-xl border focus:outline-none transition-all pr-8 ${
                    isFoxconn
                      ? 'bg-white border-slate-300 text-slate-800 focus:ring-1 focus:ring-blue-500'
                      : 'bg-zinc-800 border-zinc-700 text-white focus:ring-1 focus:ring-[#76B900]'
                  }`}
                />
                {draftFilters.searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleChange('searchQuery', '')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* TIÊU CHÍ 2: NHÀ MÁY (FACTORY) */}
            <div className="space-y-1.5">
              <label className={`font-bold flex items-center gap-1.5 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Nhà Máy (Factory):</span>
              </label>
              <select
                value={draftFilters.factoryId}
                onChange={(e) => handleChange('factoryId', e.target.value)}
                className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-800 border-zinc-700 text-white'
                }`}
              >
                {FACTORIES.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TIÊU CHÍ 3: TẦNG (FLOOR) */}
            <div className="space-y-1.5">
              <label className={`font-bold flex items-center gap-1.5 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Tầng Xưởng (Floor):</span>
              </label>
              <select
                value={draftFilters.floorId}
                onChange={(e) => handleChange('floorId', e.target.value)}
                className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-800 border-zinc-700 text-white'
                }`}
              >
                {FLOORS.map((fl) => (
                  <option key={fl.id} value={fl.id}>
                    {fl.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TIÊU CHÍ 4: KHU VỰC (AREA) */}
            <div className="space-y-1.5">
              <label className={`font-bold flex items-center gap-1.5 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Khu Vực Sản Xuất (Area):</span>
              </label>
              <select
                value={draftFilters.areaId}
                onChange={(e) => handleChange('areaId', e.target.value)}
                className={`w-full text-xs font-semibold px-3 py-2 rounded-xl border focus:outline-none cursor-pointer transition-all ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-800 border-zinc-700 text-white'
                }`}
              >
                {AREAS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TIÊU CHÍ 5: TRẠNG THÁI MÁY (STATUS) */}
            <div className="space-y-1.5">
              <label className={`font-bold flex items-center gap-1.5 ${isFoxconn ? 'text-slate-700' : 'text-zinc-200'}`}>
                <svg className="w-3.5 h-3.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Trạng Thái Vận Hành (Status):</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {STATUS_FILTER_OPTIONS.map((opt) => {
                  const isSelected = draftFilters.status === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleChange('status', opt.id)}
                      className={`px-2.5 py-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-left flex items-center justify-between ${
                        isSelected
                          ? isFoxconn
                            ? 'bg-[#002766] text-white border-blue-900 shadow-xs'
                            : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-[0_0_8px_rgba(118,185,0,0.3)]'
                          : isFoxconn
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <span>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Footer Drawer: Nút Đặt Lại & Nút Áp Dụng Lọc */}
          <div
            className={`p-4 border-t flex items-center justify-between gap-3 ${
              isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950/80 border-zinc-800'
            }`}
          >
            <button
              type="button"
              onClick={handleReset}
              className={`w-1/2 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isFoxconn
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'
              }`}
            >
              Đặt Lại Mặc Định
            </button>
            <button
              type="button"
              onClick={handleApply}
              className={`w-1/2 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
                isFoxconn
                  ? 'bg-[#002766] hover:bg-blue-900 text-white shadow-blue-900/20'
                  : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[0_0_15px_rgba(118,185,0,0.35)]'
              }`}
            >
              Áp Dụng Lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
