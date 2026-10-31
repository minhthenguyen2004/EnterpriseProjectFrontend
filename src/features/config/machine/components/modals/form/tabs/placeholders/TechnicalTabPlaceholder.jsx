import { FORM_TABS } from '../../constants/formModalConstants';

export default function TechnicalTabPlaceholder({
  activeTab,
  isFoxconn
}) {
  const currentTab = FORM_TABS.find(t => t.id === activeTab) || FORM_TABS[0];

  return (
    <div
      className={`flex-1 flex flex-col items-center justify-center my-6 px-4 py-8 rounded-2xl border border-dashed ${
        isFoxconn ? 'border-slate-300' : 'border-zinc-800'
      } text-center relative overflow-hidden`}
    >
      {/* Glow background accent */}
      <div
        className={`absolute w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-20 -top-10 -right-10 ${
          isFoxconn ? 'bg-blue-400' : 'bg-[#76B900]'
        }`}
      />

      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-lg ${
          isFoxconn
            ? 'bg-linear-to-br from-blue-50 to-blue-100 text-blue-700 border border-blue-200'
            : 'bg-linear-to-br from-zinc-900 to-zinc-950 text-[#76B900] border border-[#76B900]/30 shadow-[0_0_20px_rgba(118,185,0,0.15)]'
        }`}
      >
        {currentTab.icon}
      </div>

      <h5
        className={`text-sm font-black tracking-tight ${
          isFoxconn ? 'text-slate-900' : 'text-zinc-100'
        }`}
      >
        Chưa Có Dữ Liệu Cho Phân Hệ &ldquo;{currentTab.label}&rdquo;
      </h5>

      <p
        className={`text-xs max-w-md mt-1 mb-5 leading-relaxed ${
          isFoxconn ? 'text-slate-600' : 'text-zinc-400'
        }`}
      >
        Phần cấu hình chuyên sâu này đang ở chế độ giữ chỗ kỹ thuật (Ready for Module Integration).
        Các thông số định danh ở cột 1/3 bên trái sẽ được tự động liên kết khi tính năng này được kích hoạt.
      </p>

      {/* Skeleton Grid Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl opacity-60">
        <div
          className={`p-3 rounded-xl border ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}
        >
          <div className={`w-16 h-2 rounded mb-2 ${isFoxconn ? 'bg-slate-200' : 'bg-zinc-700'}`} />
          <div className={`w-full h-5 rounded ${isFoxconn ? 'bg-slate-100' : 'bg-zinc-800'}`} />
        </div>
        <div
          className={`p-3 rounded-xl border ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}
        >
          <div className={`w-20 h-2 rounded mb-2 ${isFoxconn ? 'bg-slate-200' : 'bg-zinc-700'}`} />
          <div className={`w-full h-5 rounded ${isFoxconn ? 'bg-slate-100' : 'bg-zinc-800'}`} />
        </div>
        <div
          className={`p-3 rounded-xl border ${
            isFoxconn ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}
        >
          <div className={`w-14 h-2 rounded mb-2 ${isFoxconn ? 'bg-slate-200' : 'bg-zinc-700'}`} />
          <div className={`w-full h-5 rounded ${isFoxconn ? 'bg-slate-100' : 'bg-zinc-800'}`} />
        </div>
      </div>
    </div>
  );
}
