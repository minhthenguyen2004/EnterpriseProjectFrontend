import { useState } from 'react';

/**
 * Khung giải nghĩa trực quan: Cơ chế thẩm định tiêu chuẩn & dung sai dữ liệu Lực Nhấn (AutoLine Pressfit Validation)
 * Hỗ trợ thu gọn/mở rộng (Collapsible) để nhường không gian tối đa cho bảng vị trí ép.
 */
export default function PressfitValidationExplanation({ isFoxconn = false }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const rules = [
    {
      num: '1',
      title: 'Thẩm định độc lập 3 bộ thông số:',
      detail:
        'Hệ thống đối soát trực tiếp 3 thông số kỹ thuật (Force, Time, Distance) theo dải [Standard ± Limit]. Nếu bất kỳ thông số nào vi phạm → Hệ thống cưỡng bức lỗi 428 (PRESSFIT FAIL).',
      badge: 'Lỗi 428 (PRESSFIT FAIL)',
      badgeColor: 'rose'
    },
    {
      num: '2',
      title: 'Chặn thiếu vị trí ép bắt buộc:',
      detail:
        'Nếu vị trí có Required = Yes mà máy không gửi vị trí này lên → Tự động gán mã lỗi MISSING_PRESSFIT_POSITION và FAIL giao dịch.',
      badge: 'MISSING_PRESSFIT_POSITION',
      badgeColor: 'amber'
    },
    {
      num: '3',
      title: 'Tự động nạp vị trí mới (Auto-seeding):',
      detail:
        'Khi máy ép gửi vị trí mới lần đầu theo máy (ST05), hệ thống tự động ghi nhận với giá trị 0 (chưa kiểm soát dung sai) để không làm dừng chuyền.',
      badge: 'Auto-seeding (Std=0)',
      badgeColor: 'blue'
    },
    {
      num: '4',
      title: 'Chốt an toàn (Active):',
      detail:
        'Có thể tạm tắt Active = Bypass khi bảo trì hoặc chạy thử để bỏ qua kiểm tra dung sai vị trí đó mà không cần xóa cấu hình.',
      badge: 'Active = Bypass',
      badgeColor: 'emerald'
    }
  ];

  return (
    <div
      className={`rounded-2xl border transition-all shrink-0 ${
        isFoxconn
          ? 'bg-blue-50/60 border-blue-200 text-slate-800'
          : 'bg-zinc-950/70 border-zinc-800/90 text-zinc-200'
      }`}
    >
      {/* Header bar kèm nút Thu gọn / Xem chi tiết */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:opacity-90 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">ℹ️</span>
          <h5
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            Cơ chế thẩm định tiêu chuẩn & dung sai dữ liệu Lực Nhấn (AutoLine Pressfit Validation)
          </h5>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              isFoxconn
                ? 'bg-blue-100/70 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            4 cơ chế cốt lõi
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-zinc-500">
          <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
          <span className="text-[10px]">{isExpanded ? '▲' : '▼'}</span>
        </div>
      </button>

      {/* Nội dung diễn giải dạng Grid 2x2 khi mở rộng */}
      {isExpanded && (
        <div className="px-3.5 pb-3 pt-1 border-t border-slate-200/60 dark:border-zinc-800/60 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {rules.map((rule) => {
              let badgeClass = '';
              if (rule.badgeColor === 'rose') {
                badgeClass = isFoxconn
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-rose-950/70 text-rose-300 border-rose-800';
              } else if (rule.badgeColor === 'amber') {
                badgeClass = isFoxconn
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-amber-950/70 text-amber-300 border-amber-800';
              } else if (rule.badgeColor === 'blue') {
                badgeClass = isFoxconn
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : 'bg-blue-950/70 text-blue-300 border-blue-800';
              } else if (rule.badgeColor === 'emerald') {
                badgeClass = isFoxconn
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-emerald-950/70 text-emerald-300 border-emerald-800';
              }

              return (
                <div
                  key={rule.num}
                  className={`p-2.5 rounded-xl border flex flex-col justify-between gap-1.5 ${
                    isFoxconn
                      ? 'bg-white/80 border-blue-100 shadow-2xs'
                      : 'bg-zinc-900/60 border-zinc-800 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                          isFoxconn ? 'bg-blue-600 text-white' : 'bg-[#76B900] text-black'
                        }`}
                      >
                        {rule.num}
                      </span>
                      <span
                        className={`font-black text-xs ${
                          isFoxconn ? 'text-slate-900' : 'text-zinc-100'
                        }`}
                      >
                        {rule.title}
                      </span>
                    </div>
                    <p
                      className={`text-[11px] leading-relaxed pl-5.5 ${
                        isFoxconn ? 'text-slate-600' : 'text-zinc-300'
                      }`}
                    >
                      {rule.detail}
                    </p>
                  </div>

                  <div className="pl-5.5 pt-0.5">
                    <span
                      className={`inline-block text-[10px] px-2 py-0.5 rounded border font-bold ${badgeClass}`}
                    >
                      {rule.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
