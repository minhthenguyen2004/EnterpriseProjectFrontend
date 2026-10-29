import { useState, useMemo, useEffect } from 'react';
import useTheme from '../../../../../../hooks/useTheme';

export default function AoiDataTab({
  aoiData = [],
  onSelectAoiItem,
}) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  // Filter mode: 'all' | 'step'
  const [filterMode, setFilterMode] = useState('all');
  const [selectedStepFilter, setSelectedStepFilter] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadSingleSuccess, setDownloadSingleSuccess] = useState(false);

  // Danh sách các Step độc nhất để lọc
  const uniqueSteps = useMemo(() => {
    return Array.from(new Set(aoiData.map((d) => d.step)));
  }, [aoiData]);

  const filteredData = useMemo(() => {
    if (filterMode === 'step' && selectedStepFilter) {
      return aoiData.filter((d) => d.step === selectedStepFilter);
    }
    return aoiData;
  }, [aoiData, filterMode, selectedStepFilter]);

  // Phần tử AOI đang được chọn xem ảnh ở khung bên phải (mặc định là dòng đầu tiên)
  const [selectedItem, setSelectedItem] = useState(() => aoiData[0] || null);

  // Cập nhật selectedItem khi dữ liệu lọc thay đổi
  useEffect(() => {
    if (filteredData.length > 0) {
      if (!selectedItem || !filteredData.some((d) => d.id === selectedItem.id)) {
        setSelectedItem(filteredData[0]);
      }
    } else {
      setSelectedItem(null);
    }
  }, [filteredData, selectedItem]);

  const handleRowClick = (item) => {
    setSelectedItem(item);
    if (onSelectAoiItem) {
      onSelectAoiItem(item);
    }
  };

  const handleDownloadAll = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleDownloadSingle = () => {
    setDownloadSingleSuccess(true);
    setTimeout(() => setDownloadSingleSuccess(false), 2000);
  };

  const isSelectedFail = selectedItem?.result === 'FAIL' || selectedItem?.result === 'NG';

  return (
    <div className="flex flex-col h-full space-y-2.5">
      {/* 1. THANH ĐIỀU KHIỂN & BỘ LỌC */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-slate-200/60 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          {/* Nút 1: Lọc theo Step & Sequence */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onClick={() => {
                if (filterMode === 'step') {
                  setFilterMode('all');
                  setSelectedStepFilter('');
                } else {
                  setFilterMode('step');
                  if (uniqueSteps.length > 0 && !selectedStepFilter) {
                    setSelectedStepFilter(uniqueSteps[0]);
                  }
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                filterMode === 'step'
                  ? isFoxconn
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-sm'
                  : isFoxconn
                    ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Lọc theo Step & Sequence</span>
            </button>

            {filterMode === 'step' && uniqueSteps.length > 0 && (
              <select
                value={selectedStepFilter}
                onChange={(e) => setSelectedStepFilter(e.target.value)}
                className={`ml-2 px-2.5 py-1.5 text-xs rounded-xl border focus:outline-hidden ${
                  isFoxconn
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-zinc-900 border-zinc-700 text-white'
                }`}
              >
                {uniqueSteps.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Nút 2: Xem tất cả */}
          <button
            type="button"
            onClick={() => {
              setFilterMode('all');
              setSelectedStepFilter('');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              filterMode === 'all'
                ? isFoxconn
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-[#76B900] text-black border-[#76B900] font-black shadow-sm'
                : isFoxconn
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800'
            }`}
          >
            <span>Xem tất cả ({aoiData.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Nút Download all images trên toolbar */}
          <button
            type="button"
            onClick={handleDownloadAll}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              downloadSuccess
                ? 'bg-emerald-600 text-white border-emerald-600'
                : isFoxconn
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{downloadSuccess ? '✓ Đã tải trọn bộ' : `Tải tất cả (${filteredData.length} ảnh)`}</span>
          </button>
        </div>
      </div>

      {/* 2. BỐ CỤC CHIA LÀM 2 PHẦN: BÊN TRÁI (BẢNG DỮ LIỆU) & BÊN PHẢI (ẢNH QUANG HỌC) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0">
        {/* =========================================================================
            PHẦN 1: BÊN TRÁI - BẢNG 6 TRƯỜNG DỮ LIỆU AOI (Chiếm 7 cột trên màn hình lớn)
            ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col min-h-0">
          <div
            className="flex-1 overflow-y-auto max-h-56 sm:max-h-68 lg:max-h-76 xl:max-h-84 rounded-xl border border-slate-200/70 dark:border-zinc-800"
            style={{ scrollbarWidth: 'thin' }}
          >
            <table className="w-full text-xs text-left border-collapse">
              <thead
                className={`sticky top-0 z-10 text-[10px] font-black uppercase tracking-wider ${
                  isFoxconn ? 'bg-slate-100 text-slate-600' : 'bg-zinc-950 text-zinc-400'
                }`}
              >
                <tr>
                  <th className="py-2.5 px-2.5 text-center w-10">#</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Step</th>
                  <th className="py-2.5 px-2.5 font-bold">Camera</th>
                  <th className="py-2.5 px-2.5">POV</th>
                  <th className="py-2.5 px-2.5 text-center">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 text-[11px]">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 dark:text-zinc-500 font-sans">
                      Không tìm thấy điểm kiểm tra AOI phù hợp
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, idx) => {
                    const isFail = item.result === 'FAIL' || item.result === 'NG';
                    const isSelected = selectedItem?.id === item.id;

                    return (
                      <tr
                        key={item.id}
                        onClick={() => handleRowClick(item)}
                        className={`transition-all cursor-pointer select-none group border-l-4 ${
                          isSelected
                            ? isFoxconn
                              ? 'bg-blue-50/90 border-blue-600 text-slate-900 shadow-2xs font-semibold'
                              : 'bg-zinc-800/95 border-[#76B900] text-white shadow-sm font-semibold'
                            : isFoxconn
                              ? 'border-transparent hover:bg-blue-50/40 text-slate-700'
                              : 'border-transparent hover:bg-zinc-800/50 text-zinc-200'
                        }`}
                      >
                        <td className="py-2 px-2.5 text-center font-bold">
                          {isSelected ? (
                            <span className={isFoxconn ? 'text-blue-600 font-black' : 'text-[#76B900] font-black'}>
                              ▶ {idx + 1}
                            </span>
                          ) : (
                            <span className={isFoxconn ? 'text-slate-400' : 'text-zinc-400'}>
                              {idx + 1}
                            </span>
                          )}
                        </td>
                        <td className={`py-2 px-3 font-bold ${
                          isFoxconn ? 'text-slate-900' : 'text-white'
                        }`}>
                          <div className="flex items-center gap-1.5">
                            <span>{item.type}</span>
                            {isSelected && (
                              <span className="text-[10px] opacity-75" title="Đang xem ảnh bên phải">📷</span>
                            )}
                          </div>
                        </td>
                        <td className={`py-2 px-3 font-medium ${
                          isFoxconn ? 'text-slate-700' : 'text-zinc-300'
                        }`}>
                          {item.step}
                        </td>
                        <td className={`py-2 px-2.5 font-bold text-[10.5px] ${
                          isFoxconn ? 'text-slate-800' : 'text-zinc-200'
                        }`}>
                          {item.camera}
                        </td>
                        <td className={`py-2 px-2.5 text-[10px] ${
                          isFoxconn ? 'text-slate-600' : 'text-zinc-400'
                        }`}>
                          {item.pov}
                        </td>
                        <td className="py-2 px-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-black inline-block ${
                              isFail
                                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                                : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                            }`}
                          >
                            {item.result}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Dòng chú thích & trạng thái bên dưới bảng */}
          <div className="flex items-center justify-between pt-1.5 px-1 text-[11px] text-slate-400">
            <span>
              💡 Nhấp vào bất kỳ dòng nào để đổi ảnh hiển thị bên phải
            </span>
            <span>
              Hiển thị: <strong className={isFoxconn ? 'text-slate-800' : 'text-white'}>{filteredData.length}</strong> / {aoiData.length} điểm
            </span>
          </div>
        </div>

        {/* =========================================================================
            PHẦN 2: BÊN PHẢI - KHUNG HIỂN THỊ ẢNH QUANG HỌC TRỰC TIẾP
            (Xuất hiện ngay lập tức khi click dòng - Không cần cửa sổ nổi popup)
            ========================================================================= */}
        <div
          className={`lg:col-span-5 flex flex-col justify-between rounded-xl border p-3 transition-all ${
            isFoxconn
              ? 'bg-white border-slate-200/90 shadow-2xs text-slate-800'
              : 'bg-zinc-950/80 border-zinc-800 text-white shadow-md'
          }`}
        >
          {selectedItem ? (
            <div className="flex flex-col h-full space-y-2.5">
              {/* Header của khung ảnh */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-zinc-800/60">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`p-1.5 rounded-lg text-base shrink-0 ${
                      isFoxconn ? 'bg-blue-100 text-blue-700' : 'bg-zinc-800 text-[#76B900]'
                    }`}
                  >
                    📷
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-xs font-black tracking-tight truncate">
                        {selectedItem.type} Inspection
                      </h4>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[9px] font-black ${
                          isSelectedFail
                            ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                            : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                        }`}
                      >
                        {selectedItem.result}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-400 font-bold truncate">
                      {selectedItem.camera} • {selectedItem.pov}
                    </p>
                  </div>
                </div>

                {/* Độ tin cậy AI */}
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase">Độ tin cậy</span>
                  <span className={`text-[11px] font-bold ${isSelectedFail ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {selectedItem.confidence || '99.5%'}
                  </span>
                </div>
              </div>

              {/* Khung Vision Image Canvas mô phỏng ảnh quang học bo mạch điện tử chất lượng cao */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-300 dark:border-zinc-700 bg-zinc-950 flex items-center justify-center shadow-inner">
                <svg className="w-full h-full select-none" viewBox="0 0 600 360" fill="none">
                  {/* Nền mạch PCB vi tính */}
                  <rect width="600" height="360" fill="#092015" />
                  <defs>
                    <pattern id={`pcbGrid_${selectedItem.id}`} width="28" height="28" patternUnits="userSpaceOnUse">
                      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#0e3a24" strokeWidth="1" />
                      <circle cx="14" cy="14" r="1.5" fill="#134e2c" />
                    </pattern>
                  </defs>
                  <rect width="600" height="360" fill={`url(#pcbGrid_${selectedItem.id})`} />

                  {/* Đường dẫn mạch đồng (Copper Traces) */}
                  <path d="M 40 80 L 180 80 L 240 140 L 460 140" stroke="#16a34a" strokeWidth="2.5" opacity="0.65" />
                  <path d="M 60 280 L 210 280 L 260 220 L 540 220" stroke="#16a34a" strokeWidth="2.5" opacity="0.65" />
                  <path d="M 110 30 L 110 330" stroke="#15803d" strokeWidth="2" opacity="0.4" />
                  <path d="M 490 30 L 490 330" stroke="#15803d" strokeWidth="2" opacity="0.4" />

                  {/* Khối chip IC / BGA Area */}
                  <rect x="190" y="80" width="220" height="190" rx="8" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                  <circle cx="210" cy="98" r="4" fill="#a1a1aa" />
                  <text x="300" y="178" fill="#71717a" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    NVIDIA B200 DIE
                  </text>
                  <text x="300" y="196" fill="#52525b" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    {selectedItem.step}
                  </text>

                  {/* Các linh kiện phụ xung quanh (Caps/Resistors) */}
                  <rect x="120" y="85" width="45" height="20" rx="2" fill="#2563eb" opacity="0.85" />
                  <rect x="120" y="125" width="45" height="20" rx="2" fill="#2563eb" opacity="0.85" />
                  <rect x="120" y="165" width="45" height="20" rx="2" fill="#2563eb" opacity="0.85" />
                  <rect x="120" y="205" width="45" height="20" rx="2" fill="#2563eb" opacity="0.85" />

                  <rect x="435" y="85" width="45" height="20" rx="2" fill="#d97706" opacity="0.85" />
                  <rect x="435" y="125" width="45" height="20" rx="2" fill="#d97706" opacity="0.85" />
                  <rect x="435" y="165" width="45" height="20" rx="2" fill="#d97706" opacity="0.85" />

                  {/* Vùng Bounding Box kiểm tra quang học */}
                  <g>
                    <rect
                      x="215"
                      y="105"
                      width="170"
                      height="140"
                      rx="4"
                      fill={isSelectedFail ? 'rgba(239, 68, 68, 0.18)' : 'rgba(34, 197, 94, 0.18)'}
                      stroke={isSelectedFail ? '#ef4444' : '#22c55e'}
                      strokeWidth="2.5"
                      strokeDasharray="5 3"
                    />
                    {/* Góc ngắm quang học (Corner Crosshairs) */}
                    <path d="M 210 105 L 225 105 M 215 100 L 215 115" stroke={isSelectedFail ? '#ef4444' : '#22c55e'} strokeWidth="2.5" />
                    <path d="M 390 105 L 375 105 M 385 100 L 385 115" stroke={isSelectedFail ? '#ef4444' : '#22c55e'} strokeWidth="2.5" />
                    <path d="M 210 245 L 225 245 M 215 250 L 215 235" stroke={isSelectedFail ? '#ef4444' : '#22c55e'} strokeWidth="2.5" />
                    <path d="M 390 245 L 375 245 M 385 250 L 385 235" stroke={isSelectedFail ? '#ef4444' : '#22c55e'} strokeWidth="2.5" />

                    {/* Huy hiệu kết quả gắn trên Bounding Box */}
                    <rect
                      x="215"
                      y="81"
                      width="140"
                      height="22"
                      rx="4"
                      fill={isSelectedFail ? '#ef4444' : '#22c55e'}
                    />
                    <text x="224" y="96" fill="#ffffff" fontSize="11" fontFamily="sans-serif" fontWeight="900">
                      {selectedItem.result} • {selectedItem.confidence || '99.5%'}
                    </text>
                  </g>

                  {/* Telemetry OSD HUD Camera */}
                  <circle cx="25" cy="25" r="4" fill="#22c55e" className="animate-ping" />
                  <circle cx="25" cy="25" r="4" fill="#22c55e" />
                  <text x="36" y="29" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    LIVE [AOI-AI VISION] 60FPS
                  </text>
                  <text x="25" y="48" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
                    CAM: {selectedItem.camera} | POV: {selectedItem.pov}
                  </text>
                  <text x="575" y="29" fill="#22c55e" fontSize="11" fontFamily="monospace" textAnchor="end" fontWeight="bold">
                    ZOOM: 10X | AF: LOCK
                  </text>
                </svg>

                {/* Badge góc dưới khung ảnh */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-[10px] font-bold text-white/90 border border-white/10">
                  ID: #{selectedItem.id} • {selectedItem.type}
                </div>
              </div>

              {/* Action buttons của ảnh: Tải ảnh hiện tại */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 font-bold">
                  Độ phân giải: 4096 x 2160 (4K UHD)
                </span>

                <button
                  type="button"
                  onClick={handleDownloadSingle}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs border ${
                    downloadSingleSuccess
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : isFoxconn
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{downloadSingleSuccess ? '✓ Đã tải ảnh này' : 'Tải ảnh này'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Khi không có mục nào được chọn hoặc dữ liệu trống */
            <div className="flex flex-col items-center justify-center h-full min-h-60 text-center p-6 space-y-2 text-slate-400 dark:text-zinc-500">
              <span className="text-3xl">📷</span>
              <p className="text-xs font-semibold">Chưa có ảnh nào được chọn</p>
              <p className="text-[11px] max-w-xs">
                Vui lòng nhấp vào một dòng kiểm tra AOI bên trái để xem hình ảnh quang học tương ứng tại đây.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
