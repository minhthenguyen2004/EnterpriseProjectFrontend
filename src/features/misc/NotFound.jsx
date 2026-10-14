import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';

export default function NotFound() {
  const navigate = useNavigate();
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  return (
    <div
      className={`relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden transition-colors duration-500 select-none ${
        isFoxconn
          ? 'bg-linear-to-b from-slate-950 via-slate-900 to-blue-950/80 text-slate-100'
          : 'bg-linear-to-b from-zinc-950 via-black to-zinc-900 text-zinc-100'
      }`}
    >

      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${
            isFoxconn ? '#3b82f6' : '#76B900'
          } 1px, transparent 1px), linear-gradient(to bottom, ${
            isFoxconn ? '#3b82f6' : '#76B900'
          } 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-135 h-96 sm:h-135 rounded-full blur-[140px] pointer-events-none opacity-40 transition-colors duration-700 ${
          isFoxconn ? 'bg-blue-600/40' : 'bg-[#76B900]/30'
        }`}
      />
      <div
        className={`absolute bottom-10 right-10 w-72 h-72 rounded-full blur-[120px] pointer-events-none opacity-25 ${
          isFoxconn ? 'bg-rose-500/30' : 'bg-emerald-400/30'
        }`}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center px-4 py-8 sm:py-12">

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md mb-6 shadow-lg animate-fadeIn">
          <span
            className={`w-2 h-2 rounded-full animate-ping ${
              isFoxconn ? 'bg-blue-400' : 'bg-[#76B900]'
            }`}
          />
          <span
            className={`text-xs font-mono font-bold tracking-widest uppercase ${
              isFoxconn ? 'text-blue-300' : 'text-[#76B900]'
            }`}
          >
            STATUS: 404_SIGNAL_NOT_FOUND
          </span>
        </div>

        <div className="relative flex items-center justify-center mb-4">
          <h1
            className={`text-8xl sm:text-[140px] lg:text-[160px] font-black tracking-tighter leading-none bg-clip-text text-transparent drop-shadow-2xl transition-all duration-300 ${
              isFoxconn
                ? 'bg-linear-to-r from-blue-400 via-indigo-300 to-rose-400'
                : 'bg-linear-to-r from-[#76B900] via-lime-200 to-emerald-400'
            }`}
          >
            404
          </h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-dashed opacity-30 animate-spin pointer-events-none border-white" />
        </div>


        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
          MẤT KẾT NỐI VỚI TRANG YÊU CẦU
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-8">
          Đường dẫn bạn vừa truy cập không tồn tại, đã bị xóa hoặc trạm điều hành chưa được cấp quyền liên kết.
        </p>

        <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-slate-400 mb-8 backdrop-blur-sm">
          <span>HOST: STATION-CORE-01</span>
          <span className="text-slate-600">|</span>
          <span className={isFoxconn ? 'text-blue-400' : 'text-[#76B900]'}>
            PROTOCOL: {isFoxconn ? 'FOXCONN_AI' : 'NVIDIA_GRID'}
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-rose-400">ERROR_CODE: #ERR_404_ROUTE</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Link
            to="/"
            className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-xl transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 ${
              isFoxconn
                ? 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-600/30'
                : 'bg-[#76B900] hover:bg-[#65a300] text-black font-extrabold shadow-[#76B900]/30'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Về Trang Chủ Dashboard</span>
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition-all duration-200 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Quay lại trang trước</span>
          </button>

          <Link
            to="/login"
            className="px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Đăng nhập</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
