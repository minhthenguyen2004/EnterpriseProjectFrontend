export default function ValidationKeysExplanation({ isFoxconn }) {
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
          Ý nghĩa &amp; logic triển khai của các cờ cấu hình cấp Keypart:
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
              IsRequire (Bắt buộc):
            </strong>{' '}
            Key phải quét và gửi lên, không được trống hay N/A. Luôn kiểm tra tính đầy đủ của key
            này, bất kể cờ IsBypass bằng 0 hay 1.
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
              IsBypass (Bỏ qua logic):
            </strong>{' '}
            Cho phép bỏ qua kiểm tra trùng lặp (Check 2) và đối chiếu trạm trước (Check 3). Nếu
            IsBypass = 1 và IsRequire = 1, thiết bị vẫn bắt buộc phải truyền giá trị lên.
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
              IsVerify (So khớp trạm trước):
            </strong>{' '}
            Bắt buộc trùng giá trị đã quét ở trạm trước đó trong cùng chu kỳ sản phẩm.
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
              Is SFC KeyPart (Khóa SFC):
            </strong>{' '}
            Đánh dấu key này thuộc danh sách khóa SFC. Hệ thống sẽ tự động tổng hợp tất cả SFC
            KeyPart để truyền dữ liệu và đối chiếu sang SFC Station.
          </span>
        </li>
      </ol>
    </div>
  );
}
