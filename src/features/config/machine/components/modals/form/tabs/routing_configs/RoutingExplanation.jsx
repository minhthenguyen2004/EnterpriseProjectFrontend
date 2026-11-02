import { useState } from 'react';

/**
 * Khung hiển thị định nghĩa & ý nghĩa cấu hình định tuyến (Routing Config):
 * Hỗ trợ thu gọn/mở rộng (Collapsible) để nhường không gian tối đa cho Bảng dữ liệu.
 * 1. Twin Step (Trạm song song/định tuyến)
 * 2. Allow Carrier Swap (Chuyển đổi khay)
 * 3. Picker (Phân giải Carrier từ MainKey/SN)
 * 4. Sfc Trigger Step (Trì hoãn định tuyến SFC)
 */
export default function RoutingExplanation({ isFoxconn = false }) {
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
            Ý nghĩa cấu hình định tuyến (Routing Config)
          </h5>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              isFoxconn
                ? 'bg-blue-100/70 text-blue-800 border-blue-200'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            4 quy tắc cốt lõi
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
            {/* Mục 1 */}
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
                    Twin Step (Trạm song song):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Cấu hình các trạm chạy song song. Khi sản phẩm đi qua trạm 10 hoặc 11, hệ thống lưu vết chính xác trạm đã gia công.
                  </span>
                </div>
              </div>
            </div>

            {/* Mục 2 */}
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
                    Allow Carrier Swap (Đổi khay):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Cho phép trạm thực hiện chuyển đổi khay (swap Carrier) theo MainKey/SN khi linh kiện qua trạm.
                  </span>
                </div>
              </div>
            </div>

            {/* Mục 3 */}
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
                    Picker (Robot gắp phân giải SN):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Trạm robot gắp tự động phân giải và ghi nhận khay từ MainKey của sản phẩm.
                  </span>
                </div>
              </div>
            </div>

            {/* Mục 4 */}
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
                    Sfc Trigger Step (Trì hoãn SFC):
                  </strong>{' '}
                  <span className={isFoxconn ? 'text-slate-600' : 'text-zinc-300'}>
                    Trì hoãn gửi SFC cho đến khi trạm Trigger đạt PASS/GOOD, cho phép hoàn tác/UNDO trước khi chốt dữ liệu.
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
