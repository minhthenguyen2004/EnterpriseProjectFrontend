import useTheme from '../../../../hooks/useTheme';

/**
 * ApiRequestInitialGuideState
 * Màn hình trạng thái hướng dẫn ban đầu (Render khi hasQueried === false)
 * Hiển thị trước khi người dùng thực hiện bấm nút "Query Data".
 */
export default function ApiRequestInitialGuideState({ onExecuteQuery }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`p-10 rounded-2xl border text-center transition-all ${
        isFoxconn
          ? 'bg-white border-slate-200/90 shadow-sm text-slate-800'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-lg'
      }`}
    >
      <div className="max-w-xl mx-auto flex flex-col items-center justify-center space-y-4">
        {/* Biểu Tượng Radar / API Pulse */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner ${
            isFoxconn
              ? 'bg-blue-50 text-blue-600 border border-blue-200/60'
              : 'bg-[#76B900]/10 text-[#76B900] border border-[#76B900]/20'
          }`}
        >
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h3
            className={`text-base font-extrabold uppercase tracking-wider ${
              isFoxconn ? 'text-slate-800' : 'text-zinc-100'
            }`}
          >
            Chưa Thực Hiện Truy Vấn Dữ Liệu API
          </h3>
          <p
            className={`text-xs leading-relaxed ${
              isFoxconn ? 'text-slate-500' : 'text-zinc-400'
            }`}
          >
            Bảng nhật ký yêu cầu API được thiết lập chế độ tải có điều kiện nhằm tối ưu hóa hiệu năng hệ thống.
            Vui lòng cấu hình các tiêu chí lọc ở khung phía trên và nhấn nút{' '}
            <strong className={isFoxconn ? 'text-blue-600' : 'text-[#76B900]'}>
              Query Data
            </strong>{' '}
            để tải danh sách bản tin.
          </p>
        </div>

        {/* 3 Thẻ Hướng Dẫn Nhanh */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full pt-2 text-left">
          <div
            className={`p-3 rounded-xl border text-xs ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>📅</span>
              <span>1. Thời Gian & Vùng</span>
            </div>
            <p className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
              Chọn mốc Date & Time và Area khu vực xưởng (SMT, Assembly, Testing...).
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border text-xs ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>🎮</span>
              <span>2. Controller & Action</span>
            </div>
            <p className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
              Lọc theo API Controller (SfcSwitch, SfcAdapter, Alabel) và mã Action nghiệp vụ.
            </p>
          </div>

          <div
            className={`p-3 rounded-xl border text-xs ${
              isFoxconn
                ? 'bg-slate-50 border-slate-200 text-slate-700'
                : 'bg-zinc-950/60 border-zinc-800 text-zinc-300'
            }`}
          >
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <span>⚡</span>
              <span>3. Bấm Query Data</span>
            </div>
            <p className={`text-[11px] ${isFoxconn ? 'text-slate-500' : 'text-zinc-400'}`}>
              Bấm nút xanh góc phải để hiển thị bảng 8 cột đối soát chi tiết Request & Response.
            </p>
          </div>
        </div>

        {/* Nút Kích Hoạt Nhanh */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onExecuteQuery}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md active:scale-98 ${
              isFoxconn
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                : 'bg-[#76B900] hover:bg-[#86d400] text-black font-extrabold shadow-[#76B900]/20'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Thực Thi Truy Vấn Ngay (Mặc Định)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
