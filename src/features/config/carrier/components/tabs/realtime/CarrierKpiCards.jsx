import useTheme from '../../../../../../hooks/useTheme';

/**
 * 5 Thẻ Chỉ Số KPI Thống Kê Giám Sát Khay Chứa (Dòng 1 Tab Giám Sát Thời Gian Thực)
 * 1. Tổng số khay
 * 2. Bình thường (ACTIVE)
 * 3. Sắp đến hạn (WARNING)
 * 4. Cần kiểm định (INSPECTION_REQUIRED)
 * 5. Đang bị khóa (LOCKED)
 */
export default function CarrierKpiCards({ kpiStats, selectedStatus, onSelectStatus }) {
  const { brand } = useTheme();
  const isFoxconn = brand === 'foxconn';

  const total = kpiStats?.total || 0;
  const normal = kpiStats?.normal || 0;
  const warning = kpiStats?.warning || 0;
  const inspection = kpiStats?.inspection || 0;
  const locked = kpiStats?.locked || 0;

  const normalPct = total > 0 ? ((normal / total) * 100).toFixed(1) : 0;
  const warningPct = total > 0 ? ((warning / total) * 100).toFixed(1) : 0;
  const inspectionPct = total > 0 ? ((inspection / total) * 100).toFixed(1) : 0;
  const lockedPct = total > 0 ? ((locked / total) * 100).toFixed(1) : 0;

  const cards = [
    {
      id: 'ALL',
      title: 'TỔNG SỐ KHAY',
      count: total,
      unit: 'khay',
      subText: '100% tài sản lưu hành',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      accentBorder: isFoxconn ? 'border-blue-500' : 'border-[#76B900]',
      activeBg: isFoxconn ? 'bg-blue-50/70 border-blue-600' : 'bg-[#76B900]/15 border-[#76B900]',
      textColor: isFoxconn ? 'text-blue-900' : 'text-[#76B900]',
      badgeColor: isFoxconn ? 'bg-blue-100 text-blue-800' : 'bg-[#76B900]/20 text-[#76B900]',
    },
    {
      id: 'ACTIVE',
      title: 'BÌNH THƯỜNG',
      count: normal,
      unit: 'khay',
      subText: `${normalPct}% hoạt động an toàn`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      accentBorder: 'border-emerald-500',
      activeBg: isFoxconn ? 'bg-emerald-50 border-emerald-600' : 'bg-emerald-500/15 border-emerald-400',
      textColor: isFoxconn ? 'text-emerald-700' : 'text-emerald-400',
      badgeColor: isFoxconn ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300',
    },
    {
      id: 'WARNING',
      title: 'SẮP ĐẾN HẠN',
      count: warning,
      unit: 'khay',
      subText: `${warningPct}% cần theo dõi (≥80%)`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      accentBorder: 'border-amber-500',
      activeBg: isFoxconn ? 'bg-amber-50 border-amber-600' : 'bg-amber-500/15 border-amber-400',
      textColor: isFoxconn ? 'text-amber-700' : 'text-amber-400',
      badgeColor: isFoxconn ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300',
    },
    {
      id: 'INSPECTION_REQUIRED',
      title: 'CẦN KIỂM ĐỊNH',
      count: inspection,
      unit: 'khay',
      subText: `${inspectionPct}% yêu cầu QA/QC (≥95%)`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      accentBorder: 'border-orange-500',
      activeBg: isFoxconn ? 'bg-orange-50 border-orange-600' : 'bg-orange-500/15 border-orange-400',
      textColor: isFoxconn ? 'text-orange-700' : 'text-orange-400',
      badgeColor: isFoxconn ? 'bg-orange-100 text-orange-800' : 'bg-orange-500/20 text-orange-300',
    },
    {
      id: 'LOCKED',
      title: 'ĐANG BỊ KHÓA',
      count: locked,
      unit: 'khay',
      subText: `${lockedPct}% cách ly khỏi chuyền`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      accentBorder: 'border-rose-500',
      activeBg: isFoxconn ? 'bg-rose-50 border-rose-600' : 'bg-rose-500/20 border-rose-500',
      textColor: isFoxconn ? 'text-rose-700' : 'text-rose-400',
      badgeColor: isFoxconn ? 'bg-rose-100 text-rose-800' : 'bg-rose-500/20 text-rose-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const isSelected = selectedStatus === card.id;
        return (
          <div
            key={card.id}
            onClick={() => onSelectStatus(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectStatus(card.id);
              }
            }}
            className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left select-none relative overflow-hidden group ${
              isSelected
                ? `${card.activeBg} shadow-md`
                : isFoxconn
                ? 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
            }`}
          >
            {/* Top Row: Title + Icon */}
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-[11px] font-bold tracking-wider uppercase truncate ${
                  isFoxconn ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                {card.title}
              </span>
              <div
                className={`p-1.5 rounded-lg transition-transform duration-200 group-hover:scale-110 ${card.badgeColor}`}
              >
                {card.icon}
              </div>
            </div>

            {/* Middle Row: Large Count Number */}
            <div className="flex items-baseline gap-1.5">
              <span
                className={`text-2xl lg:text-3xl font-bold tracking-tight ${card.textColor}`}
              >
                {card.count.toLocaleString('vi-VN')}
              </span>
              <span className={`text-xs font-semibold ${isFoxconn ? 'text-slate-500' : 'text-zinc-500'}`}>
                {card.unit}
              </span>
            </div>

            {/* Bottom Row: Subtitle / Percentage */}
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span
                className={`font-medium truncate ${
                  isFoxconn ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                {card.subText}
              </span>
              {isSelected && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-[#76B900]">
                  Đang lọc ●
                </span>
              )}
            </div>

            {/* Subtle bottom indicator border */}
            <div
              className={`absolute bottom-0 left-0 right-0 h-1 transition-all ${
                isSelected ? card.accentBorder.replace('border-', 'bg-') : 'bg-transparent'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}
