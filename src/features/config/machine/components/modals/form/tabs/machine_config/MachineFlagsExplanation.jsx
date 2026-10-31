export default function MachineFlagsExplanation({ isFoxconn }) {
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
          Ý nghĩa &amp; logic vận hành các cờ cấu hình Trạm Máy (Machine Flags):
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
              Is Auto Line (Máy tự động hóa):
            </strong>{' '}
            Đánh dấu máy thuộc dây chuyền tự động. Kích hoạt liên kết Group, Step và quản lý quy
            trình kiểm tra 3 pha nội bộ (
            <code className="font-mono px-1 rounded bg-slate-200 dark:bg-zinc-800">
              PreCheck → Link → Undo
            </code>
            ).
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
              Is SFC PreCheck (Kiểm tra PreCheck với SFC):
            </strong>{' '}
            Kích hoạt giao tiếp kiểm tra PreCheck với hệ thống SFC (MES) trước khi sản phẩm vào trạm.
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
              Is SFC Station (Trạm gửi kết quả SFC):
            </strong>{' '}
            Đánh dấu trạm gửi kết quả (
            <code className="font-mono px-1 rounded bg-slate-200 dark:bg-zinc-800">
              Insert Result
            </code>
            ) lên hệ thống SFC (MES). Tự động gom các dữ liệu SFC KeyPart (cờ{' '}
            <code className="font-mono px-1 rounded bg-slate-200 dark:bg-zinc-800">
              IsSFC = 1
            </code>
            ) để đẩy sang SFC.
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
              Send SFC On Pass Only (Chỉ gửi SFC khi PASS):
            </strong>{' '}
            Chỉ giao tiếp/gửi dữ liệu sang SFC khi kết quả Client là PASS. Các kết quả khác chỉ lưu
            nội bộ AutoLine.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span
            className={`font-mono font-black shrink-0 ${
              isFoxconn ? 'text-blue-700' : 'text-[#76B900]'
            }`}
          >
            5.
          </span>
          <span>
            <strong className={isFoxconn ? 'text-slate-900' : 'text-white'}>
              Allow Fail Pass-Through (Cho phép Fail qua trạm):
            </strong>{' '}
            Khi kết quả FAIL thì sản phẩm vẫn được đi tiếp mà không tắc chuyền.
          </span>
        </li>
      </ol>
    </div>
  );
}
