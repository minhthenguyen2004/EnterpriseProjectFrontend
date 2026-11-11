import useTheme from '../../../../hooks/useTheme';

export default function AutolineTopScannerBar({
  scanMode,
  onChangeScanMode,
  searchTerm,
  onChangeSearchTerm,
  onSearch,
  onOpenCamera,
  onOpenImageUpload
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(searchTerm);
    }
  };

  const scanModes = [
    {
      id: 'manual',
      label: 'Nhập thủ công',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      id: 'camera',
      label: 'Camera',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'image',
      label: 'Quét từ ảnh',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleSelectMode = (modeId) => {
    onChangeScanMode(modeId);
    if (modeId === 'camera' && onOpenCamera) {
      onOpenCamera();
    } else if (modeId === 'image' && onOpenImageUpload) {
      onOpenImageUpload();
    }
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-zinc-900/60 border-zinc-800/80 shadow-xl'
      }`}
    >
      {/* 1. Hàng tùy chọn phương thức quét */}
      <div className="flex flex-wrap items-center gap-2 mb-3.5">
        <span className={`text-xs font-bold ${isFoxconn ? 'text-slate-500 dark:text-zinc-400' : 'text-white'} mr-1`}>
          Phương thức:
        </span>
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800">
          {scanModes.map((mode) => {
            const isSelected = scanMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => handleSelectMode(mode.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? isFoxconn
                      ? 'bg-white text-[#002766] shadow-sm font-black'
                      : 'bg-zinc-800 text-[#76B900] shadow-[0_0_10px_rgba(118,185,0,0.3)] font-black'
                    : isFoxconn
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                }`}
              >
                <span className={isSelected ? (isFoxconn ? 'text-[#002766]' : 'text-[#76B900]') : 'opacity-60'}>
                  {mode.icon}
                </span>
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Ô text input nhập mã + Nút Tìm kiếm */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-zinc-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onChangeSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Quét hoặc nhập SN, Carrier, Keypart,..…"
            className={`w-full pl-10 pr-9 py-2.5 text-xs font-mono font-bold rounded-xl border transition-all outline-hidden ${
              isFoxconn
                ? 'bg-slate-50/80 border-slate-300 text-slate-800 focus:ring-2 focus:ring-[#002766]/10'
                : 'bg-zinc-950/80 border-zinc-700/80 text-zinc-100 focus:ring-2 focus:ring-[#76B900]/15'
            }`}
          />

          {/* Quick Clear */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => onChangeSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 cursor-pointer"
              title="Xóa tìm kiếm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Nút Tìm kiếm */}
        <button
          type="button"
          onClick={() => onSearch(searchTerm)}
          className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 shrink-0 ${
            isFoxconn
              ? 'bg-[#002766] hover:bg-[#003893] text-white shadow-blue-900/20'
              : 'bg-[#76B900] hover:bg-[#86d400] text-black shadow-[0_0_15px_rgba(118,185,0,0.3)]'
          }`}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Tìm kiếm</span>
        </button>
      </div>
    </div>
  );
}

