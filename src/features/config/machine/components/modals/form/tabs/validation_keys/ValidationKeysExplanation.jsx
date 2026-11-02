import { useState } from 'react';

/**
 * Khung giải nghĩa logic cờ Keypart (Validation Keys Explanation):
 * Hỗ trợ thu gọn/mở rộng (Collapsible) để nhường không gian tối đa cho Bảng dữ liệu.
 */
export default function ValidationKeysExplanation({ isFoxconn }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`rounded-2xl border transition-all shrink-0 ${
        isFoxconn
          ? 'bg-blue-50/40 border-blue-200 text-slate-800'
          : 'bg-zinc-950/80 border-zinc-800 text-zinc-200 shadow-inner'
      }`}
    >
      {/* Header bar kèm nút Thu gọn / Mở rộng */}
      <button
        type="button"
        onClick={() => setIsExpanded(prev => !prev)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors hover:opacity-90 select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">ℹ️</span>
          <h5
            className={`text-xs font-black uppercase tracking-wider ${
              isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
            }`}
          >
            Ý nghĩa &amp; logic triển khai của các cờ cấu hình cấp Keypart
          </h5>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              isFoxconn
                ? 'bg-blue-100/70 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            4 cờ cốt lõi
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs leading-relaxed">
            {/* 1. IsRequire */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  1.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsRequire (Bắt buộc):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Key phải quét và gửi lên, không được trống hay N/A. Luôn kiểm tra tính đầy đủ, bất kể cờ IsBypass bằng 0 hay 1.
                  </span>
                </div>
              </div>
            </div>

            {/* 2. IsBypass */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  2.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsBypass (Bỏ qua logic):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Bỏ qua kiểm tra trùng lặp (Check 2) và đối chiếu trạm trước (Check 3). Nếu IsBypass = 1 và IsRequire = 1, vẫn phải truyền giá trị lên.
                  </span>
                </div>
              </div>
            </div>

            {/* 3. IsVerify */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  3.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    IsVerify (So khớp trạm trước):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Bắt buộc trùng giá trị đã quét ở trạm trước đó trong cùng chu kỳ sản phẩm.
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Is SFC KeyPart */}
            <div
              className={`p-2.5 rounded-xl border ${
                isFoxconn ? 'bg-white border-blue-100' : 'bg-zinc-900/60 border-zinc-800/80'
              }`}
            >
              <div className="flex items-start gap-2">
                <span
                  className={`font-mono font-black text-xs shrink-0 ${
                    isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
                  }`}
                >
                  4.
                </span>
                <div>
                  <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
                    Is SFC KeyPart (Khóa SFC):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Đánh dấu key thuộc danh sách khóa SFC. Hệ thống tự động tổng hợp để đối chiếu sang SFC Station.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
