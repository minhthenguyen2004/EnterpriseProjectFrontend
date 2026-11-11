import React, { useState } from 'react';
import useTheme from '../../../../../hooks/useTheme';
import { SAMPLE_SERIAL_NUMBERS, INITIAL_PRODUCT_MODELS } from '../../mock/productNvidiaMockData';

export default function SearchSerialNumberModal({
  isOpen,
  onClose,
  onFilterByModel,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const [serialInput, setSerialInput] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (snToSearch = serialInput) => {
    const sn = (snToSearch || '').trim();
    if (!sn) return;

    setSearched(true);

    // 1. Check exact sample match
    const foundSample = SAMPLE_SERIAL_NUMBERS.find(
      (s) => s.sn.toLowerCase() === sn.toLowerCase()
    );

    let targetModelName = foundSample ? foundSample.model : null;

    // 2. If not found, match by prefix or model name in raw list
    if (!targetModelName) {
      const foundInList = INITIAL_PRODUCT_MODELS.find((m) => {
        if (m.serialPrefix && sn.toUpperCase().includes(m.serialPrefix.toUpperCase())) {
          return true;
        }
        if (sn.toUpperCase().includes(m.model.toUpperCase())) {
          return true;
        }
        return false;
      });
      if (foundInList) {
        targetModelName = foundInList.model;
      }
    }

    if (targetModelName) {
      const fullItem = INITIAL_PRODUCT_MODELS.find((m) => m.model === targetModelName);
      setSearchResult(fullItem || { model: targetModelName, product: 'NVIDIA Hardware', modelName: 'Matched System' });
    } else {
      setSearchResult(null);
    }
  };

  const handleQuickSelectSN = (sn) => {
    setSerialInput(sn);
    handleSearch(sn);
  };

  const handleApplyFilter = () => {
    if (searchResult) {
      onFilterByModel(searchResult.model);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden transform transition-all ${
          isFoxconn
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-zinc-900 border-zinc-700 text-zinc-100'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isFoxconn ? 'bg-slate-50 border-slate-200' : 'bg-zinc-800/80 border-zinc-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isFoxconn ? 'bg-blue-100 text-[#002766]' : 'bg-[#76B900]/20 text-[#76B900]'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold">Tìm Bằng Serial Number</h3>
              <p className="text-xs text-slate-400">
                Quét mã vạch hoặc nhập số Serial của thiết bị để tra cứu Model
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 p-1 rounded-md cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Input Box */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 opacity-80">
              Nhập hoặc Quét Serial Number (SN)
            </label>
            <div className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Ví dụ: SN-GB200-NVL72-2026-001..."
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                className={`w-full pl-10 pr-24 py-2.5 text-sm rounded-xl border font-mono transition-colors outline-hidden ${
                  isFoxconn
                    ? 'bg-slate-50 border-slate-300 text-slate-800 focus:border-blue-500 focus:bg-white'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-100 focus:border-[#76B900]'
                }`}
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
              <button
                type="button"
                onClick={() => handleSearch()}
                className={`absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isFoxconn
                    ? 'bg-[#002766] hover:bg-[#003893] text-white'
                    : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
                }`}
              >
                Tra cứu
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Gợi ý: Nhấn <kbd className="px-1 py-0.5 border rounded bg-slate-100 dark:bg-zinc-800 font-mono text-[10px]">Enter</kbd> hoặc dùng đầu đọc mã vạch quét trực tiếp.
            </p>
          </div>

          {/* Quick Click Samples */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
              Mẫu Serial thử nghiệm nhanh:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_SERIAL_NUMBERS.slice(0, 4).map((s) => (
                <button
                  key={s.sn}
                  type="button"
                  onClick={() => handleQuickSelectSN(s.sn)}
                  className={`px-2 py-1 rounded text-[11px] font-mono border transition-all cursor-pointer ${
                    isFoxconn
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {s.sn}
                </button>
              ))}
            </div>
          </div>

          {/* Search Results Display */}
          {searched && (
            <div className="mt-4">
              {searchResult ? (
                <div
                  className={`p-4 rounded-xl border animate-in fade-in ${
                    isFoxconn
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                      : 'bg-emerald-950/30 border-emerald-800/80 text-emerald-100'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-[#76B900] mb-1">
                        ✓ Đã xác định Model sản phẩm
                      </div>
                      <div className="text-base font-bold font-mono">
                        Model: {searchResult.model}
                      </div>
                      <div className="text-xs font-semibold opacity-90 mt-0.5">
                        Product: {searchResult.product}
                      </div>
                      <div className="text-xs opacity-75 mt-1">
                        {searchResult.modelName}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleApplyFilter}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs ${
                        isFoxconn
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold'
                      }`}
                    >
                      Lọc trong bảng dữ liệu
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border text-center text-xs ${
                    isFoxconn
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-amber-950/30 border-amber-800/80 text-amber-200'
                  }`}
                >
                  Không tìm thấy Model nào tương ứng với số Serial: <strong>{serialInput}</strong>.
                  Vui lòng kiểm tra lại mã hoặc tạo mới model.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-inherit flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors cursor-pointer ${
              isFoxconn
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
            }`}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

