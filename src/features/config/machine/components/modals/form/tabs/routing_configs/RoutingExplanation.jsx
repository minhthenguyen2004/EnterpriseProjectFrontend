/**
 * Khung hiển thị định nghĩa & ý nghĩa cấu hình định tuyến (Routing Config):
 * 1. Twin Step (Trạm song song/định tuyến)
 * 2. Allow Carrier Swap (Chuyển đổi khay)
 * 3. Picker (Phân giải Carrier từ MainKey/SN)
 * 4. Sfc Trigger Step (Trì hoãn định tuyến SFC)
 */
export default function RoutingExplanation({ isFoxconn = false }) {
  return (
    <div
      className={`p-4 rounded-2xl border transition-all ${
        isFoxconn
          ? 'bg-blue-50/40 border-blue-200 text-slate-800'
          : 'bg-zinc-950/80 border-zinc-800 text-zinc-200 shadow-inner'
      }`}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-base">ℹ️</span>
        <h5
          className={`text-xs font-black uppercase tracking-wider ${
            isFoxconn ? 'text-[#002766]' : 'text-[#76B900]'
          }`}
        >
          Ý nghĩa cấu hình định tuyến (Routing Config):
        </h5>
      </div>

      <ol
        className={`space-y-2 text-xs leading-relaxed ${
          isFoxconn ? 'text-slate-700' : 'text-zinc-300'
        }`}
      >
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            1.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              Twin Step (Trạm song song/định tuyến):
            </strong>{' '}
            Cấu hình các trạm song song. Ví dụ: Nếu sản phẩm đi qua trạm 10 hoặc 11 (trạm song song),
            hệ thống sẽ kiểm tra và gán lưu vết chính xác trạm đã qua.
          </span>
        </li>

        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            2.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              Allow Carrier Swap (Chuyển đổi khay):
            </strong>{' '}
            Cho phép trạm này thực hiện chuyển đổi khay (swap Carrier) theo MainKey (hoặc Serial Number).
          </span>
        </li>

        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            3.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              Picker (Phân giải Carrier từ MainKey/SN):
            </strong>{' '}
            Cho phép trạm robot gắp tự động phân giải và ghi nhận khay từ MainKey của sản phẩm.
          </span>
        </li>

        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            4.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              Sfc Trigger Step (Trì hoãn định tuyến SFC):
            </strong>{' '}
            Cấu hình trạm trì hoãn gửi SFC cho đến khi trạm kích hoạt (Trigger Step) đạt kết quả PASS/GOOD,
            cho phép UNDO quay lui trước khi hoàn thành.
          </span>
        </li>
      </ol>
    </div>
  );
}
